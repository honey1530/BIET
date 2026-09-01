import React, { useState } from 'react';
import { JNTUK_COURSES, SAMPLE_STUDENTS } from '../../data/bietData';
import { Course, BloomQuestion, DepartmentCode } from '../../types';
import { Users, FileCheck, Sparkles, CheckCircle, BarChart3, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

interface FacultyHubProps {
  selectedDept?: DepartmentCode | 'ALL';
}

export const FacultyHub: React.FC<FacultyHubProps> = ({ selectedDept = 'ALL' }) => {
  const filteredCourses = (selectedDept && selectedDept !== 'ALL')
    ? JNTUK_COURSES.filter(c => c.department === selectedDept)
    : JNTUK_COURSES;

  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(
    filteredCourses.length > 0 ? filteredCourses[0].code : 'R203102'
  );
  const [generatedPaper, setGeneratedPaper] = useState<any | null>(null);
  const [isGeneratingPaper, setIsGeneratingPaper] = useState(false);

  const currentCourse: Course = filteredCourses.find(c => c.code === selectedCourseCode) || filteredCourses[0] || JNTUK_COURSES[0];

  const handleGenerateExamPaper = async () => {
    setIsGeneratingPaper(true);
    setGeneratedPaper(null);

    try {
      const res = await fetch('/api/ai/exam-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseName: currentCourse.name,
          courseCode: currentCourse.code,
          regulation: currentCourse.regulation,
          midType: 'Mid-1',
          units: currentCourse.syllabusUnits.slice(0, 3)
        })
      });
      const data = await res.json();
      setGeneratedPaper(data);
    } catch (err: any) {
      alert(`Error generating exam paper: ${err.message || String(err)}`);
    } finally {
      setIsGeneratingPaper(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            BIET Faculty &amp; HOD Workstation
          </h2>
          <p className="text-xs text-slate-500">
            JNTUK Course Delivery, Bloom's Taxonomy Question Bank &amp; NBA Attainment
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600">Active Teaching Course:</label>
          <select
            value={selectedCourseCode}
            onChange={(e) => {
              setSelectedCourseCode(e.target.value);
              setGeneratedPaper(null);
            }}
            className="bg-slate-100 border border-slate-300 font-bold text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {filteredCourses.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name} ({c.regulation})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Course Card */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <div className="flex justify-between items-start">
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded">
              {currentCourse.code}
            </span>
            <span className="text-xs text-amber-300 font-medium">{currentCourse.regulation} CBCS</span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-white">{currentCourse.name}</h3>
            <p className="text-xs text-slate-400 mt-1">Instructor: {currentCourse.facultyName}</p>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-bold text-white">{currentCourse.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Enrolled Students:</span>
              <span className="font-bold text-emerald-400">{currentCourse.enrolledStudents} Students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Credits:</span>
              <span className="font-bold text-amber-300">{currentCourse.credits} Credits</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Syllabus Progress</span>
            <div className="space-y-1.5 mt-2">
              {currentCourse.syllabusUnits.map((unit, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-slate-200">Unit {idx + 1}: {unit}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">COMPLETED</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI JNTUK Mid-Paper Generator (Bloom's Taxonomy) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/20 text-amber-600 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  JNTUK Bloom's Taxonomy Question Paper Generator
                </h3>
                <p className="text-xs text-slate-500">
                  Generates Mid-1/Mid-2 exam papers matching NBA Course Outcomes (CO1-CO5)
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateExamPaper}
              disabled={isGeneratingPaper}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGeneratingPaper ? 'animate-spin' : ''}`} />
              <span>{isGeneratingPaper ? 'Generating Paper...' : 'Generate Mid Paper'}</span>
            </button>
          </div>

          {generatedPaper ? (
            <div className="p-5 bg-slate-950 text-slate-100 rounded-xl space-y-4 font-sans text-xs border border-slate-800">
              <div className="text-center border-b border-slate-800 pb-3 space-y-1">
                <h4 className="font-serif font-bold text-amber-400 text-sm">
                  BHIMAVARAM INSTITUTE OF ENGINEERING &amp; TECHNOLOGY (BIET)
                </h4>
                <p className="text-slate-300 font-medium">
                  {generatedPaper.midType} EXAMINATIONS — {generatedPaper.regulation} REGULATION
                </p>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Subject: {generatedPaper.courseName} ({generatedPaper.courseCode})</span>
                  <span>Max Marks: {generatedPaper.maxMarks} | Time: {generatedPaper.durationMinutes} Mins</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {generatedPaper.questions?.map((q: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[10px] text-amber-400 font-bold">
                      <span>Q{idx + 1}. [Unit {q.unit}] — {q.bloomLevel?.toUpperCase()} LEVEL</span>
                      <span>{q.marks} Marks • {q.coMapping}</span>
                    </div>
                    <p className="text-slate-200 text-xs font-serif leading-relaxed">
                      {q.questionText}
                    </p>
                    {q.orQuestionText && (
                      <p className="text-slate-400 text-xs font-serif pt-1 border-t border-slate-800/80">
                        <strong className="text-amber-500 font-sans">OR</strong> {q.orQuestionText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2">
              <FileCheck className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">No Question Paper Generated Yet</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click "Generate Mid Paper" to invoke BIET Cortex AI engine to craft a balanced JNTUK mid-examination question paper conforming to Bloom's taxonomy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
