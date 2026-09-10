import React, { useState, useEffect } from 'react';
import { SAMPLE_STUDENTS, JNTUK_COURSES } from '../../../../src/data/bietData';
import { getStudentProfileByHtno } from '../../../../src/data/db';
import { StudentProfile } from '../../../../src/types';
import { 
  User, GraduationCap, Award, Percent, CreditCard, CheckCircle2, ShieldCheck, Calculator, RefreshCw, Sparkles 
} from 'lucide-react';

interface StudentSelfProfileViewProps {
  studentHtno: string;
  studentName?: string;
  department?: string;
  initialSubTab?: 'biodata' | 'marks' | 'fee';
}

export const StudentSelfProfileView: React.FC<StudentSelfProfileViewProps> = ({
  studentHtno,
  studentName,
  department,
  initialSubTab = 'biodata'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'biodata' | 'marks' | 'fee'>(initialSubTab);

  // Sync activeTab when initialSubTab changes from parent navigation
  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Dynamically resolve student profile from database or SAMPLE_STUDENTS
  const resolvedStudent: StudentProfile = getStudentProfileByHtno(studentHtno);
  const student: StudentProfile = {
    ...resolvedStudent,
    name: studentName || resolvedStudent.name,
    department: (department as any) || resolvedStudent.department
  };

  // SGPA / CGPA / Percentage Calculator State
  const [semesters, setSemesters] = useState<{ sem: string; gpa: number; credits: number }[]>([
    { sem: '1-1', gpa: 8.5, credits: 20 },
    { sem: '1-2', gpa: 8.8, credits: 20 },
    { sem: '2-1', gpa: 8.9, credits: 21 },
    { sem: '2-2', gpa: 8.7, credits: 21 },
    { sem: '3-1', gpa: student.cgpa || 8.84, credits: 22 },
  ]);

  const [calcFormula, setCalcFormula] = useState<'jntuk_r20' | 'standard'>('jntuk_r20');

  // Calculate Weighted CGPA
  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const totalWeightedGpa = semesters.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalWeightedGpa / totalCredits) : student.cgpa;

  // Percentage Formulas: JNTUK R20: (CGPA - 0.75) * 10 | Standard: CGPA * 9.5
  const calculatedPercentage = calcFormula === 'jntuk_r20'
    ? Math.max(0, (calculatedCgpa - 0.75) * 10)
    : (calculatedCgpa * 9.5);

  const getDivision = (cgpa: number) => {
    if (cgpa >= 7.75) return { title: 'First Class with Distinction', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (cgpa >= 6.75) return { title: 'First Class', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (cgpa >= 5.75) return { title: 'Second Class', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { title: 'Pass Class', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const currentDivision = getDivision(calculatedCgpa);

  // Simulate ultra-fast skeleton load for Linear UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(timer);
  }, [studentHtno, activeTab]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse" aria-label="Loading student profile">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 h-40 flex items-center space-x-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200/80 rounded w-1/4" />
            <div className="h-3 bg-slate-200/50 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn selection:bg-indigo-600 selection:text-white">
      {/* Upper Hero Box - ONLY shown for student details */}
      {activeTab === 'biodata' && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start md:items-center space-x-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-2xl md:text-3xl flex items-center justify-center shadow-lg border border-indigo-400/30">
                {student.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-500/30 uppercase tracking-wider">
                    UGC AUTONOMOUS • {student.regulation}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED SIS
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">{student.name}</h2>
                <p className="text-xs text-amber-300 font-mono font-bold">
                  JNTUK HTNO: {student.htno} • {student.department} Branch ({student.yearSection})
                </p>
                <p className="text-xs text-slate-300 pt-1 font-medium">
                  Personal bio-data, guardian details, and official academic records.
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
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Academic CGPA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-slate-900">{calculatedCgpa.toFixed(2)}</span>
            <span className="text-xs text-slate-500">/ 10.0</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">{calculatedPercentage.toFixed(2)}% Equivalent</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Biometric Attendance</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-slate-900">{student.attendancePercentage}%</span>
            <span className="text-xs text-emerald-700 font-bold">&gt; 75% Safe</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Hall Ticket Eligible</p>
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
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">{student.backlogs}</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">Clean Academic Record</p>
        </div>
      </div>

      {/* Sub-Tab Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center space-x-2 overflow-x-auto shadow-xs">
        {[
          { id: 'biodata', label: 'Student Bio-Data', icon: User },
          { id: 'marks', label: 'Academic Marks & CGPA Calculator', icon: GraduationCap },
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

      {/* Option 1: Personal Bio-Data */}
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
              <span className="text-slate-500 font-semibold block text-[11px]">JNTUK Hall Ticket No</span>
              <span className="font-bold text-indigo-700 font-mono text-sm block">{student.htno}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Department &amp; Branch</span>
              <span className="font-bold text-slate-900 text-sm block">{student.department} ({student.yearSection})</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Father / Guardian Name</span>
              <span className="font-bold text-slate-900 text-sm block">{student.fatherName || 'Father / Guardian'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Student Contact Phone</span>
              <span className="font-bold text-slate-900 font-mono text-sm block">{student.phone}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Guardian Phone</span>
              <span className="font-bold text-indigo-700 font-mono text-sm block">{student.parentPhone}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Official Email Address</span>
              <span className="font-bold text-slate-900 text-sm block">{student.email}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">College Status</span>
              <span className="font-bold text-indigo-700 text-sm block">UGC Autonomous Institution</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Scholarship Status</span>
              <span className="font-bold text-emerald-700 text-sm block">AP JVD Govt Beneficiary (Disbursed)</span>
            </div>
          </div>
        </div>
      )}

      {/* Option 2: Academic Marks & Interactive CGPA / SGPA / Percentage Calculator */}
      {activeTab === 'marks' && (
        <div className="space-y-6">
          {/* INTERACTIVE CGPA / SGPA / PERCENTAGE CALCULATOR WIDGET */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <span>JNTUK SGPA, CGPA &amp; Percentage Calculator</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculate semester SGPA, overall CGPA, and equivalent percentage for JNTUK R20/R23 regulations
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-600">Formula:</label>
                <select
                  value={calcFormula}
                  onChange={(e) => setCalcFormula(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-indigo-700 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="jntuk_r20">JNTUK R20 [(CGPA - 0.75) × 10]</option>
                  <option value="standard">Standard [(CGPA × 9.5)]</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Overall CGPA</span>
                <div className="text-3xl font-black text-slate-900">{calculatedCgpa.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 10</span></div>
                <span className="text-[11px] font-bold text-indigo-700">Total Credits: {totalCredits}</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Equivalent Percentage</span>
                <div className="text-3xl font-black text-emerald-700">{calculatedPercentage.toFixed(2)}%</div>
                <span className="text-[11px] font-bold text-emerald-800">
                  {calcFormula === 'jntuk_r20' ? 'Formula: (CGPA - 0.75) × 10' : 'Formula: CGPA × 9.5'}
                </span>
              </div>

              <div className={`p-4 rounded-xl text-center space-y-1 border ${currentDivision.bg}`}>
                <span className="text-xs font-bold uppercase tracking-wider">Academic Class</span>
                <div className="text-lg font-black">{currentDivision.title}</div>
                <span className="text-[11px] font-semibold">Official Degree Classification</span>
              </div>
            </div>

            {/* Semester Inputs Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Semester-wise SGPA Breakdown</h4>
                <button
                  type="button"
                  onClick={() => setSemesters([
                    { sem: '1-1', gpa: 8.5, credits: 20 },
                    { sem: '1-2', gpa: 8.8, credits: 20 },
                    { sem: '2-1', gpa: 8.9, credits: 21 },
                    { sem: '2-2', gpa: 8.7, credits: 21 },
                    { sem: '3-1', gpa: student.cgpa || 8.84, credits: 22 },
                  ])}
                  className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Default Values
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {semesters.map((s, idx) => (
                  <div key={s.sem} className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">Semester {s.sem}</span>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block">SGPA (0 - 10)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={s.gpa}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updated = [...semesters];
                          updated[idx].gpa = Math.min(10, Math.max(0, val));
                          setSemesters(updated);
                        }}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block">Credits</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={s.credits}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          const updated = [...semesters];
                          updated[idx].credits = val;
                          setSemesters(updated);
                        }}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrolled Courses Breakdown Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Enrolled JNTUK R20 Semester Courses &amp; Marks Breakdown</span>
              </h3>
              <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                SGPA: {calculatedCgpa.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JNTUK_COURSES.map((course) => (
                <div key={course.code} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">{course.credits} Credits</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-600">Faculty: <strong className="text-slate-900">{course.facultyName}</strong></p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Internal Mid-1:</span>
                    <span className="font-bold text-emerald-700">28 / 30</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Option 3: Fee Ledger */}
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
