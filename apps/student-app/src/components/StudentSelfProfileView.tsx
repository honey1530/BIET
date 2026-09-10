import React, { useState, useEffect } from 'react';
import { SAMPLE_STUDENTS, JNTUK_COURSES } from '../../../../src/data/bietData';
import { getStudentProfileByHtno } from '../../../../src/data/db';
import { StudentProfile } from '../../../../src/types';
import { 
  User, GraduationCap, Award, Percent, CreditCard, CheckCircle2, ShieldCheck, 
  Calculator, RefreshCw, Sparkles, AlertTriangle, BookOpen, CheckCircle, Plus, Trash2 
} from 'lucide-react';

interface StudentSelfProfileViewProps {
  studentHtno: string;
  studentName?: string;
  department?: string;
  initialSubTab?: 'biodata' | 'marks' | 'calculator' | 'fee';
}

interface SubjectRecord {
  id: string;
  code: string;
  name: string;
  sem: string;
  credits: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F';
  isBacklog: boolean;
  isCleared: boolean;
  clearedGrade?: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C';
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
    name: studentName || resolvedStudent.name,
    department: (department as any) || resolvedStudent.department
  };

  // Grade Points Scale (BIET Autonomous Regulation)
  const GRADE_POINTS: Record<string, number> = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'F': 0
  };

  // Detailed Subject-Wise Academic Roster with Backlog & Cleared Backlog Tracker
  const [subjects, setSubjects] = useState<SubjectRecord[]>([
    { id: '1', code: 'MA101', name: 'Linear Algebra & Calculus', sem: '1-1', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },
    { id: '2', code: 'PH101', name: 'Engineering Physics', sem: '1-1', credits: 3.0, grade: 'A', isBacklog: false, isCleared: false },
    { id: '3', code: 'CS101', name: 'Programming for Problem Solving (C)', sem: '1-1', credits: 3.0, grade: 'O', isBacklog: false, isCleared: false },
    { id: '4', code: 'EE101', name: 'Basic Electrical Engineering', sem: '1-1', credits: 3.0, grade: 'F', isBacklog: true, isCleared: true, clearedGrade: 'B+' },
    
    { id: '5', code: 'MA102', name: 'Differential Equations & Vector Calculus', sem: '1-2', credits: 3.0, grade: 'A', isBacklog: false, isCleared: false },
    { id: '6', code: 'CH101', name: 'Engineering Chemistry', sem: '1-2', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },
    { id: '7', code: 'CS102', name: 'Data Structures using C++', sem: '1-2', credits: 3.0, grade: 'A', isBacklog: false, isCleared: false },
    
    { id: '8', code: 'CS201', name: 'Discrete Mathematical Structures', sem: '2-1', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },
    { id: '9', code: 'CS202', name: 'Java Object Oriented Programming', sem: '2-1', credits: 3.0, grade: 'O', isBacklog: false, isCleared: false },
    { id: '10', code: 'CS203', name: 'Database Management Systems', sem: '2-1', credits: 3.0, grade: 'A', isBacklog: false, isCleared: false },
    { id: '11', code: 'CS204', name: 'Digital Logic & Computer Organization', sem: '2-1', credits: 3.0, grade: 'F', isBacklog: true, isCleared: false },
    
    { id: '12', code: 'CS205', name: 'Operating Systems', sem: '2-2', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },
    { id: '13', code: 'CS206', name: 'Design and Analysis of Algorithms', sem: '2-2', credits: 3.0, grade: 'A', isBacklog: false, isCleared: false },
    { id: '14', code: 'CS207', name: 'Software Engineering', sem: '2-2', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },

    { id: '15', code: 'CS301', name: 'Computer Networks', sem: '3-1', credits: 3.0, grade: 'O', isBacklog: false, isCleared: false },
    { id: '16', code: 'CS302', name: 'Web Technologies & Frameworks', sem: '3-1', credits: 3.0, grade: 'A+', isBacklog: false, isCleared: false },
    { id: '17', code: 'CS303', name: 'Artificial Intelligence & Machine Learning', sem: '3-1', credits: 3.0, grade: 'O', isBacklog: false, isCleared: false },
  ]);

  const [selectedSemFilter, setSelectedSemFilter] = useState<string>('ALL');
  const [calcFormula, setCalcFormula] = useState<'biet_r23' | 'standard'>('biet_r23');

  // Dynamically calculate SGPA / CGPA / Backlogs from Subject Roster
  let totalRegisteredCredits = 0;
  let totalEarnedCredits = 0;
  let totalGradePoints = 0;
  let activeBacklogsCount = 0;
  let clearedBacklogsCount = 0;

  subjects.forEach(s => {
    totalRegisteredCredits += s.credits;
    const effectiveGrade = (s.isBacklog && s.isCleared && s.clearedGrade) ? s.clearedGrade : s.grade;
    const points = GRADE_POINTS[effectiveGrade] || 0;

    if (effectiveGrade === 'F') {
      activeBacklogsCount++;
    } else {
      totalEarnedCredits += s.credits;
      totalGradePoints += (points * s.credits);
      if (s.isBacklog && s.isCleared) {
        clearedBacklogsCount++;
      }
    }
  });

  const calculatedCgpa = totalEarnedCredits > 0 ? (totalGradePoints / totalEarnedCredits) : 0;
  
  // BIET Autonomous Percentage Formula: (CGPA - 0.75) * 10
  const calculatedPercentage = calcFormula === 'biet_r23'
    ? Math.max(0, (calculatedCgpa - 0.75) * 10)
    : (calculatedCgpa * 9.5);

  const getDivision = (cgpa: number) => {
    if (cgpa >= 7.75) return { title: 'First Class with Distinction', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (cgpa >= 6.75) return { title: 'First Class', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (cgpa >= 5.75) return { title: 'Second Class', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { title: 'Pass Class', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const currentDivision = getDivision(calculatedCgpa);

  // Subject Grade Handlers
  const handleUpdateGrade = (id: string, newGrade: SubjectRecord['grade']) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === id) {
        const isBacklog = newGrade === 'F';
        return {
          ...s,
          grade: newGrade,
          isBacklog,
          isCleared: isBacklog ? false : s.isCleared
        };
      }
      return s;
    }));
  };

  const handleToggleCleared = (id: string, isCleared: boolean) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          isCleared,
          clearedGrade: isCleared ? (s.clearedGrade || 'B+') : undefined
        };
      }
      return s;
    }));
  };

  const handleUpdateClearedGrade = (id: string, clearedGrade: SubjectRecord['clearedGrade']) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, clearedGrade } : s));
  };

  const filteredSubjectList = selectedSemFilter === 'ALL'
    ? subjects
    : subjects.filter(s => s.sem === selectedSemFilter);

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
      {/* Upper Hero Box */}
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
                    UGC AUTONOMOUS • BIET R23/R20 REGULATION
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED SIS
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">{student.name}</h2>
                <p className="text-xs text-indigo-700 font-mono font-bold">
                  HTNO: {student.htno} • {student.department} Branch ({student.yearSection})
                </p>
                <p className="text-xs text-slate-600 pt-1 font-medium">
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
          <p className="text-[11px] text-slate-500 mt-1">Exam Hall Ticket Eligible</p>
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
            <span className="uppercase font-extrabold tracking-wider text-[10px]">Backlog Status</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{activeBacklogsCount}</span>
            <span className="text-xs text-slate-500 font-semibold">Active</span>
            {clearedBacklogsCount > 0 && (
              <span className="text-xs text-emerald-700 font-bold">({clearedBacklogsCount} Cleared)</span>
            )}
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            {activeBacklogsCount === 0 ? 'Clean Academic Record' : `${activeBacklogsCount} Supply Exam Pending`}
          </p>
        </div>
      </div>

      {/* Main Sub-Tab Navigation Bar with Standalone Calculator Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center space-x-2 overflow-x-auto shadow-xs">
        {[
          { id: 'biodata', label: 'Student Bio-Data', icon: User },
          { id: 'marks', label: 'Academic Marks & Grade Sheet', icon: GraduationCap },
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
              <span className="text-slate-500 font-semibold block text-[11px]">Hall Ticket No</span>
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
              <span className="font-bold text-indigo-700 text-sm block">UGC Autonomous Institution (BIET)</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px]">Scholarship Status</span>
              <span className="font-bold text-emerald-700 text-sm block">AP JVD Govt Beneficiary (Disbursed)</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ACADEMIC MARKS & ENROLLED COURSES */}
      {activeTab === 'marks' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>BIET Autonomous Semester Courses &amp; Internal Marks Breakdown</span>
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              CGPA: {calculatedCgpa.toFixed(2)}
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

      {/* SUB-TAB 3: STANDALONE SGPA, CGPA & PERCENTAGE CALCULATOR (SUBJECT-WISE & CLEARED BACKLOGS TRACKER) */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Header Banner & Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <span>BIET Autonomous SGPA, CGPA &amp; Percentage Calculator</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Subject-wise grade calculation with real-time backlog clearing tracker (BIET Autonomous R23/R20)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-600">Formula:</label>
                <select
                  value={calcFormula}
                  onChange={(e) => setCalcFormula(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-indigo-700 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="biet_r23">BIET Autonomous [(CGPA - 0.75) × 10]</option>
                  <option value="standard">Standard [(CGPA × 9.5)]</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Overall CGPA</span>
                <div className="text-3xl font-black text-slate-900">{calculatedCgpa.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 10</span></div>
                <span className="text-[11px] font-bold text-indigo-700">Credits Earned: {totalEarnedCredits} / {totalRegisteredCredits}</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Equivalent Percentage</span>
                <div className="text-3xl font-black text-emerald-700">{calculatedPercentage.toFixed(2)}%</div>
                <span className="text-[11px] font-bold text-emerald-800">
                  {calcFormula === 'biet_r23' ? 'Formula: (CGPA - 0.75) × 10' : 'Formula: CGPA × 9.5'}
                </span>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Backlog Tracker</span>
                <div className="text-2xl font-black text-purple-900">
                  {activeBacklogsCount} Active
                </div>
                <span className="text-[11px] font-bold text-emerald-700 block">
                  {clearedBacklogsCount} Backlogs Cleared in Supply
                </span>
              </div>

              <div className={`p-4 rounded-xl text-center space-y-1 border ${currentDivision.bg}`}>
                <span className="text-xs font-bold uppercase tracking-wider">Degree Division</span>
                <div className="text-base font-black">{currentDivision.title}</div>
                <span className="text-[11px] font-semibold">Official Autonomous Status</span>
              </div>
            </div>

            {/* Semester Filter Tabs */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Subject Grade Sheet:</span>
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {['ALL', '1-1', '1-2', '2-1', '2-2', '3-1'].map(sem => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemFilter(sem)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedSemFilter === sem
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sem === 'ALL' ? 'All Semesters' : `Sem ${sem}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject-Wise Grade & Cleared Backlog Table */}
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Sem</th>
                      <th className="py-3 px-4">Subject Code &amp; Name</th>
                      <th className="py-3 px-4">Credits</th>
                      <th className="py-3 px-4">Original Grade</th>
                      <th className="py-3 px-4">Backlog Status</th>
                      <th className="py-3 px-4">Cleared Grade (Supply)</th>
                      <th className="py-3 px-4 text-right">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredSubjectList.map((sub) => {
                      const effectiveGrade = (sub.isBacklog && sub.isCleared && sub.clearedGrade) ? sub.clearedGrade : sub.grade;
                      const points = GRADE_POINTS[effectiveGrade] || 0;

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-indigo-700 font-mono">{sub.sem}</td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-indigo-600 font-bold mr-2">[{sub.code}]</span>
                            <span className="font-bold text-slate-900">{sub.name}</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-700">{sub.credits}</td>

                          {/* Grade Selector */}
                          <td className="py-3 px-4">
                            <select
                              value={sub.grade}
                              onChange={(e) => handleUpdateGrade(sub.id, e.target.value as any)}
                              className={`font-bold text-xs rounded-lg px-2 py-1 border cursor-pointer ${
                                sub.grade === 'F' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-slate-50 text-slate-900 border-slate-200'
                              }`}
                            >
                              <option value="O">O (10 Points)</option>
                              <option value="A+">A+ (9 Points)</option>
                              <option value="A">A (8 Points)</option>
                              <option value="B+">B+ (7 Points)</option>
                              <option value="B">B (6 Points)</option>
                              <option value="C">C (5 Points)</option>
                              <option value="F">F (Fail / Backlog)</option>
                            </select>
                          </td>

                          {/* Backlog & Cleared Status */}
                          <td className="py-3 px-4">
                            {sub.grade === 'F' || sub.isBacklog ? (
                              <label className="flex items-center space-x-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={sub.isCleared}
                                  onChange={(e) => handleToggleCleared(sub.id, e.target.checked)}
                                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                                />
                                <span className={`text-[11px] font-bold ${sub.isCleared ? 'text-emerald-700' : 'text-rose-600'}`}>
                                  {sub.isCleared ? '✓ Cleared in Supply' : '⚠️ Active Backlog'}
                                </span>
                              </label>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium">Regular Pass</span>
                            )}
                          </td>

                          {/* Cleared Grade Dropdown (Shown only if Cleared) */}
                          <td className="py-3 px-4">
                            {sub.isBacklog && sub.isCleared ? (
                              <select
                                value={sub.clearedGrade || 'B+'}
                                onChange={(e) => handleUpdateClearedGrade(sub.id, e.target.value as any)}
                                className="bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs rounded-lg px-2 py-1 cursor-pointer"
                              >
                                <option value="O">O (10 Pts)</option>
                                <option value="A+">A+ (9 Pts)</option>
                                <option value="A">A (8 Pts)</option>
                                <option value="B+">B+ (7 Pts)</option>
                                <option value="B">B (6 Pts)</option>
                                <option value="C">C (5 Pts)</option>
                              </select>
                            ) : (
                              <span className="text-slate-400 text-[11px]">—</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
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
