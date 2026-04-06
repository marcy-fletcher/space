```SQL
CREATE SCHEMA IF NOT EXISTS blog;

GRANT USAGE ON SCHEMA blog TO public;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON ALL TABLES IN SCHEMA blog 
TO public;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA blog 
TO public;

GRANT EXECUTE 
ON ALL FUNCTIONS IN SCHEMA blog 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA blog 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA blog 
GRANT USAGE, SELECT ON SEQUENCES 
TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA blog 
GRANT EXECUTE ON FUNCTIONS 
TO public;
```

```SQL
CREATE TABLE blog.posts (
    id BIGSERIAL PRIMARY KEY,
    author_id UUID REFERENCES user_management.user_identities(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    is_published BOOLEAN DEFAULT FALSE,
	is_restricted BOOLEAN DEFAULT FALSE
);

CREATE TABLE blog.post_contents (
    id BIGINT PRIMARY KEY REFERENCES blog.posts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    picture_url TEXT
);

CREATE TABLE blog.post_views (
    post_id BIGINT PRIMARY KEY REFERENCES blog.posts(id) ON DELETE CASCADE,
    views BIGINT DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE blog.tags(
	id BIGSERIAL PRIMARY KEY,
	value TEXT NOT NULL
);

CREATE TABLE blog.post_tags (
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES blog.tags(id) ON DELETE CASCADE,
    CONSTRAINT unique_post_tag UNIQUE (post_id, tag_id)
);

CREATE TYPE blog.warning_level AS ENUM ('mild', 'moderate', 'graphic', 'extreme');

CREATE TABLE blog.post_warnings (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    level blog.warning_level NOT NULL,
    text TEXT NOT NULL,
    CONSTRAINT unique_post_warning UNIQUE (post_id, level, text)
);

CREATE TYPE blog.transformation_type AS ENUM ('gender', 'orientation', 'age', 'personality', 'race', 'body');

CREATE TABLE blog.post_transformations (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    type blog.transformation_type NOT NULL,
    from_value TEXT NOT NULL,
    to_value TEXT NOT NULL,
    CONSTRAINT unique_post_transformation UNIQUE (post_id, type, from_value, to_value)
);

CREATE TYPE blog.content_explicitness AS ENUM ('safe', 'mature', 'explicit');

CREATE TABLE blog.post_metadata (
    id BIGINT PRIMARY KEY REFERENCES blog.posts(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    explicitness blog.content_explicitness NOT NULL
);

CREATE TYPE blog.reference_type AS ENUM ('person', 'franchise', 'event', 'other');

CREATE TABLE blog.post_references (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    url TEXT,
    name TEXT NOT NULL,
    picture_url TEXT,
    description TEXT,
    type blog.reference_type NOT NULL,
    CONSTRAINT unique_name_post_id UNIQUE (name, post_id)
);


CREATE TYPE blog.reaction_type AS ENUM ('like', 'dislike', 'hot', 'sequel_request');

CREATE TABLE blog.post_reactions (
    user_id UUID DEFAULT auth.uid() REFERENCES user_management.user_identities(id) ON DELETE CASCADE,
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    reaction blog.reaction_type NOT NULL,
    PRIMARY KEY(user_id, post_id, reaction)
);

CREATE TABLE blog.post_relations (
    post_a_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    post_b_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    PRIMARY KEY(post_a_id, post_b_id)
);

CREATE TABLE blog.user_agreements (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID DEFAULT auth.uid() REFERENCES user_management.user_identities(id) ON DELETE CASCADE NOT NULL,
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE NOT NULL,
    is_agreed BOOLEAN DEFAULT TRUE NOT NULL,
    agreed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (user_id, post_id)
);

CREATE TABLE blog.post_access_roles (
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    role_key user_management.user_role,
    PRIMARY KEY(post_id, role_key)
);

CREATE TABLE blog.post_access_users (
    post_id BIGINT REFERENCES blog.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_management.user_identities(id) ON DELETE CASCADE,
    PRIMARY KEY(post_id, user_id)
);

CREATE TABLE blog.ideas(
    id BIGSERIAL PRIMARY KEY,
    name TEXT,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE VIEW blog.reaction_counts_per_post with (security_invoker = on) AS
SELECT 
    pr.post_id,
    pr.reaction,
    COUNT(*) AS reaction_count,
    CASE 
        WHEN EXISTS (
            SELECT 1
            FROM blog.post_reactions AS user_reactions
            WHERE user_reactions.post_id = pr.post_id
            AND user_reactions.reaction = pr.reaction
            AND user_reactions.user_id = auth.uid()
            LIMIT 1
        ) THEN true
        ELSE false
    END AS user_reacted
FROM 
    blog.post_reactions AS pr
GROUP BY 
    pr.post_id, pr.reaction;

CREATE VIEW blog.post_subscription_details WITH (security_invoker = on) AS
SELECT
    par.post_id,
    st.id,
    st.key,
    st.name,
    st.rank
FROM
    blog.post_access_roles par
JOIN
    subscriptions.subscription_tiers st
    ON par.role_key = st.role_key
JOIN
    blog.posts p
    ON par.post_id = p.id;
    
CREATE TABLE blog.comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT,
    author_id UUID DEFAULT auth.uid(),
    reply_id BIGINT,
    content TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (post_id) REFERENCES blog.posts(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES user_management.user_identities(id) ON DELETE SET NULL,
    FOREIGN KEY (reply_id) REFERENCES blog.comments(id) ON DELETE SET NULL
);

CREATE TABLE blog.post_comment_counts (
    post_id BIGINT PRIMARY KEY REFERENCES blog.posts(id) ON DELETE CASCADE,
    comment_count INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION blog.ensure_post_comment_count(p_post_id BIGINT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO blog.post_comment_counts (post_id, comment_count)
    VALUES (p_post_id, 0)
    ON CONFLICT (post_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION blog.handle_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.post_id IS NOT NULL AND NEW.is_deleted = FALSE THEN
            PERFORM blog.ensure_post_comment_count(NEW.post_id);

            UPDATE blog.post_comment_counts
            SET comment_count = comment_count + 1,
                updated_at = now()
            WHERE post_id = NEW.post_id;
        END IF;
        RETURN NEW;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        IF OLD.is_deleted = FALSE AND NEW.is_deleted = TRUE THEN
            UPDATE blog.post_comment_counts
            SET comment_count = comment_count - 1,
                updated_at = now()
            WHERE post_id = NEW.post_id;
        END IF;

        IF OLD.is_deleted = TRUE AND NEW.is_deleted = FALSE THEN
            UPDATE blog.post_comment_counts
            SET comment_count = comment_count + 1,
                updated_at = now()
            WHERE post_id = NEW.post_id;
        END IF;

        RETURN NEW;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comment_count
AFTER INSERT OR UPDATE OR DELETE
ON blog.comments
FOR EACH ROW
EXECUTE FUNCTION blog.handle_comment_count();


CREATE OR REPLACE FUNCTION blog.delete_comment(comment_id bigint)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog.comments
  SET is_deleted = true
  WHERE id = comment_id
    AND author_id = auth.uid()
    AND is_deleted = false;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Comment not found or not owned by user';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION blog.delete_comment(bigint) TO authenticated;
REVOKE EXECUTE ON FUNCTION blog.delete_comment(bigint) FROM anon;


CREATE VIEW blog.comments_with_author with (security_invoker = on) AS
SELECT 
    c.id,
    c.post_id,
    c.author_id,
    c.reply_id,
    c.content,
    c.is_deleted,
    c.created_at,
    ui.username,
    ui.picture
FROM 
    blog.comments c
JOIN 
    user_management.user_identities ui
    ON c.author_id = ui.id;


CREATE VIEW blog.related_posts_details with (security_invoker = on) AS
SELECT
    p.id,
    pr.post_b_id AS related_id,
    pc.title AS related_title,
    pc.summary AS related_summary,
    p.created_at AS related_publication_date,
    pmd.slug AS related_slug,
    st.name AS related_subscription_info
FROM
    blog.posts p
JOIN
    blog.post_relations pr ON p.id = pr.post_a_id
JOIN
    blog.post_contents pc ON pr.post_b_id = pc.id
JOIN
    blog.post_metadata pmd ON pr.post_b_id = pmd.id
JOIN
    blog.post_access_roles par ON pr.post_b_id = par.post_id
JOIN
    subscriptions.subscription_tiers st ON par.role_key = st.role_key;

    
--

CREATE INDEX idx_posts_author_id ON blog.posts(author_id);
CREATE INDEX idx_posts_created_at ON blog.posts(created_at);
CREATE INDEX idx_posts_updated_at ON blog.posts(updated_at);

CREATE INDEX idx_blog_post_views_post_id ON blog.post_views(post_id);

CREATE INDEX idx_post_contents_title ON blog.post_contents(title);
CREATE INDEX idx_post_contents_summary ON blog.post_contents(summary);

CREATE INDEX idx_post_tags_post_id ON blog.post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON blog.post_tags(tag_id);

CREATE INDEX idx_tags_value ON blog.tags(value);

CREATE INDEX idx_post_warnings_post_id ON blog.post_warnings(post_id);
CREATE INDEX idx_post_warnings_warning ON blog.post_warnings(level);

CREATE INDEX idx_post_transformations_post_id ON blog.post_transformations(post_id);
CREATE INDEX idx_post_transformations_type ON blog.post_transformations(type);

CREATE INDEX idx_post_reactions_post_id ON blog.post_reactions(post_id);
CREATE INDEX idx_post_reactions_user_id ON blog.post_reactions(user_id);

CREATE INDEX idx_user_agreements_post_id ON blog.user_agreements(post_id);
CREATE INDEX idx_user_agreements_user_id_post_id ON blog.user_agreements(user_id, post_id);

--

CREATE OR REPLACE FUNCTION blog.increment_post_views(p_post_id INT)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM blog.post_views WHERE post_id = p_post_id) THEN
        UPDATE blog.post_views
        SET views = views + 1, last_updated = CURRENT_TIMESTAMP
        WHERE post_id = p_post_id;
    ELSE
        INSERT INTO blog.post_views (post_id, views, last_updated)
        VALUES (p_post_id, 1, CURRENT_TIMESTAMP);
    END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;


CREATE OR REPLACE FUNCTION blog.comments_check_constraints()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reply_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM blog.comments WHERE id = NEW.reply_id) THEN
            RAISE EXCEPTION 'Reply ID does not exist';
        END IF;

        IF (SELECT post_id FROM blog.comments WHERE id = NEW.reply_id) != NEW.post_id THEN
            RAISE EXCEPTION 'Reply must belong to the same post';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comments_check_constraints_trigger
BEFORE INSERT ON blog.comments
FOR EACH ROW
EXECUTE FUNCTION blog.comments_check_constraints();

CREATE OR REPLACE FUNCTION blog.set_is_restricted_on_insert()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE blog.posts
    SET is_restricted = true
    WHERE id = NEW.post_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION blog.set_is_restricted_on_delete()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM blog.post_access_roles WHERE post_id = OLD.post_id)
       AND NOT EXISTS (SELECT 1 FROM blog.post_access_users WHERE post_id = OLD.post_id) THEN
        UPDATE blog.posts
        SET is_restricted = false
        WHERE id = OLD.post_id;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_is_restricted_on_insert_post_access_roles
AFTER INSERT ON blog.post_access_roles
FOR EACH ROW
EXECUTE FUNCTION blog.set_is_restricted_on_insert();

CREATE TRIGGER trigger_set_is_restricted_on_insert_post_access_users
AFTER INSERT ON blog.post_access_users
FOR EACH ROW
EXECUTE FUNCTION blog.set_is_restricted_on_insert();

CREATE TRIGGER trigger_set_is_restricted_on_delete_post_access_roles
AFTER DELETE ON blog.post_access_roles
FOR EACH ROW
EXECUTE FUNCTION blog.set_is_restricted_on_delete();

CREATE TRIGGER trigger_set_is_restricted_on_delete_post_access_users
AFTER DELETE ON blog.post_access_users
FOR EACH ROW
EXECUTE FUNCTION blog.set_is_restricted_on_delete();

CREATE OR REPLACE FUNCTION blog.mirror_post_relation()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM blog.post_relations 
        WHERE post_a_id = NEW.post_b_id 
          AND post_b_id = NEW.post_a_id
    ) THEN
        INSERT INTO blog.post_relations(post_a_id, post_b_id)
        VALUES (NEW.post_b_id, NEW.post_a_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_mirror_post_relation
AFTER INSERT ON blog.post_relations
FOR EACH ROW
EXECUTE FUNCTION blog.mirror_post_relation();

CREATE OR REPLACE FUNCTION blog.can_user_access_post(
    p_post_id BIGINT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_count INT;
    v_user_id UUID;
	v_is_published BOOLEAN;
	v_is_restricted BOOLEAN;
BEGIN
	IF user_management.is_admin_or_mod() THEN
        RETURN TRUE;
    END IF;

    v_user_id := auth.uid();
    
    SELECT is_published, is_restricted
    INTO v_is_published, v_is_restricted
    FROM blog.posts
    WHERE id = p_post_id;
    
	IF NOT v_is_published THEN
        RETURN FALSE;
    END IF;
    
	IF NOT v_is_restricted THEN
        RETURN TRUE;
    END IF;

    SELECT 
        COALESCE(
            (SELECT COUNT(*) FROM blog.post_access_roles WHERE post_id = p_post_id), 0)
    INTO v_count;
    
    IF v_count = 0 THEN
        RETURN TRUE;
    END IF;

    IF EXISTS(SELECT 1 FROM blog.post_access_users WHERE post_id = p_post_id AND user_id = v_user_id) THEN
        RETURN TRUE;
    END IF;

    IF EXISTS(
        SELECT 1
        FROM user_management.user_roles ur
        JOIN blog.post_access_roles par ON ur.role_key = par.role_key
        WHERE ur.user_id = v_user_id AND par.post_id = p_post_id
    ) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION blog.toggle_post_reaction(
    p_post_id BIGINT,
    p_reaction blog.reaction_type
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    already_exists BOOLEAN;
    conflicting_reaction blog.reaction_type;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM blog.post_reactions
        WHERE user_id = auth.uid()
          AND post_id = p_post_id
          AND reaction = p_reaction
    ) INTO already_exists;

    IF p_reaction = 'like' THEN
        conflicting_reaction := 'dislike';
    ELSIF p_reaction = 'dislike' THEN
        conflicting_reaction := 'like';
    ELSE
        conflicting_reaction := NULL;
    END IF;

    IF conflicting_reaction IS NOT NULL THEN
        DELETE FROM blog.post_reactions
        WHERE user_id = auth.uid()
          AND post_id = p_post_id
          AND reaction = conflicting_reaction;
    END IF;

    IF already_exists THEN
        DELETE FROM blog.post_reactions
        WHERE user_id = auth.uid()
          AND post_id = p_post_id
          AND reaction = p_reaction;

        RETURN FALSE;
    ELSE
        INSERT INTO blog.post_reactions(user_id, post_id, reaction)
        VALUES (auth.uid(), p_post_id, p_reaction);

        RETURN TRUE;
    END IF;
END;
$$;


```

