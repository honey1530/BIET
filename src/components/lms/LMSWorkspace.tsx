import React, { useState, useEffect } from 'react';
import { JNTUK_COURSES } from '../../data/bietData';
import { BookOpenCheck, FileText, CheckCircle2, Video, Download, Upload, Award, HelpCircle } from 'lucide-react';

interface LMSWorkspaceProps {
  initialSubTab?: 'notes' | 'question_bank';
}

export const LMSWorkspace: React.FC<LMSWorkspaceProps> = ({ initialSubTab = 'notes' }) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('R203102');
  const [activeTab, setActiveTab] = useState<'notes' | 'question_bank'>(initialSubTab);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  const course = JNTUK_COURSES.find(c => c.code === selectedCourseCode) || JNTUK_COURSES[0];

  const handleDownloadPaper = (paperName: string) => {
    setDownloadMsg(`Downloading ${paperName} Question Bank PDF...`);
    setTimeout(() => setDownloadMsg(null), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-amber-600" />
            <span>BIET Learning Management System (LMS)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            UGC Autonomous &amp; JNTUK R20/R23 Digital Courseware, Lecture Notes &amp; Question Banks
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notes' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Syllabus &amp; Notes
          </button>

          <button
            onClick={() => setActiveTab('question_bank')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'question_bank' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            JNTUK Question Banks
          </button>

          <select
            value={selectedCourseCode}
            onChange={(e) => setSelectedCourseCode(e.target.value)}
            className="bg-slate-100 border border-slate-300 font-bold text-slate-900 text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            {JNTUK_COURSES.map(c => (
              <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-fadeIn shadow">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* VIEW 1: SYLLABUS & LECTURE NOTES */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded">
              {course.code}
            </span>
            <h3 className="text-xl font-serif font-bold text-white">{course.name}</h3>
            <p className="text-xs text-slate-400">Instructor: {course.facultyName}</p>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Units:</span>
                <span className="font-bold text-amber-300">{course.syllabusUnits.length} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Curriculum:</span>
                <span className="font-bold text-emerald-400">{course.regulation} Autonomous</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Course Modules &amp; Submissions</h3>
            <div className="space-y-3">
              {course.syllabusUnits.map((unit, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-amber-700">UNIT {idx + 1}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{unit}</h4>
                    <p className="text-slate-500 text-[11px]">Includes lecture notes PDF, video recordings, and lab code assignment.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-slate-900 text-amber-300 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" /> Lecture Video
                    </button>
                    <button className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Submit Lab
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: QUESTION BANKS & PREVIOUS PAPERS */}
      {activeTab === 'question_bank' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>JNTUK Mid-1, Mid-2 &amp; End-Semester Question Banks</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official Bloom's Taxonomy mapped question papers &amp; key solutions vault for {course.name} ({course.code})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="bg-slate-900 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">MID-1 EXAM BANK</span>
              <h4 className="font-bold text-slate-900 text-sm">{course.name} Mid-1 Question Bank</h4>
              <p className="text-xs text-slate-500">Units 1 &amp; 2 • Bloom's Level 1-4 • 2025-26 Academic Year</p>
              <button
                onClick={() => handleDownloadPaper(`${course.code} Mid-1 Question Bank`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Mid-1 Bank PDF</span>
              </button>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="bg-slate-900 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">MID-2 EXAM BANK</span>
              <h4 className="font-bold text-slate-900 text-sm">{course.name} Mid-2 Question Bank</h4>
              <p className="text-xs text-slate-500">Units 3, 4 &amp; 5 • Analytical &amp; Application Problems</p>
              <button
                onClick={() => handleDownloadPaper(`${course.code} Mid-2 Question Bank`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Mid-2 Bank PDF</span>
              </button>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">AUTONOMOUS MODEL KEYS</span>
              <h4 className="font-bold text-slate-900 text-sm">{course.name} Model Solutions &amp; Keys</h4>
              <p className="text-xs text-slate-500">Verified Answer Key Solutions by Faculty: {course.facultyName}</p>
              <button
                onClick={() => handleDownloadPaper(`${course.code} Answer Key Solution`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Answer Keys</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
