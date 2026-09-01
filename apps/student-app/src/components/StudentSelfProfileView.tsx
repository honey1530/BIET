import React, { useState, useEffect } from 'react';
import { SAMPLE_STUDENTS, JNTUK_COURSES } from '../../../../src/data/bietData';
import { getStudentProfileByHtno } from '../../../../src/data/db';
import { StudentProfile } from '../../../../src/types';
import { 
  User, GraduationCap, Award, Percent, CreditCard, CheckCircle2, ShieldCheck 
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

  // Simulate ultra-fast skeleton load for Linear UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(timer);
  }, [studentHtno, activeTab]);

  // 1. LOADING SKELETON
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 h-28 space-y-3 shadow-sm">
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-7 bg-slate-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn selection:bg-indigo-600 selection:text-white">
      {/* Upper Hero Box - ONLY shown for student details (activeTab === 'biodata') */}
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

      {/* 4 Stat Overview Cards (Clean Professional White) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Academic CGPA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-slate-900">{student.cgpa}</span>
            <span className="text-xs text-slate-500">/ 10.0</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">First Class with Distinction</p>
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
          { id: 'biodata', label: 'student deails', icon: User },
          { id: 'marks', label: 'Academic and marks', icon: GraduationCap },
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
                  ? 'bg-indigo-600 text-white shadow-sm'
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
              <span className="font-bold text-amber-700 text-sm block">UGC Autonomous Institution</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Scholarship Status</span>
              <span className="font-bold text-emerald-700 text-sm block">AP JVD Govt Beneficiary (Disbursed)</span>
            </div>
          </div>
        </div>
      )}

      {/* Option 2: Academic and marks */}
      {activeTab === 'marks' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Enrolled JNTUK R20 Semester Courses &amp; Marks Breakdown</span>
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              SGPA: {student.cgpa}
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
