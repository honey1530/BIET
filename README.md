<div align="center">

# 🎓 BIET Autonomous Academic OS

### **Enterprise University Management System & AI Campus Operating System**
**Bhimavaram Institute of Engineering & Technology (UGC Autonomous Institution)**

[![Live Demo](https://img.shields.io/badge/Live_Production_App-https%3A%2F%2Fbiet--flax.vercel.app%2F-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://biet-flax.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-honey1530%2FBIET-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/honey1530/BIET)

![React 19](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite 6](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase_PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Deployed-000000?style=flat-square&logo=vercel&logoColor=white)

---

</div>

## 📌 Executive Summary

**BIET Autonomous Academic OS** is a full-stack, AI-native University Operating System built for **Bhimavaram Institute of Engineering & Technology (UGC Autonomous, NAAC Grade 'A')**. 

Engineered under **BIET Autonomous Regulations (BR24 & R23/R20)**, it provides an end-to-end digital ecosystem connecting Students, Faculty, Department HODs, Exam Controllers, Placement Officers, and Parents through real-time attendance tracking, SGPA/CGPA percentage algorithms, instant WhatsApp/SMS parent notifications, and AI-powered Bloom's taxonomy examination paper generation.

> 🚀 **Live Cloud Production Link**: **[https://biet-flax.vercel.app/](https://biet-flax.vercel.app/)**

---

## 🌟 Key Application Portals

### 1. 🎓 Student Web App & Credit Auditor
- **Autonomous Attendance Regulations (BR24 & R23)**:
  - **75% & above**: Eligible for Semester End Exams (SEE) without fines.
  - **65% to 74.9%**: Condonation eligible on medical grounds.
  - **Below 65%**: Detained (Must repeat semester).
- **Daily Attendance Target Simulator**: Simulates expected missed classes (+1, +2, +5, +10) and calculates exact continuous classes needed to reach 75% or 85%+ targets.
- **SGPA, CGPA & Percentage Calculator**: Instant calculation conforming to BIET BR24 letter grade scales (`S=10`, `A=9`, `B=8`, `C=7`, `D=6`).
- **Master Class Timetable**: Interactive 7-period timeline with room numbers and subject codes.
- **JVD Scholarship & Fee Status Ledger**: Fee reimbursement tracking and digital receipts.
- **BIET Cortex AI Student Tutor**: AI academic advisor for syllabus doubts and credit auditing.

### 2. 👨‍🏫 Staff & Faculty Workstation
- **Period 1-7 Roll-Call & Instant Parent SMS Alerts**: Line-by-line student counting, biometric authorization stamp, and instant SMS alerts dispatched to parents of absentees.
- **Master Class Schedule & Timetable**: 7-period weekly schedule view with assigned rooms.
- **Syllabus & Unit Coverage Tracker**: Unit-by-unit syllabus progress bar (Units 1 to 5) with topic completion toggles.
- **Bloom's Taxonomy AI Mid Paper Studio**: Generates balanced Mid-1 and Mid-2 question papers mapped to NBA Course Outcomes (CO1-CO5) and Bloom's cognitive taxonomy.

### 3. 🏫 Executive Admin & Principal Cockpit
- **Real-Time Campus Analytics**: Department-wise attendance trends, JVD disbursement ledgers, and NAAC/NBA SSR accreditation metric reporting.
- **Student Grievance & Complaint Desk**: Anti-ragging, lab equipment, and bus route issue resolution portal.

### 4. 👨‍👩‍👦 Parent Monitoring Portal (తెలుగు / English)
- **Bilingual Parent Monitoring**: Full Telugu and English toggle support for parents.
- **Instant Attendance Push Alerts**: Live status of ward's 7-period daily attendance.
- **Direct HOD Mentor WhatsApp Integration**: One-click WhatsApp chat link with assigned department HOD.

---

## 🌐 Live Production Deployments

| Application Portal | Live Production URL | Primary Target Persona |
| :--- | :--- | :--- |
| **🌐 Main Portal Gateway** | **[biet-flax.vercel.app](https://biet-flax.vercel.app/)** | All Personas (Unified Portal) |
| **🎓 Student Portal** | **[biet-6jjr.vercel.app](https://biet-6jjr.vercel.app/)** | Students (Grades, Attendance, AI) |
| **👨‍🏫 Faculty Workstation** | **[biet-am5t.vercel.app](https://biet-am5t.vercel.app/)** | Faculty (Roll-Call, Syllabus, Paper Studio) |
| **👨‍👩‍👦 Parent Portal (తెలుగు)** | **[biet-qxv4.vercel.app](https://biet-qxv4.vercel.app/)** | Parents (Bilingual Notifications & Chat) |
| **🏫 Admin & Principal App** | **[biet-admin.vercel.app](https://biet-admin.vercel.app/)** | Principal & HODs (Campus Cockpit) |

---

## 🛠️ Technology Stack & Architecture

### **Frontend & User Interface**
- **Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript 5.8 (Strict Type Safety)
- **Styling & UI**: Tailwind CSS 4 (Executive White System), Lucide React Icons
- **Build Tooling**: Vite 6 (Ultra-fast HMR and bundle optimization)
- **Animations**: Motion 12 (Framer Motion)
- **Mobile Experience**: Progressive Web App (PWA) viewport responsive drawers & touch targets

### **Backend & APIs**
- **Runtime**: Node.js & Express.js (`server.ts`)
- **Execution**: TSX (TypeScript execute runner)
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`) + LocalStorage memory fallback engine

### **AI Engine**
- **AI Core**: Google Gemini 2.5 API (`@google/genai`) for Bloom's Question Paper Studio and Cortex AI Assistant.

---

## 🚀 Running Locally

### **Prerequisites**
- **Node.js** (v18 or higher installed from [nodejs.org](https://nodejs.org/))

### **Step 1: Clone Repository & Install Dependencies**
```bash
git clone https://github.com/honey1530/BIET.git
cd BIET
npm install
```

### **Step 2: Configure Environment Variables**
Copy `.env.example` to `.env.local` and add your API credentials:
```bash
cp .env.example .env.local
```
Inside `.env.local`:
```env
GEMINI_API_KEY=your_google_gemini_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 3: Launch Local Application**
Run the master development server:
```bash
npm run dev
```
Open your browser and navigate to: **`http://localhost:3000`**

#### **Standalone Sub-App Launchers**:
- Student App: `npm run dev:student` (Port 3001)
- Faculty App: `npm run dev:faculty` (Port 3002)
- Principal App: `npm run dev:principal` (Port 3003)
- Parent App: `npm run dev:parent` (Port 3006)

---

## 📁 Repository Monorepo Structure

```
BIET/
├── apps/
│   ├── student-app/       # Standalone Student Portal Web App
│   ├── faculty-app/       # Standalone Faculty Workstation Web App
│   ├── principal-app/     # Standalone Principal & Executive Admin App
│   └── parent-app/        # Standalone Parent Monitoring Web App (తెలుగు)
├── src/
│   ├── components/        # Shared Reusable UI Components
│   │   ├── attendance/    # Daily 7-Period Roll-Call & Timetable Tracker
│   │   ├── faculty/       # Faculty Hub, Syllabus & Paper Studio
│   │   ├── student/       # Student Portal, SGPA/CGPA & Target Calculator
│   │   ├── parent/        # Bilingual Parent Portal
│   │   └── gateway/       # Institutional Portal Gateway Launchpad
│   ├── data/              # BIET Autonomous Curriculum & Student Records Database
│   ├── lib/               # Supabase Client & Gemini AI Configuration
│   └── types/             # TypeScript Schemas & Interface Definitions
├── server.ts              # Express API Server & Proxy Router
├── vercel.json            # Vercel Monorepo Deployment & Rewrite Config
└── README.md              # Project Documentation
```

---

## 📜 Academic Regulations & Compliance
Conforms strictly to **BIET Autonomous Academic Regulations (BR24 & R23)**:
- **NAAC Grade 'A'** institutional accreditation criteria.
- **UGC Autonomous** credit & grading system.
- **NBA Outcome-Based Education (OBE)** Course Outcome (CO1–CO5) mapping.

---

<div align="center">

**Developed for Bhimavaram Institute of Engineering & Technology (BIET)**  
*Pennada, Bhimavaram, West Godavari District, Andhra Pradesh - 534243*  
Helpline: +91-630-128-8818 | Email: principal@bietbvrm.ac.in

</div>
