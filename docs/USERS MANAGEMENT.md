```SQL
CREATE SCHEMA IF NOT EXISTS user_management;
GRANT ALL ON SCHEMA user_management TO supabase_auth_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT ALL PRIVILEGES ON TABLES TO supabase_auth_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT ALL PRIVILEGES ON SEQUENCES TO supabase_auth_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT ALL PRIVILEGES ON FUNCTIONS TO supabase_auth_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT ALL PRIVILEGES ON TYPES TO supabase_auth_admin;
```

```sql
GRANT USAGE ON SCHEMA user_management TO public;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA user_management 
TO public;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA user_management 
TO public;

GRANT EXECUTE 
ON ALL FUNCTIONS IN SCHEMA user_management 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT USAGE, SELECT ON SEQUENCES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA user_management 
GRANT EXECUTE ON FUNCTIONS 
TO public;
```

```sql
SET search_path TO user_management;

CREATE TABLE IF NOT EXISTS user_identities (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL UNIQUE,
    picture TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION user_management.create_user_identity()
RETURNS TRIGGER AS $$
DECLARE
    username TEXT;
BEGIN
    username := NEW.raw_user_meta_data->>'username';

    INSERT INTO user_management.user_identities (id, username)
    VALUES (NEW.id, username);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION user_management.create_user_identity();

SET search_path TO public;

CREATE OR REPLACE FUNCTION user_management.check_credentials_availability(username_input TEXT, email_input TEXT)
RETURNS TABLE(is_username_available BOOLEAN, is_email_available BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
	is_username_available := NOT EXISTS (
        SELECT 1 
        FROM user_management.user_identities 
        WHERE username = username_input
    );

	is_email_available := NOT EXISTS (
        SELECT 1 
        FROM auth.identities 
        WHERE email = email_input
    );

    RETURN NEXT;
END;
$$;

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

    RETURN NULL;  -- AFTER trigger, return value ignored
END;
$$;

CREATE TRIGGER trg_sync_user_role
AFTER INSERT OR UPDATE OF subscription_tier_id
ON subscriptions.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION subscriptions.sync_user_role();

```

```sql
SET search_path TO user_management;

create type user_role as enum ('admin', 'moderator', 'acolyte', 'high-priest', 'cult-leader');

CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_key user_role not null,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES user_identities(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION is_admin_or_mod()
RETURNS boolean AS $$
BEGIN
  IF auth.role() != 'authenticated' THEN
    RETURN false;
  END IF;

  RETURN (auth.jwt() ->> 'user_role') IN ('admin', 'moderator');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE INDEX idx_user_roles_role_key ON user_roles(role_key);
```

```sql
SET search_path TO user_management;

ALTER TABLE user_identities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view identities" ON user_identities
    FOR SELECT USING (true);
    
CREATE POLICY "Supabase auth can view identities" ON user_identities
    FOR SELECT TO supabase_auth_admin USING (true);
    
CREATE POLICY "Supabase auth can insert identities" ON user_identities
    FOR INSERT TO supabase_auth_admin WITH CHECK (true);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow supabase_auth_admin to do anything"
  ON user_roles FOR ALL TO supabase_auth_admin USING (true);

SET search_path TO public;
```

```sql
CREATE OR REPLACE FUNCTION user_management.jwt_role_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  v_user_id uuid;
  user_role user_management.user_role;
BEGIN
    select role_key into user_role from user_management.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    event := jsonb_set(event, '{claims}', claims);
    return event;
END;
$$;

grant execute
  on function user_management.jwt_role_hook
  to supabase_auth_admin;

revoke execute
  on function user_management.jwt_role_hook
  from authenticated, anon, public;

grant all
  on table user_management.user_roles
to supabase_auth_admin;

revoke all
  on table user_management.user_roles
  from authenticated, anon, public;
```