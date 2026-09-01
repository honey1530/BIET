import React, { useState } from 'react';
import { PLACEMENT_DRIVES, SAMPLE_STUDENTS } from '../../data/bietData';
import { PlacementDrive, StudentProfile } from '../../types';
import { Briefcase, Building, Award, CheckCircle2, AlertCircle, Sparkles, Send, FileText, UserCheck } from 'lucide-react';

export const PlacementPortal: React.FC = () => {
  const [selectedDriveId, setSelectedDriveId] = useState<string>('p1');
  const [selectedStudentHtno, setSelectedStudentHtno] = useState<string>('21A91A0501');
  const [aiCoachFeedback, setAiCoachFeedback] = useState<string | null>(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(false);

  const activeDrive: PlacementDrive = PLACEMENT_DRIVES.find(p => p.id === selectedDriveId) || PLACEMENT_DRIVES[0];
  const selectedStudent: StudentProfile = SAMPLE_STUDENTS.find(s => s.htno === selectedStudentHtno) || SAMPLE_STUDENTS[0];

  const isEligible = selectedStudent.cgpa >= activeDrive.eligibilityCgpa &&
    selectedStudent.backlogs <= activeDrive.maxBacklogsAllowed &&
    activeDrive.eligibleBranches.includes(selectedStudent.department);

  const handleRunAiPlacementCoach = async () => {
    setIsLoadingCoach(true);
    setAiCoachFeedback(null);

    try {
      const res = await fetch('/api/ai/placement-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentSkills: selectedStudent.skills,
          targetCompany: activeDrive.companyName,
          roleName: activeDrive.role,
          packageLpa: activeDrive.packageLpa
        })
      });
      const data = await res.json();
      if (data.feedback) {
        setAiCoachFeedback(data.feedback);
      }
    } catch (err: any) {
      setAiCoachFeedback(`Error running AI Placement Coach: ${err.message || String(err)}`);
    } finally {
      setIsLoadingCoach(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-600" />
            <span>BIET Placement &amp; Campus Recruitment Cell</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Connecting BIET engineering graduates with Tier-1 recruiters (TCS, Infosys, Virtusa, Accenture)
          </p>
        </div>

        <span className="text-xs bg-amber-50 text-amber-800 font-bold px-3 py-1.5 rounded-full border border-amber-200">
          Academic Season 2025-2026
        </span>
      </div>

      {/* Recruiter Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLACEMENT_DRIVES.map((drive) => (
          <div
            key={drive.id}
            onClick={() => setSelectedDriveId(drive.id)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedDriveId === drive.id
                ? 'bg-slate-900 text-white border-amber-500 shadow-xl'
                : 'bg-white text-slate-900 border-slate-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                selectedDriveId === drive.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                {drive.status}
              </span>
              <span className="font-extrabold text-emerald-400 text-sm">₹{drive.packageLpa} LPA</span>
            </div>

            <h4 className="font-bold text-base leading-snug">{drive.companyName}</h4>
            <p className={`text-xs mt-1 ${selectedDriveId === drive.id ? 'text-slate-300' : 'text-slate-600'}`}>
              {drive.role}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-700/50 text-xs flex justify-between">
              <span>Drive Date: <strong>{drive.driveDate}</strong></span>
              <span>Min CGPA: <strong>{drive.eligibilityCgpa}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Eligibility Scanner & AI Placement Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Eligibility Checker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Student Eligibility Checker</h3>
            <span className="text-xs font-mono font-bold text-amber-700">{activeDrive.companyName}</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Select Candidate:</label>
              <select
                value={selectedStudentHtno}
                onChange={(e) => {
                  setSelectedStudentHtno(e.target.value);
                  setAiCoachFeedback(null);
                }}
                className="w-full bg-slate-50 border border-slate-300 text-xs font-bold rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
              >
                {SAMPLE_STUDENTS.map(s => (
                  <option key={s.id} value={s.htno}>
                    {s.htno} - {s.name} ({s.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student CGPA:</span>
                <span className="font-bold text-slate-900">{selectedStudent.cgpa} (Cutoff: {activeDrive.eligibilityCgpa})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Backlogs:</span>
                <span className="font-bold text-slate-900">{selectedStudent.backlogs} (Max Allowed: {activeDrive.maxBacklogsAllowed})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch:</span>
                <span className="font-bold text-slate-900">{selectedStudent.department}</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
              isEligible
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {isEligible ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs">ELIGIBLE FOR {activeDrive.companyName.toUpperCase()}</h4>
                    <p className="text-[11px] text-emerald-700">Meets all academic criteria &amp; branch requirements.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs">NOT ELIGIBLE FOR {activeDrive.companyName.toUpperCase()}</h4>
                    <p className="text-[11px] text-rose-700">Does not meet CGPA cutoff or backlog limits.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI Resume Matcher & Interview Coach */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-amber-400 text-base font-serif">
                AI Placement Coach &amp; Technical Interview Generator
              </h3>
            </div>

            <button
              onClick={handleRunAiPlacementCoach}
              disabled={isLoadingCoach}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isLoadingCoach ? 'Evaluating Skills...' : 'Run AI Resume Coach'}</span>
            </button>
          </div>

          {aiCoachFeedback ? (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-3 text-slate-200 font-sans leading-relaxed">
              <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
                <span>RECRUITMENT READINESS EVALUATION — {activeDrive.companyName}</span>
                <span className="text-[10px] text-emerald-400 font-mono">CONFIDENCE 0.94</span>
              </div>
              <div className="whitespace-pre-wrap font-sans text-slate-200 pt-1">
                {aiCoachFeedback}
              </div>
            </div>
          ) : (
            <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-400 text-xs space-y-2">
              <FileText className="w-8 h-8 text-amber-500 mx-auto" />
              <p>Click "Run AI Resume Coach" to evaluate {selectedStudent.name}'s skills against {activeDrive.companyName}'s tech stack.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
