CREATE TABLE IF NOT EXISTS lessons (
    id integer NOT NULL,
    file_url text NOT NULL,
    file_type character varying(50) NOT NULL,
    size integer NOT NULL,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);