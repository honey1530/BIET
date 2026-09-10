import React, { useState, useEffect } from 'react';
import { getStudentProfileByHtno } from '../../../../src/data/db';
import { StudentProfile } from '../../../../src/types';
import { 
  User, GraduationCap, Award, Percent, CreditCard, CheckCircle2, ShieldCheck, 
  Calculator, Printer, Sparkles, FileText, Calendar, Building2, Plus, X, Trash2, ArrowRight 
} from 'lucide-react';

interface StudentSelfProfileViewProps {
  studentHtno: string;
  studentName?: string;
  department?: string;
  initialSubTab?: 'biodata' | 'marks' | 'calculator' | 'fee';
}

interface BR24SubjectRecord {
  sno: number;
  code: string;
  name: string;
  internals: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'AB';
  credits: number;
}

interface CustomCourseRow {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

export const StudentSelfProfileView: React.FC<StudentSelfProfileViewProps> = ({
  studentHtno,
  studentName,
  department,
  initialSubTab = 'biodata'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'biodata' | 'marks' | 'calculator' | 'fee'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  const resolvedStudent: StudentProfile = getStudentProfileByHtno(studentHtno);
  const student: StudentProfile = {
    ...resolvedStudent,
    name: studentName || resolvedStudent.name || 'KOLAGOTLA HARITHA',
    department: (department as any) || resolvedStudent.department || 'CSE'
  };

  // Official BIET BR24 UGC Guidelines Letter Grade Scale (Exact from Official College Document)
  const BR24_GRADE_SCALE: Record<string, { points: number; label: string; range: string }> = {
    'S': { points: 10, label: 'Outstanding', range: 'Greater than or equal to 90%' },
    'A': { points: 9, label: 'Excellent', range: '80% and Less than 90%' },
    'B': { points: 8, label: 'Very Good', range: '70% and Less than 80%' },
    'C': { points: 7, label: 'Good', range: '60% and Less than 70%' },
    'D': { points: 6, label: 'Fair', range: '50% and Less than 60%' },
    'E': { points: 5, label: 'Pass', range: '40% and Less than 50%' },
    'F': { points: 0, label: 'Fail / Backlog', range: 'Less than 40%' },
    'AB': { points: 0, label: 'Absent', range: 'Absent' }
  };

  // Multi-Semester Grade Sheet Database (BR24 Regulation)
  const [selectedSemSheet, setSelectedSemSheet] = useState<string>('2-2');

  const semesterSheetsData: Record<string, {
    examTitle: string;
    examDate: string;
    sgpa: number;
    cgpa: number;
    result: string;
    printedDate: string;
    subjects: BR24SubjectRecord[];
  }> = {
    '2-2': {
      examTitle: 'II B TECH II SEM (BR24) REGULAR EXAMINATIONS APRIL/MAY 2026',
      examDate: 'APRIL/MAY 2026',
      sgpa: 8.10,
      cgpa: 7.69,
      result: 'PASS',
      printedDate: '18-06-2026 10:51 AM',
      subjects: [
        { sno: 1, code: '24BS4T01', name: 'Probability & Statistics', internals: 26, grade: 'B', credits: 3 },
        { sno: 2, code: '24CS4P01', name: 'Operating Systems Lab', internals: 28, grade: 'S', credits: 1.5 },
        { sno: 3, code: '24CS4P02', name: 'Advanced Data Structures and Algorithm Analysis Lab', internals: 27, grade: 'S', credits: 1.5 },
        { sno: 4, code: '24CS4P03', name: 'Full Stack Development –I', internals: 20, grade: 'A', credits: 2 },
        { sno: 5, code: '24CS4T01', name: 'Operating Systems', internals: 22, grade: 'D', credits: 3 },
        { sno: 6, code: '24CS4T02', name: 'Advanced Data Structures & Algorithm Analysis', internals: 28, grade: 'B', credits: 3 },
        { sno: 7, code: '24CS4T03', name: 'Software Engineering', internals: 25, grade: 'B', credits: 3 },
        { sno: 8, code: '24MB4T01', name: 'Managerial Economics and Financial Analysis', internals: 23, grade: 'D', credits: 2 },
        { sno: 9, code: '24ME4P01', name: 'Design Thinking & Innovation', internals: 28, grade: 'S', credits: 2 },
      ]
    },
    '2-1': {
      examTitle: 'II B TECH I SEM (BR24) REGULAR EXAMINATIONS NOV/DEC 2025',
      examDate: 'NOV/DEC 2025',
      sgpa: 8.60,
      cgpa: 7.55,
      result: 'PASS',
      printedDate: '10-01-2026 02:15 PM',
      subjects: [
        { sno: 1, code: '24BS3T01', name: 'Discrete Mathematics & Graph Theory', internals: 27, grade: 'A', credits: 3 },
        { sno: 2, code: '24CS3T01', name: 'Object Oriented Programming through Java', internals: 29, grade: 'S', credits: 3 },
        { sno: 3, code: '24CS3T02', name: 'Database Management Systems', internals: 26, grade: 'A', credits: 3 },
        { sno: 4, code: '24CS3T03', name: 'Digital Logic & Computer Organization', internals: 25, grade: 'B', credits: 3 },
        { sno: 5, code: '24CS3P01', name: 'Java Programming Lab', internals: 28, grade: 'S', credits: 1.5 },
        { sno: 6, code: '24CS3P02', name: 'Database Management Systems Lab', internals: 29, grade: 'S', credits: 1.5 },
        { sno: 7, code: '24CS3P03', name: 'Python Programming Skill Course', internals: 27, grade: 'A', credits: 2 },
      ]
    },
    '1-2': {
      examTitle: 'I B TECH II SEM (BR24) REGULAR EXAMINATIONS MAY/JUNE 2025',
      examDate: 'MAY/JUNE 2025',
      sgpa: 8.30,
      cgpa: 7.20,
      result: 'PASS',
      printedDate: '25-07-2025 11:30 AM',
      subjects: [
        { sno: 1, code: '24BS2T01', name: 'Differential Equations & Vector Calculus', internals: 25, grade: 'B', credits: 3 },
        { sno: 2, code: '24BS2T02', name: 'Applied Chemistry', internals: 28, grade: 'A', credits: 3 },
        { sno: 3, code: '24CS2T01', name: 'Data Structures using C', internals: 29, grade: 'S', credits: 3 },
        { sno: 4, code: '24EE2T01', name: 'Basic Electrical & Electronics Engineering', internals: 24, grade: 'B', credits: 3 },
        { sno: 5, code: '24CS2P01', name: 'Data Structures Lab', internals: 28, grade: 'S', credits: 1.5 },
        { sno: 6, code: '24BS2P01', name: 'Applied Chemistry Lab', internals: 27, grade: 'S', credits: 1.5 },
      ]
    },
    '1-1': {
      examTitle: 'I B TECH I SEM (BR24) REGULAR EXAMINATIONS DEC 2024/JAN 2025',
      examDate: 'DEC 2024/JAN 2025',
      sgpa: 8.10,
      cgpa: 8.10,
      result: 'PASS',
      printedDate: '15-02-2025 04:20 PM',
      subjects: [
        { sno: 1, code: '24BS1T01', name: 'Linear Algebra & Calculus', internals: 26, grade: 'B', credits: 3 },
        { sno: 2, code: '24BS1T02', name: 'Engineering Physics', internals: 27, grade: 'A', credits: 3 },
        { sno: 3, code: '24CS1T01', name: 'Communicative English', internals: 28, grade: 'A', credits: 3 },
        { sno: 4, code: '24CS1T02', name: 'Basic Civil & Mechanical Engineering', internals: 25, grade: 'B', credits: 3 },
        { sno: 5, code: '24BS1P01', name: 'Engineering Physics Lab', internals: 29, grade: 'S', credits: 1.5 },
        { sno: 6, code: '24CS1P01', name: 'Computer Programming Lab', internals: 28, grade: 'S', credits: 1.5 },
      ]
    }
  };

  const currentSheet = semesterSheetsData[selectedSemSheet] || semesterSheetsData['2-2'];

  // Dynamic CGPA Calculator Courses State (Exact layout matching the uploaded image!)
  const [coursesList, setCoursesList] = useState<CustomCourseRow[]>([
    { id: '1', name: 'Digital Electronics', gradePoint: 8, credits: 3 },
    { id: '2', name: 'MPMC', gradePoint: 9, credits: 3 },
    { id: '3', name: 'DV Lab', gradePoint: 10, credits: 3 },
    { id: '4', name: 'Full Stack Development', gradePoint: 9, credits: 2 },
  ]);

  const [previousCgpa, setPreviousCgpa] = useState<string>('7.69');
  const [previousCredits, setPreviousCredits] = useState<string>('60');

  // Add Dynamic New Course Row
  const handleAddCourse = () => {
    const newRow: CustomCourseRow = {
      id: Date.now().toString(),
      name: `Course ${coursesList.length + 1}`,
      gradePoint: 8,
      credits: 3
    };
    setCoursesList([...coursesList, newRow]);
  };

  // Remove Course Row
  const handleRemoveCourse = (id: string) => {
    if (coursesList.length <= 1) return;
    setCoursesList(coursesList.filter(c => c.id !== id));
  };

  // Update Course Name / Grade / Credits
  const handleCourseChange = (id: string, field: keyof CustomCourseRow, value: any) => {
    setCoursesList(coursesList.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Compute SGPA & Combined CGPA
  const currentSemCredits = coursesList.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  const currentSemWeightedPts = coursesList.reduce((sum, c) => sum + ((Number(c.gradePoint) || 0) * (Number(c.credits) || 0)), 0);
  const currentSemSgpa = currentSemCredits > 0 ? (currentSemWeightedPts / currentSemCredits) : 0;

  const prevCgpaNum = parseFloat(previousCgpa) || 0;
  const prevCredsNum = parseFloat(previousCredits) || 0;

  const totalCombinedCredits = prevCredsNum + currentSemCredits;
  const totalCombinedPoints = (prevCgpaNum * prevCredsNum) + currentSemWeightedPts;
  const combinedCgpa = totalCombinedCredits > 0 ? (totalCombinedPoints / totalCombinedCredits) : currentSemSgpa;
  const equivalentPct = Math.max(0, (combinedCgpa - 0.75) * 10);

  const handlePrintGradeSheet = () => {
    window.print();
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(timer);
  }, [studentHtno, activeTab, selectedSemSheet]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 h-40 flex items-center space-x-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200/80 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn selection:bg-indigo-600 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. STUDENT BIO-DATA TAB (STRICTLY ONLY STUDENT BIO-DATA & PERSONAL INFO) */}
      {/* ========================================================================= */}
      {activeTab === 'biodata' && (
        <div className="space-y-6">
          {/* Upper Hero Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden text-slate-900">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start md:items-center space-x-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-indigo-600 text-white font-black text-2xl md:text-3xl flex items-center justify-center shadow-xs">
                  {student.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wider">
                      UGC AUTONOMOUS • BIET BR24 REGULATION
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED SIS PROFILE
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">{student.name}</h2>
                  <p className="text-xs text-indigo-700 font-mono font-bold">
                    Hallticket No: {student.htno || '24AP1A0558'} • {student.department} Branch (Batch 2024-2028)
                  </p>
                  <p className="text-xs text-slate-600 pt-1 font-medium">
                    Personal bio-data, guardian contact details, and institutional student profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio-Data Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Course &amp; Degree</span>
              <span className="text-xl font-bold text-slate-900 block mt-1">B.TECH (BR24)</span>
              <span className="text-xs text-indigo-700 font-semibold mt-1 block">Batch 2024 - 2028</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Current Year &amp; Section</span>
              <span className="text-xl font-bold text-slate-900 block mt-1">II B.Tech II Sem</span>
              <span className="text-xs text-emerald-700 font-semibold mt-1 block">2-CSE-A Section</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Scholarship Status</span>
              <span className="text-lg font-bold text-emerald-700 block mt-1">{student.jvdStatus}</span>
              <span className="text-xs text-slate-500 font-semibold mt-1 block">AP JVD Beneficiary</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Institutional Status</span>
              <span className="text-lg font-bold text-indigo-700 block mt-1">UGC Autonomous</span>
              <span className="text-xs text-emerald-700 font-bold mt-1 block">Active Student</span>
            </div>
          </div>

          {/* Full Personal Bio-Data Record Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif border-b border-slate-200 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              <span>Personal Bio-Data &amp; Guardian Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Full Student Name</span>
                <span className="font-bold text-slate-900 text-sm block">{student.name}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Hallticket Number</span>
                <span className="font-bold text-indigo-700 font-mono text-sm block">{student.htno || '24AP1A0558'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Father / Guardian Name</span>
                <span className="font-bold text-slate-900 text-sm block">{student.fatherName || 'KOLAGOTLA VENKATESWARA REDDY'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Degree &amp; Regulation</span>
                <span className="font-bold text-slate-900 text-sm block">B.TECH (BR24 Autonomous)</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Department &amp; Branch</span>
                <span className="font-bold text-slate-900 text-sm block">COMPUTER SCIENCE AND ENGINEERING (CSE)</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Student Mobile Number</span>
                <span className="font-bold text-slate-900 font-mono text-sm block">{student.phone}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Guardian Phone Number</span>
                <span className="font-bold text-indigo-700 font-mono text-sm block">{student.parentPhone}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Official Email Address</span>
                <span className="font-bold text-slate-900 text-sm block">{student.email}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">College Name &amp; Code</span>
                <span className="font-bold text-indigo-700 text-sm block">BHIMAVARAM INSTITUTE OF ENGG &amp; TECH (BIET)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* 2. ACADEMIC MARKS & GRADES TAB (STRICTLY ONLY ACADEMIC MARKS & OFFICIAL ALL-SEMESTERS SHEETS) */}
      {/* ========================================================================================= */}
      {activeTab === 'marks' && (
        <div className="space-y-6">
          {/* Semester Grade Sheet Selector Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs print:hidden">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Academic Marks &amp; Official Semester Grade Sheets</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select semester to view official provisional grade sheets across all semesters (BR24 Regulation)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700">Select Semester:</span>
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {['1-1', '1-2', '2-1', '2-2'].map(sem => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemSheet(sem)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSemSheet === sem
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Sem {sem} Sheet
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end print:hidden">
            <button
              onClick={handlePrintGradeSheet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Semester {selectedSemSheet} Grade Sheet</span>
            </button>
          </div>

          {/* OFFICIAL PROVISIONAL RESULTS GRADE SHEET (EXACT 1:1 REPLICA OF THE COLLEGE IMAGE) */}
          <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-10 text-slate-900 font-serif max-w-4xl mx-auto shadow-md space-y-6">
            
            {/* College Header Section */}
            <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
              <img 
                src="/biet_logo.png" 
                alt="BIET Logo" 
                className="w-20 h-20 object-contain drop-shadow-xs" 
              />

              <div className="text-center space-y-0.5 flex-1 px-4">
                <h1 className="text-2xl font-black text-rose-800 tracking-tight leading-tight">
                  BHIMAVARAM INSTITUTE OF ENGINEERING &amp; TECHNOLOGY
                </h1>
                <p className="text-sm font-black text-indigo-900 tracking-widest uppercase">AUTONOMOUS</p>
                <p className="text-[10px] text-slate-700 font-sans font-semibold">
                  Approved by AICTE, New Delhi &amp; Permanently Affiliated to JNTUK, Kakinada<br />
                  Accredited with "A" Grade by NAAC &amp; ISO 9001:2015 Certified Institution
                </p>
                <p className="text-[9px] text-slate-600 font-sans font-medium">
                  Swamy Gnanananda Ashramam Road, PENNADA, BHIMAVARAM – 534 243, W.G.Dt. (A.P.)<br />
                  Ph: +91-9948639666 • Email: principal@bietbvrm.ac.in • Website: https://bietbvrm.ac.in
                </p>
              </div>

              {/* NAAC Grade A Logo Badge */}
              <div className="w-20 h-20 border-2 border-amber-500 rounded-full flex flex-col items-center justify-center bg-amber-50 text-center p-1 font-sans">
                <span className="text-[10px] font-bold text-slate-900">ACCREDITED WITH</span>
                <span className="text-xl font-black text-rose-700 leading-none">A</span>
                <span className="text-[9px] font-bold text-amber-800">NAAC</span>
              </div>
            </div>

            {/* Document Title Header */}
            <div className="text-center">
              <h2 className="text-sm font-bold text-rose-900 underline uppercase tracking-wide">
                PROVISIONAL RESULTS OF :- {currentSheet.examTitle}
              </h2>
            </div>

            {/* Student Metadata Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs font-sans border-b border-slate-300 pb-4">
              <div className="flex">
                <span className="font-bold w-32">Hallticket No</span>
                <span>: <strong>{student.htno || '24AP1A0558'}</strong></span>
              </div>
              <div className="flex">
                <span className="font-bold w-32">Student Name</span>
                <span>: <strong>{student.name || 'KOLAGOTLA HARITHA'}</strong></span>
              </div>
              <div className="flex">
                <span className="font-bold w-32">Father Name</span>
                <span>: <strong>{student.fatherName || 'KOLAGOTLA VENKATESWARA REDDY'}</strong></span>
              </div>
              <div className="flex">
                <span className="font-bold w-32">Degree</span>
                <span>: <strong>B.TECH</strong></span>
              </div>
              <div className="flex">
                <span className="font-bold w-32">Batch</span>
                <span>: <strong>2024-2028</strong></span>
              </div>
              <div className="flex">
                <span className="font-bold w-32">Branch</span>
                <span>: <strong>COMPUTER SCIENCE AND ENGINEERING (CSE)</strong></span>
              </div>
              <div className="flex sm:col-span-2">
                <span className="font-bold w-32">Exam</span>
                <span>: <strong>{currentSheet.examTitle}</strong></span>
              </div>
              <div className="flex sm:col-span-2">
                <span className="font-bold w-32">Result</span>
                <span>: <strong className="text-emerald-700">{currentSheet.result}</strong></span>
              </div>
            </div>

            {/* Subject Marks & Grades Table (Exact Replica of Document) */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-slate-400 text-center font-sans">
                <thead className="bg-blue-100 text-slate-900 font-bold border-b border-slate-400">
                  <tr>
                    <th className="border border-slate-400 py-2 px-2 w-12">S.No</th>
                    <th className="border border-slate-400 py-2 px-3">Subject Code</th>
                    <th className="border border-slate-400 py-2 px-4 text-left">Subject Name</th>
                    <th className="border border-slate-400 py-2 px-2">Internals</th>
                    <th className="border border-slate-400 py-2 px-2">Grade</th>
                    <th className="border border-slate-400 py-2 px-2">Credits</th>
                    <th className="border border-slate-400 py-2 px-2">SGPA</th>
                    <th className="border border-slate-400 py-2 px-2">CGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {currentSheet.subjects.map((s, idx) => (
                    <tr key={s.sno} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="border border-slate-400 py-2 px-2 font-semibold">{s.sno}</td>
                      <td className="border border-slate-400 py-2 px-3 font-mono font-bold">{s.code}</td>
                      <td className="border border-slate-400 py-2 px-4 text-left font-medium">{s.name}</td>
                      <td className="border border-slate-400 py-2 px-2 font-bold">{s.internals}</td>
                      <td className="border border-slate-400 py-2 px-2 font-black text-indigo-700">{s.grade}</td>
                      <td className="border border-slate-400 py-2 px-2 font-bold">{s.credits}</td>
                      {idx === 0 && (
                        <>
                          <td rowSpan={currentSheet.subjects.length} className="border border-slate-400 py-2 px-3 font-black text-slate-900 text-sm align-middle bg-blue-50/50">
                            {currentSheet.sgpa.toFixed(2)}
                          </td>
                          <td rowSpan={currentSheet.subjects.length} className="border border-slate-400 py-2 px-3 font-black text-slate-900 text-sm align-middle bg-blue-50/50">
                            {currentSheet.cgpa.toFixed(2)}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Official SGPA Formula Box (Exact Replica of Document) */}
            <div className="border border-slate-400 rounded-lg p-4 max-w-sm mx-auto text-center bg-slate-50 font-sans shadow-xs">
              <div className="text-base font-serif font-bold text-slate-900 flex items-center justify-center gap-2">
                <span>SGPA =</span>
                <div className="flex flex-col items-center">
                  <span className="border-b border-slate-900 px-3">∑<sub>1</sub><sup>n</sup> C<sub>i</sub> × (GP)<sub>i</sub></span>
                  <span>∑<sub>1</sub><sup>n</sup> C<sub>i</sub></span>
                </div>
              </div>
            </div>

            {/* Official UGC Letter Grade Scale Table */}
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-[11px] border-collapse border border-slate-400 text-center">
                <thead className="bg-emerald-100 text-slate-900 font-bold">
                  <tr>
                    <th className="border border-slate-400 py-1.5 px-3 text-left">% of marks secured in a Subject/Course (Class intervals)</th>
                    <th className="border border-slate-400 py-1.5 px-3">Letter Grade (UGC Guide Lines)</th>
                    <th className="border border-slate-400 py-1.5 px-3">Grade Points (G)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {Object.entries(BR24_GRADE_SCALE).map(([gradeKey, scaleInfo]) => (
                    <tr key={gradeKey}>
                      <td className="border border-slate-400 py-1 px-3 text-left font-medium">{scaleInfo.range}</td>
                      <td className="border border-slate-400 py-1 px-3 font-black text-indigo-700">{gradeKey}</td>
                      <td className="border border-slate-400 py-1 px-3 font-bold">{scaleInfo.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Document Disclaimer & Print Footer */}
            <div className="text-[11px] font-sans space-y-1 border-t border-slate-300 pt-3 text-slate-800">
              <p><strong>Note:</strong> GPA is calculated based on the above result.</p>
              <p><strong>Disclaimer:</strong> The result is provisional and published as an immediate reference to the candidate. The final Grade sheet issued by the institution should only be treated authentic and final.</p>
              <div className="pt-2 flex justify-between font-bold text-[10px] text-slate-600">
                <span>Printed date: {currentSheet.printedDate}</span>
                <span>BHIMAVARAM INSTITUTE OF ENGINEERING &amp; TECHNOLOGY (AUTONOMOUS)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* 3. SGPA & CGPA CALCULATOR TAB (MATCHING YOUR UPLOADED IMAGE LAYOUT 100% PRECISELY) */}
      {/* ========================================================================================= */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Header: Title + Blue "+ Add Course" Button (Matches Uploaded Image) */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-blue-600 font-sans tracking-tight">
                Your Courses
              </h3>

              <button
                onClick={handleAddCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Sub-Header Labels (Matches Uploaded Image) */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-xs text-slate-500 font-medium px-2">
              <div className="col-span-5">Course Name</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-3">Credits</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* Dynamic Course Rows List (Matches Uploaded Image Layout) */}
            <div className="space-y-3">
              {coursesList.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center shadow-2xs hover:border-blue-300 transition-colors"
                >
                  {/* Course Name Input */}
                  <div className="sm:col-span-5 space-y-1">
                    <label className="sm:hidden text-[11px] font-bold text-slate-500 block">Course Name</label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                      placeholder="Course Name (e.g. Digital Electronics)"
                      className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Grade Dropdown */}
                  <div className="sm:col-span-3 space-y-1">
                    <label className="sm:hidden text-[11px] font-bold text-slate-500 block">Grade</label>
                    <select
                      value={course.gradePoint}
                      onChange={(e) => handleCourseChange(course.id, 'gradePoint', Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value={10}>S (10 Points - Outstanding)</option>
                      <option value={9}>A (9 Points - Excellent)</option>
                      <option value={8}>B (8 Points - Very Good)</option>
                      <option value={7}>C (7 Points - Good)</option>
                      <option value={6}>D (6 Points - Fair)</option>
                      <option value={5}>E (5 Points - Pass)</option>
                      <option value={0}>F (0 Points - Fail)</option>
                      <option value={1}>1 (Grade Point 1)</option>
                      <option value={2}>2 (Grade Point 2)</option>
                      <option value={3}>3 (Grade Point 3)</option>
                      <option value={4}>4 (Grade Point 4)</option>
                    </select>
                  </div>

                  {/* Credits Input */}
                  <div className="sm:col-span-3 space-y-1">
                    <label className="sm:hidden text-[11px] font-bold text-slate-500 block">Credits</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="10"
                      value={course.credits}
                      onChange={(e) => handleCourseChange(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      placeholder="Credits"
                      className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Red Circular Remove Button (Matches Uploaded Image 100%) */}
                  <div className="sm:col-span-1 flex justify-end sm:justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
                      title="Remove Course"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Previous CGPA & Credits Input Box (Matches Uploaded Image) */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">Previous CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={previousCgpa}
                  onChange={(e) => setPreviousCgpa(e.target.value)}
                  placeholder="Enter prev CGPA (e.g. 7.69)"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">Previous Total Credits</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="200"
                  value={previousCredits}
                  onChange={(e) => setPreviousCredits(e.target.value)}
                  placeholder="Enter previous total credits (e.g. 60)"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Output Calculation Results Card */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-md mt-6">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Current Semester SGPA</span>
                <div className="text-3xl font-black text-white">{currentSemSgpa.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 10</span></div>
                <span className="text-[11px] text-slate-300 font-medium">Credits: {currentSemCredits}</span>
              </div>

              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Updated Combined CGPA</span>
                <div className="text-3xl font-black text-emerald-400">{combinedCgpa.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 10</span></div>
                <span className="text-[11px] text-slate-300 font-medium">Total Credits: {totalCombinedCredits}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Equivalent Percentage</span>
                <div className="text-3xl font-black text-purple-300">{equivalentPct.toFixed(2)}%</div>
                <span className="text-[11px] text-slate-400 font-medium">Formula: (CGPA - 0.75) × 10</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* 4. FEE & JVD LEDGER TAB (STRICTLY ONLY FEE & JVD SCHOLARSHIP DETAILS) */}
      {/* ======================================================================= */}
      {activeTab === 'fee' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Personal Fee Ledger &amp; AP JVD Scholarship Disbursement Status</span>
            </h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Zero Balance Due
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <span className="text-slate-500 font-semibold block">Total Tuition Fee (Annual)</span>
              <span className="text-xl font-bold text-slate-900">₹{student.totalFee.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <span className="text-slate-500 font-semibold block">AP JVD Disbursed Amount</span>
              <span className="text-xl font-bold text-emerald-700">₹{student.totalFee.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <span className="text-slate-500 font-semibold block">Outstanding Balance</span>
              <span className="text-xl font-bold text-emerald-700">₹{student.dueFee}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
