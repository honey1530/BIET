-- =========================================================================
-- BIET Academic OS - Supabase SQL Database Schema
-- Copy and paste this script into your Supabase SQL Editor and click RUN
-- =========================================================================

-- 1. Create User Credentials Table
CREATE TABLE IF NOT EXISTS public.user_credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    password_hash TEXT NOT NULL,
    temp_password TEXT,
    is_first_login BOOLEAN DEFAULT TRUE,
    htno VARCHAR(100),
    faculty_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Row Level Security (RLS) Policy (Allow Read/Insert/Update for Anon API Key)
ALTER TABLE public.user_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable Read Access for All Users" 
ON public.user_credentials FOR SELECT USING (true);

CREATE POLICY "Enable Insert Access for All Users" 
ON public.user_credentials FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable Update Access for All Users" 
ON public.user_credentials FOR UPDATE USING (true);

-- 3. Initial Mock Data Seed
INSERT INTO public.user_credentials (username, name, role, department, email, phone, password_hash, temp_password, is_first_login, htno, faculty_id)
VALUES 
('21A91A0501', 'Kolli Sai Teja', 'student', 'CSE', 'saiteja@bietbvrm.ac.in', '9848012345', 'BIET@student2026', 'BIET@student2026', true, '21A91A0501', NULL),
('21A91A0512', 'Gudimetla Navyasri', 'student', 'CSE', 'navyasri@bietbvrm.ac.in', '9848098765', 'BIET@student2026', 'BIET@student2026', true, '21A91A0512', NULL),
('FAC-CSE-01', 'Dr. V. Rama Krishna (HOD CSE)', 'faculty', 'CSE', 'ramakrishna@bietbvrm.ac.in', '9440123456', 'BIET@faculty2026', 'BIET@faculty2026', true, NULL, 'FAC-CSE-01'),
('FAC-CSE-02', 'Dr. G. Srinivas Rao', 'faculty', 'CSE', 'srinivas@bietbvrm.ac.in', '9440654321', 'BIET@faculty2026', 'BIET@faculty2026', true, NULL, 'FAC-CSE-02'),
('principal', 'Dr. B. K. V. Prasad (Principal)', 'principal', 'CSE', 'principal@bietbvrm.ac.in', '8816235466', 'admin123', NULL, false, NULL, NULL)
ON CONFLICT (username) DO NOTHING;
