```SQL
CREATE SCHEMA IF NOT EXISTS logging;

GRANT USAGE ON SCHEMA logging TO public;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON ALL TABLES IN SCHEMA logging 
TO public;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA logging 
TO public;

GRANT EXECUTE 
ON ALL FUNCTIONS IN SCHEMA logging 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA logging 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA logging 
GRANT USAGE, SELECT ON SEQUENCES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA logging 
GRANT EXECUTE ON FUNCTIONS 
TO public;


```

```SQL
CREATE TABLE logging.debug_logs (
    id BIGSERIAL PRIMARY KEY,
    event TEXT NOT NULL,
    auth_user_id UUID,
    username TEXT,
    ip TEXT,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE logging.visits (
    id BIGSERIAL PRIMARY KEY,
    link TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


ALTER TABLE logging.debug_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE logging.visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert debug log"
    ON logging.debug_logs
    FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

CREATE POLICY "Admins can view debug logs"
    ON logging.debug_logs
    FOR SELECT
    TO PUBLIC
    USING (user_management.is_admin_or_mod());
    
CREATE POLICY "Users can insert visits"
    ON logging.visits
    FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

CREATE POLICY "Admins can view debug logs"
    ON logging.visits
    FOR SELECT
    TO PUBLIC
    USING (user_management.is_admin_or_mod());

CREATE INDEX idx_debug_logs_created_at
    ON logging.debug_logs (created_at);

CREATE INDEX idx_debug_logs_event
    ON logging.debug_logs (event);

CREATE INDEX idx_debug_logs_auth_user_id
    ON logging.debug_logs (auth_user_id);

```

```SQL
CREATE OR REPLACE FUNCTION logging.log_debug(
    p_event TEXT,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, logging, user_management
AS $$
DECLARE
    v_user_id UUID;
    v_username TEXT;
    v_ip TEXT;
    v_user_agent TEXT;
BEGIN
    v_user_id := auth.uid();

    IF v_user_id IS NOT NULL THEN
        SELECT ui.username
        INTO v_username
        FROM user_management.user_identities ui
        WHERE ui.id = v_user_id
        LIMIT 1;
    END IF;

    v_ip := current_setting('request.headers', true)::jsonb->>'x-forwarded-for';

    IF v_ip IS NULL OR v_ip = '' THEN
        v_ip := current_setting('request.headers', true)::jsonb->>'x-real-ip';
    END IF;

    IF v_ip IS NULL OR v_ip = '' THEN
        v_ip := inet_client_addr()::text;
    END IF;

    v_user_agent :=
        current_setting('request.headers', true)::jsonb->>'user-agent';

    INSERT INTO logging.debug_logs (
        event,
        auth_user_id,
        username,
        ip,
        user_agent,
        metadata
    ) VALUES (
        p_event,
        v_user_id,
        v_username,
        COALESCE(v_ip, 'unknown'),
        COALESCE(v_user_agent, 'unknown'),
        p_metadata
    );
END;
$$;

```