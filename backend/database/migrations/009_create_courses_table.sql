CREATE TABLE IF NOT EXISTS students (
    id integer NOT NULL,
    student_id integer,
    professor_id integer,
    lesson_id integer,
    scheduled_at timestamp without time zone NOT NULL,
    price numeric(10,2),
    status character varying(20) DEFAULT 'pending'::character varying,
    duration integer DEFAULT 60,
    CONSTRAINT courses_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'canceled'::character varying])::text[])))
);
