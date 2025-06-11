CREATE TABLE IF NOT EXISTS teachers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    address text,
    city_id integer,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true,
    email character varying(255),
    tel character varying(20),
    age integer NOT NULL,
    is_deleted boolean DEFAULT false
);
