CREATE TABLE IF NOT EXISTS lessons (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content text NOT NULL,
    subject_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    file_id integer,
    link_id integer
);
