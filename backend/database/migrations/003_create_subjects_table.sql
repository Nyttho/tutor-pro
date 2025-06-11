CREATE TABLE IF NOT EXISTS subjects (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    category_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer
);
