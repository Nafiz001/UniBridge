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
    min_gpa DECIMAL(3, 2) NOT NULL,
    min_ielts DECIMAL(3, 1) NOT NULL,
    tuition_fee INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    university_id INTEGER NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gpa DECIMAL(3, 2) NOT NULL,
    ielts DECIMAL(3, 1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for better query performance
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_degree_level ON universities(degree_level);
CREATE INDEX idx_universities_tuition_fee ON universities(tuition_fee);
CREATE INDEX idx_applications_university_id ON applications(university_id);
CREATE INDEX idx_applications_email ON applications(email);

-- Seed Universities Data (15 universities with varied characteristics)

-- USA Universities
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('Massachusetts Institute of Technology', 'USA', 'Master', 3.7, 7.0, 55000, 'World-renowned for engineering and technology programs. Located in Cambridge, MA. Offers cutting-edge research opportunities and strong industry connections.'),
('Stanford University', 'USA', 'PhD', 3.8, 7.5, 58000, 'Leading research university in Silicon Valley. Excellence in computer science, engineering, and business. State-of-the-art facilities and innovation ecosystem.'),
('University of California, Berkeley', 'USA', 'Bachelor', 3.5, 6.5, 45000, 'Top public university with diverse academic programs. Strong emphasis on research and social impact. Beautiful campus in the San Francisco Bay Area.');

-- UK Universities
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('University of Oxford', 'UK', 'Master', 3.7, 7.5, 35000, 'One of the oldest and most prestigious universities in the world. Tutorial-based learning system. Rich history and academic excellence across all disciplines.'),
('Imperial College London', 'UK', 'Bachelor', 3.6, 6.5, 38000, 'Specialized in science, engineering, medicine, and business. Located in the heart of London. Strong focus on innovation and entrepreneurship.'),
('University of Edinburgh', 'UK', 'PhD', 3.5, 7.0, 28000, 'Historic Scottish university with excellent research reputation. Beautiful campus in Edinburgh. Strong international community and diverse programs.');

-- Canada Universities
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('University of Toronto', 'Canada', 'Master', 3.3, 6.5, 32000, 'Canada\'s leading research university. Diverse and multicultural campus. Excellence in various fields including computer science, engineering, and medicine.'),
('McGill University', 'Canada', 'Bachelor', 3.0, 6.5, 28000, 'Top Canadian university located in Montreal. Bilingual environment (English/French). Strong programs in medicine, law, and sciences.');

-- Australia Universities
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('Australian National University', 'Australia', 'Master', 3.4, 6.5, 42000, 'Australia\'s national research university in Canberra. Excellence in research and teaching. Strong focus on Asia-Pacific studies and public policy.'),
('University of Melbourne', 'Australia', 'Bachelor', 3.2, 6.5, 40000, 'Leading Australian university with comprehensive programs. Beautiful campus in Melbourne. Strong international rankings and research output.');

-- Germany Universities
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('Technical University of Munich', 'Germany', 'Master', 3.3, 6.5, 15000, 'Top German technical university. Strong engineering and technology programs. Excellent industry connections and research facilities.'),
('Heidelberg University', 'Germany', 'PhD', 3.4, 7.0, 18000, 'Germany\'s oldest university with strong research tradition. Excellence in sciences and humanities. Historic campus and modern facilities.');

-- Additional Universities (France, Netherlands, Singapore)
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
('École Polytechnique', 'France', 'Master', 3.5, 6.5, 22000, 'France\'s leading engineering school. Rigorous academic programs and prestigious reputation. Located near Paris with strong industry partnerships.'),
('University of Amsterdam', 'Netherlands', 'Bachelor', 3.0, 6.0, 25000, 'Top Dutch university with diverse international programs. Located in vibrant Amsterdam. Strong programs in social sciences, business, and humanities.'),
('National University of Singapore', 'Singapore', 'Master', 3.6, 6.5, 38000, 'Asia\'s leading university with world-class facilities. Strategic location in a global business hub. Excellence in engineering, computing, and business.');

-- Display summary
SELECT 'Database setup complete!' AS status;
SELECT COUNT(*) AS total_universities FROM universities;
SELECT country, COUNT(*) AS count FROM universities GROUP BY country ORDER BY count DESC;
SELECT degree_level, COUNT(*) AS count FROM universities GROUP BY degree_level ORDER BY count DESC;
