```SQL
CREATE SCHEMA IF NOT EXISTS subscriptions;

GRANT USAGE ON SCHEMA subscriptions TO public;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON ALL TABLES IN SCHEMA subscriptions 
TO public;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA subscriptions 
TO public;

GRANT EXECUTE 
ON ALL FUNCTIONS IN SCHEMA subscriptions 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA subscriptions 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA subscriptions 
GRANT USAGE, SELECT ON SEQUENCES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA subscriptions 
GRANT EXECUTE ON FUNCTIONS 
TO public;

CREATE TABLE subscriptions.subscription_tiers (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role_key user_management.user_role NOT NULL,
    rank INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE subscriptions.user_subscriptions (
    user_id UUID NOT NULL,
    subscription_tier_id INTEGER NOT NULL,
    start_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMPTZ,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES user_management.user_identities(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_tier_id) REFERENCES subscriptions.subscription_tiers(id) ON DELETE CASCADE
);

ALTER TABLE subscriptions.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions.subscription_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to select their own subscription"
  ON subscriptions.user_subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
  
CREATE POLICY "Allow the public to view subscription tiers"
  ON subscriptions.subscription_tiers
  FOR SELECT
  TO public
  USING (TRUE);
  
CREATE POLICY "Allow supabase_auth_admin to do anything"
  ON subscriptions.user_subscriptions
  FOR ALL
  TO supabase_auth_admin
  USING (true);
  
CREATE OR REPLACE FUNCTION subscriptions.sync_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    new_role user_management.user_role;
BEGIN
    SELECT st.role_key
    INTO new_role
    FROM subscriptions.subscription_tiers st
    WHERE st.id = NEW.subscription_tier_id;

    INSERT INTO user_management.user_roles (user_id, role_key)
    VALUES (NEW.user_id, new_role)
    ON CONFLICT (user_id)
    DO UPDATE SET role_key = EXCLUDED.role_key;

    RETURN NULL;
END;
$$;

CREATE TRIGGER trg_sync_user_role
AFTER INSERT OR UPDATE OF subscription_tier_id
ON subscriptions.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION subscriptions.sync_user_role();

CREATE OR REPLACE FUNCTION subscriptions.handle_expired_subscriptions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, subscriptions
AS $$
    UPDATE subscriptions.user_subscriptions
    SET 
        subscription_tier_id = 1,
        start_date = CURRENT_TIMESTAMP,
        end_date   = CURRENT_TIMESTAMP + INTERVAL '100 years'
    WHERE 
        end_date IS NOT NULL
        AND end_date < CURRENT_TIMESTAMP
        AND subscription_tier_id != 1;   -- optional: skip already expired/downgraded
$$;

SELECT cron.schedule(
    'downgrade-expired-subscriptions-hourly',
    '0 * * * *',
    $$ SELECT subscriptions.handle_expired_subscriptions(); $$
);

REVOKE EXECUTE ON FUNCTION subscriptions.handle_expired_subscriptions() FROM public, anon, authenticated;

```

```SQL
INSERT INTO subscriptions.subscription_tiers (key, name, role_key, rank)
VALUES
    ('acolyte', 'The Acolyte', 'acolyte', 1),
	('high-priest', 'The High Priest', 'high-priest', 2),
    ('cult-leader', 'The Cult Leader', 'cult-leader', 3),
    ('deity', 'The Deity', 'moderator', 100),
    ('goddess', 'The Goddess', 'admin', 1000);
```

