# BIET Autonomous Academic OS

An AI-powered, unified academic management and campus intelligence operating system for Bhimavaram Institute of Engineering & Technology (BIET).

🚀 **Live Demo**: [https://biet-flax.vercel.app](https://biet-flax.vercel.app)

---

## 🏛️ Portals

- **🎓 Faculty Hub**: Period 1-7 Roll-Call with instant SMS alerts, Master Class Timetable, Syllabus Coverage Tracker, and Bloom's Taxonomy Mid Paper Studio.
- **📱 Student Portal**: Attendance monitoring & 75% target simulator, SGPA/CGPA calculator, course schedules, fee status, and LMS workspace.
- **👔 Principal & HOD Executive Dashboard**: College-wide real-time metrics, department attendance trends, NAAC/NBA metrics, and grievance resolution.
- **📜 Exam Cell Portal**: Autonomous examination regulations management (R20 / BR24 / R23), exam scheduling, and result processing.
- **💼 Placement & Training Portal**: Recruitment drive management, student eligibility filters, and placement statistics.
- **👨‍👩‍👧 Parent Portal**: Ward progress tracking, daily attendance push alerts, and direct mentor WhatsApp integration (Telugu & English support).

---

## ✨ Key Features

- **Bloom's Taxonomy AI Mid Paper Studio**: Automated question paper generator adhering to Bloom's cognitive levels and NBA Course Outcomes (CO1-CO5) using Google Gemini AI.
- **Period 1-7 Attendance & Instant SMS Alerts**: Real-time period-wise attendance roll-call with automated notification triggers for absentee parents.
- **Syllabus & Unit Coverage Tracker**: Unit-by-unit syllabus completion tracker (Units 1 to 5) with visual progress monitoring.
- **Autonomous Regulation Calculator**: SGPA/CGPA calculations, letter grading (`S=10`, `A=9`, `B=8`), and 75% attendance condonation/detention rules under BIET autonomous regulations.
- **Dynamic Branch Filter**: Instant department switching and data filtering across CSE, ECE, EEE, MECH, CIVIL, AIML, and IT.
- **LMS & Academic Resource Workspace**: Centralized repository for course lecture notes, assignments, and study materials.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Tailwind CSS v4, Lucide Icons, Motion
- **Build & Server**: Vite 6, TSX, Express (Node.js)
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`)

---

## 🗄️ Database Setup (`supabase_schema.sql`)

The database schema and initial seed data are provided in [`supabase_schema.sql`](./supabase_schema.sql).

- **Table**: `public.user_credentials` (handles authentication, user roles, department metadata, and HTNO/Faculty IDs).
- **Security**: Row Level Security (RLS) policies configured for read/write access.
- **Seed Data**: Pre-seeded demo credentials for Students, Faculty, HODs, and Principal accounts.

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/honey1530/BIET.git
   cd BIET
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Add your API keys in `.env.local`**:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   PORT=3000
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:3000`.

---

## 🖼️ Screenshots

| Portal | Preview |
| :--- | :--- |
| **Portal Gateway Launchpad** | ![BIET Logo](./public/biet_logo.png) |
| **Faculty Hub & Mid Paper Studio** | *Interactive Faculty Workstation with Bloom's AI Generator* |
| **Student Portal & Attendance Simulator** | *Student Credit Auditor, Attendance Target Calculator & LMS* |
| **Executive Principal Cockpit** | *Institutional Real-time Analytics & Branch Performance Dashboard* |
