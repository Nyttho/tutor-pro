ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_status_check;

ALTER TABLE courses ADD CONSTRAINT courses_status_check CHECK (status::text = ANY (ARRAY['pending', 'canceled', 'paid'])));