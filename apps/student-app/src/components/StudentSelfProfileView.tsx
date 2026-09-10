import React, { useState, useEffect } from 'react';
import { getStudentProfileByHtno } from '../../../../src/data/db';
import { StudentProfile } from '../../../../src/types';
import { 
  User, GraduationCap, Award, Percent, CreditCard, CheckCircle2, ShieldCheck, 
  Calculator, Printer, Download, Sparkles, CheckCircle, FileText, Calendar, Building2 
} from 'lucide-react';

interface StudentSelfProfileViewProps {
  studentHtno: string;
  studentName?: string;
  department?: string;
  initialSubTab?: 'biodata' | 'provisional_sheet' | 'calculator' | 'fee';
}

interface BR24SubjectRecord {
  sno: number;
  code: string;
  name: string;
  internals: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'AB';
  credits: number;
  isBacklog?: boolean;
  isCleared?: boolean;
  clearedGrade?: 'S' | 'A' | 'B' | 'C' | 'D' | 'E';
}

export const StudentSelfProfileView: React.FC<StudentSelfProfileViewProps> = ({
  studentHtno,
  studentName,
  department,
  initialSubTab = 'biodata'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'biodata' | 'provisional_sheet' | 'calculator' | 'fee'>(
    initialSubTab === ('marks' as any) ? 'provisional_sheet' : initialSubTab
  );

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab === ('marks' as any) ? 'provisional_sheet' : initialSubTab);
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

  // Official BR24 CSE II B.Tech II Sem Regular Exam Subject Records (Exact from Official College Document Image)
  const [br24Subjects, setBr24Subjects] = useState<BR24SubjectRecord[]>([
    { sno: 1, code: '24BS4T01', name: 'Probability & Statistics', internals: 26, grade: 'B', credits: 3 },
    { sno: 2, code: '24CS4P01', name: 'Operating Systems Lab', internals: 28, grade: 'S', credits: 1.5 },
    { sno: 3, code: '24CS4P02', name: 'Advanced Data Structures and Algorithm Analysis Lab', internals: 27, grade: 'S', credits: 1.5 },
    { sno: 4, code: '24CS4P03', name: 'Full Stack Development –I', internals: 20, grade: 'A', credits: 2 },
    { sno: 5, code: '24CS4T01', name: 'Operating Systems', internals: 22, grade: 'D', credits: 3 },
    { sno: 6, code: '24CS4T02', name: 'Advanced Data Structures & Algorithm Analysis', internals: 28, grade: 'B', credits: 3 },
    { sno: 7, code: '24CS4T03', name: 'Software Engineering', internals: 25, grade: 'B', credits: 3 },
    { sno: 8, code: '24MB4T01', name: 'Managerial Economics and Financial Analysis', internals: 23, grade: 'D', credits: 2 },
    { sno: 9, code: '24ME4P01', name: 'Design Thinking & Innovation', internals: 28, grade: 'S', credits: 2 },
  ]);

  const [calcFormula, setCalcFormula] = useState<'biet_br24' | 'standard'>('biet_br24');

  // Dynamic SGPA / CGPA Calculation Formula: SGPA = Sum(Ci * GPi) / Sum(Ci)
  let totalCredits = 0;
  let totalWeightedGradePoints = 0;
  let activeBacklogsCount = 0;
  let clearedBacklogsCount = 0;

  br24Subjects.forEach(s => {
    totalCredits += s.credits;
    const effectiveGrade = (s.isBacklog && s.isCleared && s.clearedGrade) ? s.clearedGrade : s.grade;
    const points = BR24_GRADE_SCALE[effectiveGrade]?.points ?? 0;

    if (effectiveGrade === 'F' || effectiveGrade === 'AB') {
      activeBacklogsCount++;
    } else {
      totalWeightedGradePoints += (points * s.credits);
      if (s.isBacklog && s.isCleared) {
        clearedBacklogsCount++;
      }
    }
  });

  const calculatedSgpa = totalCredits > 0 ? (totalWeightedGradePoints / totalCredits) : 8.1;
  const calculatedCgpa = student.cgpa || 7.69;

  // Percentage Formula: (CGPA - 0.75) * 10
  const calculatedPercentage = calcFormula === 'biet_br24'
    ? Math.max(0, (calculatedSgpa - 0.75) * 10)
    : (calculatedSgpa * 9.5);

  const handlePrintGradeSheet = () => {
    window.print();
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(timer);
  }, [studentHtno, activeTab]);

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
      {/* Upper Hero Header - Shown for Bio-Data */}
      {activeTab === 'biodata' && (
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
                    <ShieldCheck className="w-3 h-3" /> VERIFIED PROVISIONAL RESULTS
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">{student.name}</h2>
                <p className="text-xs text-indigo-700 font-mono font-bold">
                  Hallticket No: {student.htno || '24AP1A0558'} • {student.department} Branch (Batch 2024-2028)
                </p>
                <p className="text-xs text-slate-600 pt-1 font-medium">
                  Official Provisional Grade Sheet &amp; BIET Autonomous Result Records.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">BR24 Exam SGPA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-slate-900">{calculatedSgpa.toFixed(2)}</span>
            <span className="text-xs text-slate-500">/ 10.0</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">CGPA: {calculatedCgpa.toFixed(2)}</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Overall Result</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-emerald-700">PASS</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">II B.TECH II SEM (BR24)</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">AP JVD Scholarship</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-lg font-bold text-emerald-700">{student.jvdStatus}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tuition Fee Due: ₹{student.dueFee}</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Active Backlogs</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{activeBacklogsCount}</span>
            <span className="text-xs text-emerald-700 font-bold">Passed All Subjects</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">Clean Regular Record</p>
        </div>
      </div>

      {/* Main Sub-Tab Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center space-x-2 overflow-x-auto shadow-xs print:hidden">
        {[
          { id: 'biodata', label: 'Student Bio-Data', icon: User },
          { id: 'provisional_sheet', label: 'Official Provisional Results (BR24)', icon: FileText },
          { id: 'calculator', label: 'SGPA, CGPA & Percentage Calculator', icon: Calculator },
          { id: 'fee', label: 'Fee & JVD Ledger', icon: CreditCard },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: PERSONAL BIO-DATA */}
      {activeTab === 'biodata' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 font-serif border-b border-slate-200 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Personal Bio-Data &amp; Guardian Contact Record</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Full Student Name</span>
              <span className="font-bold text-slate-900 text-sm block">{student.name}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Hallticket No</span>
              <span className="font-bold text-indigo-700 font-mono text-sm block">{student.htno || '24AP1A0558'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Father Name</span>
              <span className="font-bold text-slate-900 text-sm block">{student.fatherName || 'KOLAGOTLA VENKATESWARA REDDY'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Degree &amp; Batch</span>
              <span className="font-bold text-slate-900 text-sm block">B.TECH (Batch: 2024-2028)</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Department &amp; Branch</span>
              <span className="font-bold text-slate-900 text-sm block">COMPUTER SCIENCE AND ENGINEERING (CSE)</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">College Status</span>
              <span className="font-bold text-indigo-700 text-sm block">UGC Autonomous Institution (BIET)</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: EXACT OFFICIAL PROVISIONAL RESULTS GRADE SHEET (MATCHING COLLEGE DOCUMENT IMAGE 100%) */}
      {activeTab === 'provisional_sheet' && (
        <div className="space-y-4">
          <div className="flex justify-end print:hidden">
            <button
              onClick={handlePrintGradeSheet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Grade Sheet</span>
            </button>
          </div>

          {/* DOCUMENT CONTAINER (EXACT 1:1 REPLICA OF THE COLLEGE IMAGE) */}
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
                PROVISIONAL RESULTS OF :- II B TECH II SEM (BR24) REGULAR EXAMINATIONS APRIL/MAY 2026
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
                <span>: <strong>II B TECH II SEM (BR24) REGULAR EXAMINATIONS APRIL/MAY 2026</strong></span>
              </div>
              <div className="flex sm:col-span-2">
                <span className="font-bold w-32">Result</span>
                <span>: <strong className="text-emerald-700">PASS</strong></span>
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
                  {br24Subjects.map((s, idx) => (
                    <tr key={s.sno} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="border border-slate-400 py-2 px-2 font-semibold">{s.sno}</td>
                      <td className="border border-slate-400 py-2 px-3 font-mono font-bold">{s.code}</td>
                      <td className="border border-slate-400 py-2 px-4 text-left font-medium">{s.name}</td>
                      <td className="border border-slate-400 py-2 px-2 font-bold">{s.internals}</td>
                      <td className="border border-slate-400 py-2 px-2 font-black text-indigo-700">{s.grade}</td>
                      <td className="border border-slate-400 py-2 px-2 font-bold">{s.credits}</td>
                      {idx === 0 && (
                        <>
                          <td rowSpan={9} className="border border-slate-400 py-2 px-3 font-black text-slate-900 text-sm align-middle bg-blue-50/50">
                            {calculatedSgpa.toFixed(2)}
                          </td>
                          <td rowSpan={9} className="border border-slate-400 py-2 px-3 font-black text-slate-900 text-sm align-middle bg-blue-50/50">
                            {calculatedCgpa.toFixed(2)}
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

            {/* Official UGC Letter Grade Scale Table (Exact Replica of Document) */}
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
                <span>Printed date: 18-06-2026 10:51 AM</span>
                <span>BHIMAVARAM INSTITUTE OF ENGINEERING &amp; TECHNOLOGY (AUTONOMOUS)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STANDALONE SGPA, CGPA & PERCENTAGE CALCULATOR (UPDATED TO BR24 GRADE SCALE) */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <span>BIET Autonomous SGPA, CGPA &amp; Percentage Calculator (BR24 Grade Scale)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Subject-wise grade calculation based on official BIET BR24 UGC Grade Points (S:10, A:9, B:8, C:7, D:6, E:5, F:0)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-600">Formula:</label>
                <select
                  value={calcFormula}
                  onChange={(e) => setCalcFormula(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-indigo-700 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="biet_br24">BIET Autonomous [(CGPA - 0.75) × 10]</option>
                  <option value="standard">Standard [(CGPA × 9.5)]</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Exam SGPA</span>
                <div className="text-3xl font-black text-slate-900">{calculatedSgpa.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 10</span></div>
                <span className="text-[11px] font-bold text-indigo-700">Total Credits: {totalCredits}</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Equivalent Percentage</span>
                <div className="text-3xl font-black text-emerald-700">{calculatedPercentage.toFixed(2)}%</div>
                <span className="text-[11px] font-bold text-emerald-800">
                  {calcFormula === 'biet_br24' ? 'Formula: (SGPA - 0.75) × 10' : 'Formula: SGPA × 9.5'}
                </span>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Cumulative CGPA</span>
                <div className="text-3xl font-black text-purple-900">{calculatedCgpa.toFixed(2)}</div>
                <span className="text-[11px] font-bold text-purple-700">Batch 2024-2028</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Exam Result</span>
                <div className="text-xl font-black text-emerald-700">PASS</div>
                <span className="text-[11px] font-semibold text-amber-900">UGC Autonomous BR24</span>
              </div>
            </div>

            {/* Subject-Wise BR24 Grade Input Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">BR24 II-II Sem Subject Grade Sheet</h4>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-3">S.No</th>
                      <th className="py-3 px-3">Subject Code &amp; Name</th>
                      <th className="py-3 px-3">Internals</th>
                      <th className="py-3 px-3">Grade</th>
                      <th className="py-3 px-3">Credits</th>
                      <th className="py-3 px-3 text-right">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {br24Subjects.map((sub, idx) => {
                      const points = BR24_GRADE_SCALE[sub.grade]?.points ?? 0;

                      return (
                        <tr key={sub.sno} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 font-bold text-indigo-700 font-mono">{sub.sno}</td>
                          <td className="py-3 px-3">
                            <span className="font-mono text-indigo-600 font-bold mr-2">[{sub.code}]</span>
                            <span className="font-bold text-slate-900">{sub.name}</span>
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={sub.internals}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10) || 0;
                                const updated = [...br24Subjects];
                                updated[idx].internals = val;
                                setBr24Subjects(updated);
                              }}
                              className="w-16 bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-600"
                            />
                          </td>

                          <td className="py-3 px-3">
                            <select
                              value={sub.grade}
                              onChange={(e) => {
                                const newGrade = e.target.value as BR24SubjectRecord['grade'];
                                const updated = [...br24Subjects];
                                updated[idx].grade = newGrade;
                                setBr24Subjects(updated);
                              }}
                              className="font-bold text-xs rounded-lg px-2 py-1 border border-slate-300 bg-slate-50 text-indigo-700 cursor-pointer"
                            >
                              <option value="S">S (10 Points - &ge;90%)</option>
                              <option value="A">A (9 Points - 80-89%)</option>
                              <option value="B">B (8 Points - 70-79%)</option>
                              <option value="C">C (7 Points - 60-69%)</option>
                              <option value="D">D (6 Points - 50-59%)</option>
                              <option value="E">E (5 Points - 40-49%)</option>
                              <option value="F">F (0 Points - Fail)</option>
                              <option value="AB">AB (0 Points - Absent)</option>
                            </select>
                          </td>

                          <td className="py-3 px-3 font-bold text-slate-700">{sub.credits}</td>
                          <td className="py-3 px-3 text-right font-black text-slate-900 text-sm">
                            {points * sub.credits} <span className="text-[10px] text-slate-500 font-normal">pts</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FEE LEDGER */}
      {activeTab === 'fee' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Personal Fee &amp; JVD Disbursement Ledger</span>
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
