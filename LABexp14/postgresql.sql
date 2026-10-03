-- ==========================================
-- EXP 14: PostgreSQL - Student Management
-- ==========================================

-- Create database
CREATE DATABASE studentmanagement;

-- IMPORTANT:
-- After creating the database, connect to studentmanagement
-- before running the remaining commands.


-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    enrollment_date DATE NOT NULL
);


-- Insert at least 5 student records
INSERT INTO students (name, branch, email, enrollment_date)
VALUES
('Aman Sharma', 'CSE', 'aman@gmail.com', '2024-02-10'),
('Priya Singh', 'ECE', 'priya@gmail.com', '2023-12-15'),
('Rahul Verma', 'CSE', 'rahul@gmail.com', '2024-03-20'),
('Sneha Gupta', 'ME', 'sneha@gmail.com', '2024-01-05'),
('Arjun Kumar', 'CSE', 'arjun@gmail.com', '2025-02-12');


-- Display all students
SELECT * FROM students;


-- 1. Find students in CSE
SELECT *
FROM students
WHERE branch = 'CSE';


-- 2. Find students enrolled after January 2024
SELECT *
FROM students
WHERE enrollment_date >= '2024-02-01';


-- 3. Update a student's branch
UPDATE students
SET branch = 'CSE'
WHERE id = 2;


-- Verify update
SELECT * FROM students;


-- 4. Delete a student record
DELETE FROM students
WHERE id = 5;


-- Verify deletion
SELECT * FROM students;