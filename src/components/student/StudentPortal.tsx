import React, { useState } from 'react';
import { SAMPLE_STUDENTS, JNTUK_COURSES } from '../../data/bietData';
import { StudentProfile, DepartmentCode } from '../../types';
import { GraduationCap, Award, Percent, IndianRupee, FileText, CheckCircle2, AlertCircle, Sparkles, Phone, Mail, BookOpen, Calculator } from 'lucide-react';

interface StudentPortalProps {
  selectedDept?: DepartmentCode | 'ALL';
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ selectedDept = 'ALL' }) => {
  const filteredStudents = (selectedDept && selectedDept !== 'ALL')
    ? SAMPLE_STUDENTS.filter(s => s.department === selectedDept)
    : SAMPLE_STUDENTS;

  const [selectedHtno, setSelectedHtno] = useState<string>(
    filteredStudents.length > 0 ? filteredStudents[0].htno : '21A91A0501'
  );
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [isLoadingPredict, setIsLoadingPredict] = useState(false);

  const currentStudent: StudentProfile = filteredStudents.find(s => s.htno === selectedHtno) || filteredStudents[0] || SAMPLE_STUDENTS[0];

  const handlePredictShortage = async () => {
    setIsLoadingPredict(true);
    setPredictionResult(null);

    try {
      const res = await fetch('/api/ai/attendance-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentStudent.name,
          htno: currentStudent.htno,
          currentPercentage: currentStudent.attendancePercentage,
          totalClassesHeld: 160,
          attendedClasses: Math.round((currentStudent.attendancePercentage / 100) * 160),
          remainingWorkingDays: 20
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setPredictionResult(data.analysis);
      }
    } catch (err: any) {
      setPredictionResult(`Error running prediction: ${err.message || String(err)}`);
    } finally {
      setIsLoadingPredict(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Student Selection Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            BIET Student Information System (SIS)
          </h2>
          <p className="text-xs text-slate-500">
            Official student record repository affiliated to JNTUK Kakinada
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600">Select Hall Ticket No:</label>
          <select
            value={selectedHtno}
            onChange={(e) => {
              setSelectedHtno(e.target.value);
              setPredictionResult(null);
            }}
            className="bg-slate-100 border border-slate-300 font-bold text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {filteredStudents.map(s => (
              <option key={s.id} value={s.htno}>
                {s.htno} - {s.name} ({s.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Student Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-lg space-y-5">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center border-2 border-amber-300 shadow-md">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                {currentStudent.regulation} REGULATION
              </span>
              <h3 className="text-xl font-bold font-serif text-white mt-1">{currentStudent.name}</h3>
              <p className="text-xs text-amber-400 font-mono font-bold">JNTUK HTNO: {currentStudent.htno}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-700/80 pt-4">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Department:</span>
              <span className="font-bold text-amber-300">{currentStudent.department}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Year &amp; Section:</span>
              <span className="font-semibold text-white">{currentStudent.yearSection}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Current CGPA:</span>
              <span className="font-black text-emerald-400 text-sm">{currentStudent.cgpa} / 10.0</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Active Backlogs:</span>
              <span className={`font-bold ${currentStudent.backlogs === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentStudent.backlogs} Backlogs
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Parent Contact:</span>
              <span className="font-mono text-slate-300">{currentStudent.parentPhone}</span>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Skill Badges</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentStudent.skills.map((sk, idx) => (
                <span key={idx} className="bg-slate-800 text-amber-200 border border-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* JNTUK 75% Attendance & Shortage Predictor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Percent className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">JNTUK Attendance Tracker</h3>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              currentStudent.attendancePercentage >= 75
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {currentStudent.attendancePercentage >= 75 ? 'Safe (&gt;75%)' : 'Condonation Risk (&lt;75%)'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">Cumulative Attendance Rate</span>
              <span className="font-extrabold text-slate-900">{currentStudent.attendancePercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  currentStudent.attendancePercentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(currentStudent.attendancePercentage, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              JNTUK Mandate: Min 75% required for semester exam hall ticket generation.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Attendance Roadmap &amp; Condonation Predictor</span>
            </div>
            <button
              onClick={handlePredictShortage}
              disabled={isLoadingPredict}
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{isLoadingPredict ? 'Calculating JNTUK Threshold...' : 'Run 75% Recovery Predictor'}</span>
            </button>

            {predictionResult && (
              <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {predictionResult}
              </div>
            )}
          </div>
        </div>

        {/* AP Govt JVD Scholarship & Fee Ledger */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Fee &amp; JVD Scholarship Status</h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
              AP Govt JVD Portal
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Total Annual Tuition Fee:</span>
                <span className="font-bold text-slate-900">₹{currentStudent.totalFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Jagananna Vidya Deevena (JVD):</span>
                <span className="font-bold text-emerald-600">{currentStudent.jvdStatus}</span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-700 font-bold">Outstanding Due Balance:</span>
                <span className="font-extrabold text-rose-600">₹{currentStudent.dueFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Verified Digital Certificates Locker</span>
              </h4>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                  <span>JNTUK III-I Bonafide Certificate</span>
                  <span className="text-[10px] text-emerald-600 font-bold">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                  <span>Semester Transcripts (SGPA 8.84)</span>
                  <span className="text-[10px] text-emerald-600 font-bold">SIGNED</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                  <span>Bhimavaram Bus Pass Passcode</span>
                  <span className="text-[10px] text-amber-600 font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled JNTUK Courses */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-serif">
            Enrolled Courses &amp; Syllabus Progress ({currentStudent.regulation} CBCS Curriculum)
          </h3>
          <span className="text-xs text-slate-500">Semester III-I</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JNTUK_COURSES.map((course) => (
            <div key={course.code} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-slate-900 text-amber-400 font-bold text-xs px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">{course.credits} Credits</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{course.name}</h4>
              <p className="text-xs text-slate-600">Faculty: {course.facultyName}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Syllabus Units</span>
                <div className="text-[11px] text-slate-700 list-disc pl-3 mt-1 space-y-0.5">
                  {course.syllabusUnits.slice(0, 3).map((u, i) => (
                    <div key={i}>• {u}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
