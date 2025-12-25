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

-- Insert Sample Universities (50+ universities across 20+ countries)
INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee, description) VALUES
-- USA Universities
('Harvard University', 'USA', 'Bachelor', 3.8, 7.0, 54000, 'Prestigious Ivy League university with world-class research facilities and distinguished faculty members.'),
('Stanford University', 'USA', 'Master', 3.7, 7.0, 58000, 'Leading innovation hub in Silicon Valley, known for engineering and business programs.'),
('MIT', 'USA', 'PhD', 3.9, 7.5, 55000, 'World-renowned institution specializing in science, technology, and engineering excellence.'),
('Yale University', 'USA', 'Bachelor', 3.8, 7.0, 56000, 'Ivy League institution with strong liberal arts tradition and professional schools.'),
('Princeton University', 'USA', 'Master', 3.7, 7.0, 53000, 'Elite research university with focus on undergraduate education and graduate research.'),
('Columbia University', 'USA', 'Bachelor', 3.6, 7.0, 59000, 'Urban Ivy League university in New York City with diverse international programs.'),

-- UK Universities
('University of Oxford', 'UK', 'Bachelor', 3.8, 7.0, 35000, 'One of the oldest and most prestigious universities globally with centuries of academic tradition.'),
('University of Cambridge', 'UK', 'Master', 3.7, 7.0, 38000, 'Historic institution known for producing Nobel laureates and groundbreaking research.'),
('Imperial College London', 'UK', 'Bachelor', 3.5, 6.5, 42000, 'Specialist in science, engineering, medicine, and business with strong industry connections.'),
('London School of Economics', 'UK', 'Master', 3.6, 7.0, 40000, 'Leading social science institution with focus on economics, politics, and law.'),
('University of Edinburgh', 'UK', 'Bachelor', 3.4, 6.5, 32000, 'Scotland''s prestigious university with strong research reputation and historic campus.'),
('University College London', 'UK', 'PhD', 3.6, 7.0, 37000, 'World-leading multidisciplinary university in the heart of London.'),

-- Canada Universities
('University of Toronto', 'Canada', 'Master', 3.3, 6.5, 32000, 'Canada''s leading research university with diverse programs and multicultural environment.'),
('McGill University', 'Canada', 'Bachelor', 3.4, 6.5, 28000, 'Internationally recognized university in Montreal with strong research focus.'),
('University of British Columbia', 'Canada', 'Master', 3.2, 6.5, 30000, 'Beautiful campus university with excellent research programs and international reputation.'),
('University of Waterloo', 'Canada', 'Bachelor', 3.3, 6.5, 26000, 'Renowned for co-op programs and engineering excellence in technology fields.'),

-- Australia Universities
('University of Melbourne', 'Australia', 'Master', 3.2, 6.5, 35000, 'Top-ranked Australian university with excellent graduate employability rates.'),
('Australian National University', 'Australia', 'PhD', 3.5, 7.0, 40000, 'Premier research institution located in the nation''s capital.'),
('University of Sydney', 'Australia', 'Bachelor', 3.3, 6.5, 38000, 'Australia''s first university with beautiful sandstone campus and strong academic reputation.'),
('University of Queensland', 'Australia', 'Master', 3.2, 6.5, 34000, 'Leading research university with focus on science and technology innovation.'),
('Monash University', 'Australia', 'Bachelor', 3.1, 6.0, 33000, 'Large research university with campuses across Australia and international locations.'),

-- Germany Universities
('Technical University of Munich', 'Germany', 'Master', 3.0, 6.0, 15000, 'Leading technical university with strong engineering and technology programs.'),
('University of Heidelberg', 'Germany', 'Bachelor', 3.2, 6.5, 12000, 'Germany''s oldest university with renowned medical and research programs.'),
('Humboldt University Berlin', 'Germany', 'PhD', 3.4, 6.5, 10000, 'Historic university in Berlin with strong humanities and social sciences programs.'),
('Free University of Berlin', 'Germany', 'Master', 3.1, 6.0, 11000, 'International research university with strong emphasis on social sciences.'),

-- Singapore Universities
('National University of Singapore', 'Singapore', 'Master', 3.5, 6.5, 38000, 'Asia''s top university with excellent global rankings and research output.'),
('Nanyang Technological University', 'Singapore', 'Bachelor', 3.4, 6.5, 36000, 'Young research-intensive university with focus on engineering and technology.'),

