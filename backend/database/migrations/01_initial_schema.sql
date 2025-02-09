CREATE TABLE Cities (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    post_code VARCHAR(20) NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    city_id INT REFERENCES Cities(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    address TEXT,
    city_id INT REFERENCES Cities(id) ON DELETE SET NULL,
    created_by INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category_id INT REFERENCES Categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE Lessons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    subject_id INT REFERENCES Subjects(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE Courses (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Students(id) ON DELETE CASCADE,
    professor_id INT REFERENCES Users(id) ON DELETE CASCADE,
    lesson_id INT REFERENCES Lessons(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP NOT NULL,
    price NUMERIC(10,2),
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'canceled')) DEFAULT 'pending',
    duration INT DEFAULT 60 -- durée en minutes (par défaut 1h)
);

CREATE TABLE Files (
    id SERIAL PRIMARY KEY,
    file_url TEXT NOT NULL,
    lesson_id INT REFERENCES Lessons(id) ON DELETE CASCADE,
    file_type VARCHAR(50) NOT NULL,
    size INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Links (
    id SERIAL PRIMARY KEY,
    link TEXT NOT NULL,
    lesson_id INT REFERENCES Lessons(id) ON DELETE CASCADE
);