```SQL

CREATE TABLE subscriptions.invites (
    invite_key UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by UUID NOT NULL REFERENCES user_management.user_identities(id),
    used_by UUID REFERENCES user_management.user_identities(id),
    subscription_tier_id INTEGER NOT NULL REFERENCES subscriptions.subscription_tiers(id),
    period INTERVAL NOT NULL DEFAULT '30 days'::interval,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    used_at TIMESTAMPTZ
);

ALTER TABLE subscriptions.invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own created invites"
ON subscriptions.invites
FOR SELECT
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users cannot insert invites"
ON subscriptions.invites
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Users cannot update invites"
ON subscriptions.invites
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Users can delete their own invites"
ON subscriptions.invites
FOR DELETE
TO authenticated
USING (created_by = auth.uid());

CREATE OR REPLACE FUNCTION subscriptions.use_invite(p_invite_key UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = subscriptions, user_management, public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_invite subscriptions.invites%ROWTYPE;
    v_new_end_date TIMESTAMPTZ;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated.';
    END IF;

    SELECT * INTO v_invite
    FROM subscriptions.invites
    WHERE invite_key = p_invite_key;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invite not found.';
    END IF;

    IF v_invite.used_by IS NOT NULL THEN
        RAISE EXCEPTION 'Invite already used.';
    END IF;

    IF v_invite.created_by = v_user_id THEN
        RAISE EXCEPTION 'Cannot use own invite.';
    END IF;

    v_new_end_date := NOW() + v_invite.period;

    INSERT INTO subscriptions.user_subscriptions (user_id, subscription_tier_id, start_date, end_date)
    VALUES (v_user_id, v_invite.subscription_tier_id, NOW(), v_new_end_date)
    ON CONFLICT (user_id)
    DO UPDATE SET
        subscription_tier_id = EXCLUDED.subscription_tier_id,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date;

    UPDATE subscriptions.invites
    SET used_by = v_user_id,
        used_at = NOW()
    WHERE invite_key = p_invite_key;
END;
$$;

GRANT EXECUTE ON FUNCTION subscriptions.use_invite(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION subscriptions.handle_expired_subscriptions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    updated_count INTEGER := 0;
BEGIN
    WITH expired AS (
        SELECT user_id
        FROM subscriptions.user_subscriptions
        WHERE end_date IS NOT NULL
          AND end_date < NOW()
    )
    UPDATE subscriptions.user_subscriptions us
    SET 
        subscription_tier_id = 1,
        start_date = NOW(),
        end_date = NOW() + INTERVAL '1 year'
    FROM expired e
    WHERE us.user_id = e.user_id;

    GET DIAGNOSTICS updated_count = ROW_COUNT;

    RETURN updated_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION subscriptions.handle_expired_subscriptions() FROM public, authenticated;
GRANT EXECUTE ON FUNCTION subscriptions.handle_expired_subscriptions() TO service_role;

CREATE OR REPLACE VIEW subscriptions.invites_with_details WITH (security_invoker = on) AS
SELECT
    i.invite_key,
    i.created_by,
    i.used_by,
    i.subscription_tier_id,
    tier.name AS subscription_tier_name,
    i.period,
    i.created_at,
    i.used_at,
    creator.username AS invite_creator_username,
    "user".username AS invite_user_username
FROM
    subscriptions.invites i
    LEFT JOIN subscriptions.subscription_tiers tier
        ON i.subscription_tier_id = tier.id
    LEFT JOIN user_management.user_identities creator
        ON i.created_by = creator.id
    LEFT JOIN user_management.user_identities "user"
        ON i.used_by = "user".id;


CREATE OR REPLACE FUNCTION subscriptions.create_invite(
    p_subscription_tier_id INTEGER
) RETURNS UUID AS $$
DECLARE
    v_current_user_id UUID := auth.uid();
    v_current_user_tier INTEGER;
    v_current_user_end_date TIMESTAMPTZ;
    v_invite_key UUID;
BEGIN
    SELECT subscription_tier_id, end_date INTO v_current_user_tier, v_current_user_end_date
    FROM subscriptions.user_subscriptions
    WHERE user_id = v_current_user_id
    LIMIT 1;

    IF v_current_user_tier IS NULL THEN
        RAISE EXCEPTION 'User does not have an active subscription';
    END IF;

    IF v_current_user_end_date IS NOT NULL AND v_current_user_end_date < CURRENT_TIMESTAMP THEN
        RAISE EXCEPTION 'User subscription has expired';
    END IF;

    IF (SELECT rank FROM subscriptions.subscription_tiers WHERE id = v_current_user_tier) < 
       (SELECT rank FROM subscriptions.subscription_tiers WHERE id = p_subscription_tier_id) THEN
        RAISE EXCEPTION 'User does not have sufficient tier rank to create this invite';
    END IF;

    INSERT INTO subscriptions.invites (created_by, subscription_tier_id)
    VALUES (v_current_user_id, p_subscription_tier_id)
    RETURNING invite_key INTO v_invite_key;

    RETURN v_invite_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

```

```SQL

CREATE OR REPLACE FUNCTION subscriptions.add_subscription_on_user_creation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO subscriptions.user_subscriptions (user_id, subscription_tier_id, start_date, end_date)
    VALUES (
        NEW.id,
        1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + INTERVAL '1 year'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_created_add_subscription
AFTER INSERT ON user_management.user_identities
FOR EACH ROW
EXECUTE FUNCTION subscriptions.add_subscription_on_user_creation();
```