-- Netherlands Universities
('University of Amsterdam', 'Netherlands', 'Bachelor', 3.3, 6.5, 22000, 'Historic university in Europe''s most international city with diverse programs.'),
('Delft University of Technology', 'Netherlands', 'Master', 3.4, 6.5, 20000, 'Leading engineering university with innovative approach to technology education.'),
('Utrecht University', 'Netherlands', 'Bachelor', 3.2, 6.5, 21000, 'Comprehensive research university with strong natural sciences programs.'),

-- Switzerland Universities
('ETH Zurich', 'Switzerland', 'PhD', 3.7, 7.0, 25000, 'World-leading science and technology institution known for innovation and research.'),
('University of Zurich', 'Switzerland', 'Master', 3.5, 7.0, 24000, 'Largest Swiss university with strong research focus and international programs.'),

-- France Universities
('Sorbonne University', 'France', 'Master', 3.4, 6.5, 18000, 'Historic Parisian university with strong humanities and sciences programs.'),
('Ecole Polytechnique', 'France', 'Bachelor', 3.6, 7.0, 16000, 'Elite French engineering school with rigorous scientific programs.'),
('Sciences Po Paris', 'France', 'Master', 3.5, 7.0, 19000, 'Leading institution for social sciences, international relations, and political science.'),

-- Sweden Universities
('Lund University', 'Sweden', 'Bachelor', 3.2, 6.5, 14000, 'One of Scandinavia''s largest universities with comprehensive programs.'),
('Uppsala University', 'Sweden', 'Master', 3.3, 6.5, 15000, 'Nordic region''s oldest university with strong research tradition.'),
('KTH Royal Institute of Technology', 'Sweden', 'Bachelor', 3.4, 6.5, 16000, 'Sweden''s largest technical university with focus on engineering and technology.'),

-- Japan Universities
('University of Tokyo', 'Japan', 'Master', 3.5, 6.5, 30000, 'Japan''s most prestigious university with strong research and international programs.'),
('Kyoto University', 'Japan', 'PhD', 3.6, 7.0, 32000, 'Leading research university known for producing Nobel Prize winners.'),
('Osaka University', 'Japan', 'Bachelor', 3.3, 6.5, 28000, 'Comprehensive research university with strong science and engineering programs.'),

-- South Korea Universities
('Seoul National University', 'South Korea', 'Master', 3.5, 6.5, 25000, 'South Korea''s most prestigious university with comprehensive academic programs.'),
('KAIST', 'South Korea', 'Bachelor', 3.4, 6.5, 24000, 'Leading science and technology university with focus on innovation.'),

-- New Zealand Universities
('University of Auckland', 'New Zealand', 'Bachelor', 3.2, 6.5, 27000, 'New Zealand''s largest and highest-ranked university with diverse programs.'),
('University of Otago', 'New Zealand', 'Master', 3.1, 6.5, 26000, 'Oldest New Zealand university with strong health sciences and research programs.'),

-- Ireland Universities
('Trinity College Dublin', 'Ireland', 'Bachelor', 3.4, 6.5, 23000, 'Ireland''s oldest university with beautiful historic campus and strong academic reputation.'),
('University College Dublin', 'Ireland', 'Master', 3.3, 6.5, 22000, 'Ireland''s largest university with comprehensive programs and strong research focus.'),

-- Norway Universities
('University of Oslo', 'Norway', 'Master', 3.2, 6.5, 8000, 'Norway''s oldest and highest-ranked university with strong research tradition.'),

-- Denmark Universities
('University of Copenhagen', 'Denmark', 'Bachelor', 3.3, 6.5, 12000, 'Scandinavia''s second-oldest university with strong research and international programs.'),

-- Belgium Universities
('KU Leuven', 'Belgium', 'Master', 3.4, 6.5, 13000, 'Europe''s most innovative university with strong research focus and historic tradition.'),

-- Austria Universities
('University of Vienna', 'Austria', 'Bachelor', 3.2, 6.5, 14000, 'Central Europe''s largest university with comprehensive programs and historic legacy.'),

-- Hong Kong Universities
('University of Hong Kong', 'Hong Kong', 'Master', 3.5, 6.5, 35000, 'Asia''s global university with strong international reputation and English-taught programs.'),
('Chinese University of Hong Kong', 'Hong Kong', 'Bachelor', 3.4, 6.5, 33000, 'Leading research university with bilingual education and strong business programs.');

-- Create indexes for better query performance
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_degree_level ON universities(degree_level);
CREATE INDEX idx_universities_tuition_fee ON universities(tuition_fee);
CREATE INDEX idx_applications_university_id ON applications(university_id);
CREATE INDEX idx_applications_created_at ON applications(created_at);

-- Display inserted data
SELECT COUNT(*) as total_universities FROM universities;
SELECT country, COUNT(*) as count FROM universities GROUP BY country ORDER BY count DESC;