---

```SQL
ALTER TABLE blog.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_warnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_access_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_access_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.user_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog.post_comment_counts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view posts" 
ON blog.posts
FOR SELECT
TO public
USING (
(is_published = TRUE) OR (SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Public can view post views" 
    ON blog.post_views
    FOR SELECT
    USING (true);

CREATE POLICY "Users can view post contents" 
ON blog.post_contents
FOR SELECT
USING (blog.can_user_access_post(id));

CREATE POLICY "Users can view comment counts for accessible posts"
ON blog.post_comment_counts
FOR SELECT
USING (
    blog.can_user_access_post(post_id)
);

ALTER FUNCTION blog.handle_comment_count() SECURITY DEFINER;
ALTER FUNCTION blog.ensure_post_comment_count(BIGINT) SECURITY DEFINER;
REVOKE ALL ON FUNCTION blog.handle_comment_count() FROM anon, authenticated;
REVOKE ALL ON FUNCTION blog.ensure_post_comment_count(BIGINT) FROM anon, authenticated;


CREATE POLICY "Users can view post tags" 
ON blog.post_tags
FOR SELECT
USING (blog.can_user_access_post(post_id));

CREATE POLICY "Users can view post warnings" 
ON blog.post_warnings
FOR SELECT
USING (blog.can_user_access_post(id));

CREATE POLICY "Users can view post transformations" 
ON blog.post_transformations
FOR SELECT
USING (blog.can_user_access_post(post_id));

CREATE POLICY "Users can view post metadata" 
ON blog.post_metadata
FOR SELECT
USING (blog.can_user_access_post(id));

CREATE POLICY "Users can view post references" 
ON blog.post_references
FOR SELECT
USING (blog.can_user_access_post(post_id));

CREATE POLICY "Users can view post reactions" 
ON blog.post_reactions
FOR SELECT
USING (blog.can_user_access_post(post_id));

CREATE POLICY "Select comment"
ON blog.comments
FOR SELECT
USING (
    NOT is_deleted AND blog.can_user_access_post(post_id) 
);

CREATE POLICY "Users can view post relations" 
ON blog.post_relations
FOR SELECT
USING (true);

CREATE POLICY "Public can view access roles" 
ON blog.post_access_roles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public can view access users" 
ON blog.post_access_users
FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Public can view access tags" 
ON blog.tags
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can select reactions"
ON blog.post_reactions
FOR SELECT
USING (
true
);

CREATE POLICY "Users can select agreements"
ON blog.user_agreements
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can add agreements "
ON blog.user_agreements
FOR INSERT
WITH CHECK (user_id = auth.uid());


CREATE POLICY "Insert own comment"
ON blog.comments
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = author_id AND
    blog.can_user_access_post(post_id)
);

CREATE POLICY "Update own comment"
ON blog.comments
FOR UPDATE
TO authenticated
USING (
    auth.uid() = author_id AND
    blog.can_user_access_post(post_id)
);

--

CREATE POLICY "Authenticated users can create posts"
ON blog.posts
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can update posts"
ON blog.posts
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete posts"
ON blog.posts
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

--

CREATE POLICY "Authenticated users can create post contents"
ON blog.post_contents
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can update post contents"
ON blog.post_contents
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete post contents"
ON blog.post_contents
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

--

CREATE POLICY "Authenticated users can create post tags"
ON blog.post_tags
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete post tags"
ON blog.post_tags
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can create tags"
ON blog.tags
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

--

CREATE POLICY "Authenticated users can create post warnings"
ON blog.post_warnings
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can update post warnings"
ON blog.post_warnings
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete post warnings"
ON blog.post_warnings
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);
--

CREATE POLICY "Authenticated users can create post transformations"
ON blog.post_transformations
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can update post transformations"
ON blog.post_transformations
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete post transformations"
ON blog.post_transformations
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

--

CREATE POLICY "Authenticated users can create post metadata"
ON blog.post_metadata
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can update post metadata"
ON blog.post_metadata
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Authenticated users can delete post metadata"
ON blog.post_metadata
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

---

CREATE POLICY "Users can create post references" 
ON blog.post_references
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Users can update post references" 
ON blog.post_references
FOR UPDATE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
)
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Users can delete post references" 
ON blog.post_references
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

---

CREATE POLICY "Users can create post relations" 
ON blog.post_relations
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Users can delete post relations" 
ON blog.post_relations
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);
---

CREATE POLICY "Users can insert their own reactions"
ON blog.post_reactions
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Users can delete their own reactions"
ON blog.post_reactions
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);

---
CREATE POLICY "Mods and admins can create post access roles" 
ON blog.post_access_roles
FOR INSERT
TO authenticated
WITH CHECK (
(SELECT user_management.is_admin_or_mod())
);

CREATE POLICY "Mods and admins can delete post access roles" 
ON blog.post_access_roles
FOR DELETE
TO authenticated
USING (
(SELECT user_management.is_admin_or_mod())
);
---


CREATE POLICY "Authenticated users can create ideas"
ON blog.ideas
FOR INSERT
TO authenticated
WITH CHECK (
	true
);
```

