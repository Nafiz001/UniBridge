-- UniBridge Database Schema and Seed Data
-- PostgreSQL Database Setup

-- Drop existing tables if they exist
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS universities CASCADE;

-- Create Universities Table
CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    degree_level VARCHAR(50) NOT NULL,
    min_gpa DECIMAL(3,2) NOT NULL,
    min_ielts DECIMAL(3,1) NOT NULL,
    tuition_fee INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    gpa DECIMAL(3,2) NOT NULL,
    ielts DECIMAL(3,1) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Universities (15 universities across 8 countries)
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
-- USA Universities
('Harvard University', 'USA', 'Bachelor', 3.8, 7.0, 54000, 'Prestigious Ivy League university with world-class research facilities and distinguished faculty members.'),
('Stanford University', 'USA', 'Master', 3.7, 7.0, 58000, 'Leading innovation hub in Silicon Valley, known for engineering and business programs.'),
('MIT', 'USA', 'PhD', 3.9, 7.5, 55000, 'World-renowned institution specializing in science, technology, and engineering excellence.'),

-- UK Universities
('University of Oxford', 'UK', 'Bachelor', 3.8, 7.0, 35000, 'One of the oldest and most prestigious universities globally with centuries of academic tradition.'),
('University of Cambridge', 'UK', 'Master', 3.7, 7.0, 38000, 'Historic institution known for producing Nobel laureates and groundbreaking research.'),
('Imperial College London', 'UK', 'Bachelor', 3.5, 6.5, 42000, 'Specialist in science, engineering, medicine, and business with strong industry connections.'),

-- Canada Universities
('University of Toronto', 'Canada', 'Master', 3.3, 6.5, 32000, 'Canada''s leading research university with diverse programs and multicultural environment.'),
('McGill University', 'Canada', 'Bachelor', 3.4, 6.5, 28000, 'Internationally recognized university in Montreal with strong research focus.'),

-- Australia Universities
('University of Melbourne', 'Australia', 'Master', 3.2, 6.5, 35000, 'Top-ranked Australian university with excellent graduate employability rates.'),
('Australian National University', 'Australia', 'PhD', 3.5, 7.0, 40000, 'Premier research institution located in the nation''s capital.'),

-- Germany Universities
('Technical University of Munich', 'Germany', 'Master', 3.0, 6.0, 15000, 'Leading technical university with strong engineering and technology programs.'),
('University of Heidelberg', 'Germany', 'Bachelor', 3.2, 6.5, 12000, 'Germany''s oldest university with renowned medical and research programs.'),

-- Singapore Universities
('National University of Singapore', 'Singapore', 'Master', 3.5, 6.5, 38000, 'Asia''s top university with excellent global rankings and research output.'),

-- Netherlands Universities
('University of Amsterdam', 'Netherlands', 'Bachelor', 3.3, 6.5, 22000, 'Historic university in Europe''s most international city with diverse programs.'),

-- Switzerland Universities
('ETH Zurich', 'Switzerland', 'PhD', 3.7, 7.0, 25000, 'World-leading science and technology institution known for innovation and research.');

-- Create indexes for better query performance
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_degree_level ON universities(degree_level);
CREATE INDEX idx_universities_tuition_fee ON universities(tuition_fee);
CREATE INDEX idx_applications_university_id ON applications(university_id);
CREATE INDEX idx_applications_created_at ON applications(created_at);

-- Display inserted data
SELECT COUNT(*) as total_universities FROM universities;
SELECT country, COUNT(*) as count FROM universities GROUP BY country ORDER BY count DESC;