```SQL
CREATE OR REPLACE FUNCTION blog._create_post(author UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_post_id BIGINT;
BEGIN
    INSERT INTO blog.posts(author_id) VALUES (author)
    RETURNING id INTO v_post_id;
    
    RETURN v_post_id;
END;
$$;

CREATE OR REPLACE FUNCTION blog._update_post_content(
    post_id BIGINT,
    title TEXT,
    summary TEXT,
    content TEXT,
    picture_url TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    INSERT INTO blog.post_contents(id, title, summary, content, picture_url)
    VALUES (post_id, title, summary, content, picture_url)
    ON CONFLICT (id) 
    DO UPDATE 
    SET 
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        content = EXCLUDED.content,
        picture_url = EXCLUDED.picture_url;
END;
$$;

CREATE OR REPLACE FUNCTION blog._update_post_tags(
    p_post_id BIGINT,
    p_tags JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_tag JSONB;
    v_tag_text TEXT;
    v_tag_id BIGINT;
BEGIN
    DELETE FROM blog.post_tags
    WHERE post_id = p_post_id
    AND tag_id NOT IN (
        SELECT id FROM blog.tags WHERE value IN (SELECT lower(trim(v_tag_elem->>'value')) FROM jsonb_array_elements(p_tags) v_tag_elem)
    );

    FOR v_tag IN SELECT * FROM jsonb_array_elements(p_tags) v_tag_elem LOOP
        v_tag_text := lower(trim(v_tag->>'value'));
        
        IF v_tag_text <> '' THEN
            SELECT id INTO v_tag_id
            FROM blog.tags
            WHERE value = v_tag_text
            LIMIT 1;
            
            IF NOT FOUND THEN
                INSERT INTO blog.tags(value)
                VALUES (v_tag_text)
                RETURNING id INTO v_tag_id;
            END IF;

            INSERT INTO blog.post_tags(post_id, tag_id)
            VALUES (p_post_id, v_tag_id)
            ON CONFLICT (post_id, tag_id) DO NOTHING;
        END IF;
    END LOOP;
END;
$$;


CREATE OR REPLACE FUNCTION blog._update_post_warnings(
    p_post_id BIGINT,
    warnings JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    w JSONB;
    v_warning_level blog.warning_level;
    v_warning_text TEXT;
BEGIN
    DELETE FROM blog.post_warnings
    WHERE post_id = p_post_id
    AND (level, text) NOT IN (
        SELECT 
            (warning->>'level')::blog.warning_level,
            warning->>'text'
        FROM jsonb_array_elements(warnings) AS warning
    );

    FOR w IN SELECT * FROM jsonb_array_elements(warnings) AS warning LOOP
        v_warning_level := (w->>'level')::blog.warning_level;
        v_warning_text := w->>'text';

        INSERT INTO blog.post_warnings(post_id, level, text)
        VALUES (p_post_id, v_warning_level, v_warning_text)
        ON CONFLICT (post_id, level, text) DO NOTHING;
    END LOOP;
END;
$$;


CREATE OR REPLACE FUNCTION blog._update_post_transformations(
    p_post_id BIGINT,
    transformations JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    t JSONB;
    v_transformation_type blog.transformation_type;
    v_from_value TEXT;
    v_to_value TEXT;
BEGIN
    DELETE FROM blog.post_transformations
    WHERE post_id = p_post_id
    AND (type, from_value, to_value) NOT IN (
        SELECT 
            (trans->>'type')::blog.transformation_type,
            trans->>'from_value',
            trans->>'to_value'
        FROM jsonb_array_elements(transformations) AS trans
    );

    FOR t IN SELECT * FROM jsonb_array_elements(transformations) LOOP
        v_transformation_type := (t->>'type')::blog.transformation_type;
        v_from_value := t->>'from_value';
        v_to_value := t->>'to_value';

        INSERT INTO blog.post_transformations(post_id, type, from_value, to_value)
        VALUES (p_post_id, v_transformation_type, v_from_value, v_to_value)
		ON CONFLICT (post_id, type, from_value, to_value) DO NOTHING;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION blog.slugify(base TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE STRICT
AS $$  
    SELECT trim(both '-' FROM regexp_replace(
        regexp_replace(lower(unaccent(base)), '[^a-z0-9]+', '-', 'g'
        ), '(^-+|-+$)', ''
    ));
  $$;

CREATE OR REPLACE FUNCTION blog.generate_unique_slug(base TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    v_base_slug TEXT := blog.slugify(base);
    v_slug TEXT := v_base_slug;
    v_count INT := 1;
BEGIN
    IF v_base_slug = '' THEN
        v_base_slug := 'post';
    END IF;

    v_slug := v_base_slug;

    WHILE EXISTS (SELECT 1 FROM blog.post_metadata WHERE slug = v_slug) LOOP
        v_count := v_count + 1;
        v_slug := v_base_slug || '-' || v_count;
    END LOOP;

    RETURN v_slug;
END;
$$;

CREATE OR REPLACE FUNCTION blog._update_post_metadata(
    post_id BIGINT,
	slug TEXT,
    explicitness blog.content_explicitness
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    INSERT INTO blog.post_metadata(id, slug, explicitness)
    VALUES (post_id, slug, explicitness)
    ON CONFLICT (id) 
    DO UPDATE 
    SET 
        slug = EXCLUDED.slug,
        explicitness = EXCLUDED.explicitness;
END;
$$;


CREATE OR REPLACE FUNCTION blog._update_post_references(
    p_post_id BIGINT,
    p_post_references JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    r JSONB;
    v_url TEXT;
    v_name TEXT;
    v_picture_url TEXT;
    v_description TEXT;
    v_reference_type blog.reference_type;
BEGIN
    DELETE FROM blog.post_references
    WHERE post_id = p_post_id
    AND name NOT IN (
        SELECT json_element->>'name'
        FROM jsonb_array_elements(p_post_references) json_element
    );

    FOR r IN SELECT * FROM jsonb_array_elements(p_post_references) LOOP
        v_url := r->>'url';
        v_name := r->>'name';
        v_picture_url := r->>'picture_url';
        v_description := r->>'description';
        v_reference_type := (r->>'type')::blog.reference_type;

        INSERT INTO blog.post_references(post_id, url, name, picture_url, description, type)
        VALUES (p_post_id, v_url, v_name, v_picture_url, v_description, v_reference_type)
        ON CONFLICT (name, post_id) DO NOTHING;
    END LOOP;
END;
$$;


CREATE OR REPLACE FUNCTION blog._update_post_relations(
    post_id BIGINT,
    related_posts JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    related JSONB;
    related_id BIGINT;
BEGIN

    DELETE FROM blog.post_relations
    WHERE (post_a_id = post_id AND post_b_id NOT IN (SELECT unnest((related_posts ->> 'id')::BIGINT[])))
       OR (post_b_id = post_id AND post_a_id NOT IN (SELECT unnest((related_posts ->> 'id')::BIGINT[])));

    FOR related IN SELECT * FROM jsonb_array_elements(related_posts)
    LOOP
        related_id := (related ->> 'id')::BIGINT;

        INSERT INTO blog.post_relations(post_a_id, post_b_id)
        VALUES (post_id, related_id)
        ON CONFLICT DO NOTHING;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION blog.update_post_access_roles(
    p_post_id BIGINT,
    roles JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_existing_role user_management.user_role;
    v_new_role JSONB;
    v_role_key user_management.user_role;
BEGIN
    FOR v_existing_role IN 
        SELECT role_key 
        FROM blog.post_access_roles
        WHERE post_id = p_post_id
    LOOP
        IF NOT EXISTS (
            SELECT 1 
            FROM jsonb_array_elements(roles) AS role_obj
            WHERE (role_obj->>'role_key')::user_management.user_role = v_existing_role
        ) THEN
            DELETE FROM blog.post_access_roles
            WHERE post_id = p_post_id AND role_key = v_existing_role;
        END IF;
    END LOOP;
    
    FOR v_new_role IN
        SELECT * FROM jsonb_array_elements(roles)
    LOOP
        v_role_key := (v_new_role->>'role_key')::user_management.user_role;

        IF NOT EXISTS (
            SELECT 1
            FROM blog.post_access_roles
            WHERE post_id = p_post_id AND role_key = v_role_key
        ) THEN
            INSERT INTO blog.post_access_roles(post_id, role_key)
            VALUES (p_post_id, v_role_key);
        END IF;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION blog.create_post(
    title TEXT,
    summary TEXT,
    content TEXT,
    picture_url TEXT DEFAULT NULL,
    tags JSONB DEFAULT '[]'::JSONB,
    warnings JSONB DEFAULT '[]'::JSONB,
    transformations JSONB DEFAULT '[]'::JSONB,
    explicitness blog.content_explicitness DEFAULT 'safe',
    post_references JSONB DEFAULT '[]'::JSONB,
    related_posts JSONB DEFAULT '[]'::JSONB,
    required_roles JSONB DEFAULT '[]'::JSONB
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
    v_post_id BIGINT;
    v_user_id UUID;
    v_slug TEXT;
BEGIN
    v_user_id := auth.uid();
    v_post_id := blog._create_post(v_user_id);
    
    v_slug := blog.generate_unique_slug(title);

    PERFORM blog._update_post_content(v_post_id, title, summary, content, picture_url);
    IF jsonb_array_length(tags) > 0 THEN
        PERFORM blog._update_post_tags(v_post_id, tags);
    END IF;
    IF jsonb_array_length(warnings) > 0 THEN
        PERFORM blog._update_post_warnings(v_post_id, warnings);
    END IF;
    IF jsonb_array_length(transformations) > 0 THEN
        PERFORM blog._update_post_transformations(v_post_id, transformations);
    END IF;
    PERFORM blog._update_post_metadata(v_post_id, v_slug, explicitness);
    IF jsonb_array_length(post_references) > 0 THEN
        PERFORM blog._update_post_references(v_post_id, post_references);
    END IF;
    IF jsonb_array_length(related_posts) > 0 THEN
        PERFORM blog._update_post_relations(v_post_id, related_posts);
    END IF;

    PERFORM blog.update_post_access_roles(v_post_id, required_roles);
    RETURN v_post_id;
END;
$$;


CREATE OR REPLACE FUNCTION blog.update_post(
    post_id BIGINT,
    title TEXT,
    summary TEXT,
    content TEXT,
    slug TEXT,
    picture_url TEXT DEFAULT NULL,
    tags JSONB DEFAULT '[]'::JSONB,
    warnings JSONB DEFAULT '[]'::JSONB,
    transformations JSONB DEFAULT '[]'::JSONB,
    explicitness blog.content_explicitness DEFAULT 'safe',
    post_references JSONB DEFAULT '[]'::JSONB,
    related_posts JSONB DEFAULT '[]'::JSONB,
    required_roles JSONB DEFAULT '[]'::JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    PERFORM blog._update_post_content(post_id, title, summary, content, picture_url);

	PERFORM blog._update_post_tags(post_id, tags);
	PERFORM blog._update_post_warnings(post_id, warnings);
	PERFORM blog._update_post_transformations(post_id, transformations);
    PERFORM blog._update_post_metadata(post_id, slug, explicitness);
	PERFORM blog._update_post_references(post_id, post_references);
	PERFORM blog._update_post_relations(post_id, related_posts);
    PERFORM blog.update_post_access_roles(post_id, required_roles);
END;
$$;


```