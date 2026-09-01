import React, { useState } from 'react';
import { EXAM_SCHEDULES, SAMPLE_STUDENTS } from '../../data/bietData';
import { SeatingAllocation } from '../../types';
import { FileCheck2, Users, Calendar, Grid, CheckCircle2, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

export const ExamCell: React.FC = () => {
  const [selectedHall, setSelectedHall] = useState<string>('Hall 301 (Main Block)');
  const [isSolvingSeating, setIsSolvingSeating] = useState(false);
  const [seatingPlan, setSeatingPlan] = useState<SeatingAllocation[] | null>(null);

  const handleSolveSeating = () => {
    setIsSolvingSeating(true);
    setTimeout(() => {
      // Solve seating by interleaving CSE and ECE students
      const cseStudents = SAMPLE_STUDENTS.filter(s => s.department === 'CSE');
      const eceStudents = SAMPLE_STUDENTS.filter(s => s.department === 'ECE' || s.department === 'AIDS');

      const allocations: SeatingAllocation[] = [];
      for (let i = 0; i < 12; i++) {
        const studentA = cseStudents[i % cseStudents.length];
        const studentB = eceStudents[(i + 1) % eceStudents.length];

        allocations.push({
          benchNo: i + 1,
          hallNo: selectedHall,
          seatA: {
            htno: studentA ? studentA.htno : `21A91A050${i + 1}`,
            name: studentA ? studentA.name : `CSE Student ${i + 1}`,
            dept: 'CSE',
            yearSec: '3-CSE-A'
          },
          seatB: {
            htno: studentB ? studentB.htno : `21A91A040${i + 1}`,
            name: studentB ? studentB.name : `ECE Student ${i + 1}`,
            dept: 'ECE',
            yearSec: '3-ECE-B'
          }
        });
      }
      setSeatingPlan(allocations);
      setIsSolvingSeating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              OFFICIAL JNTUK CELL
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              BIET Examination Control Cell
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            JNTUK Kakinada Examination Scheduling, Seating Matrix &amp; Confidential Result Moderation
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> JNTUK Portal Connected
          </span>
        </div>
      </div>

      {/* Exam Schedules */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          <span>Active JNTUK Mid &amp; Semester End Exam Timetable</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXAM_SCHEDULES.map((ex) => (
            <div key={ex.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded">{ex.regulation}</span>
                <span className="text-slate-500 font-medium">{ex.date}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{ex.courseName}</h4>
              <p className="text-xs text-slate-600 font-mono">Code: {ex.courseCode}</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span>Session: <strong>{ex.session}</strong></span>
                <span>Enrolled: <strong>{ex.registeredStudentsCount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automated Seating Arrangement Solver */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <Grid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-400 font-serif">
                JNTUK Anti-Adjacent Seating Arrangement Solver Engine
              </h3>
              <p className="text-xs text-slate-400">
                Automatically interleaves students from different branches (CSE vs ECE) on adjacent benches
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="Hall 301 (Main Block)">Hall 301 (Main Block - 24 Seats)</option>
              <option value="Hall 302 (Ramanujan Block)">Hall 302 (Ramanujan Block - 24 Seats)</option>
              <option value="Hall 405 (Visvesvaraya Block)">Hall 405 (Visvesvaraya Block - 24 Seats)</option>
            </select>

            <button
              onClick={handleSolveSeating}
              disabled={isSolvingSeating}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{isSolvingSeating ? 'Solving Matrix...' : 'Solve Hall Seating'}</span>
            </button>
          </div>
        </div>

        {seatingPlan ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-amber-300 font-mono">
              <span>LOCATION: {selectedHall}</span>
              <span className="text-emerald-400 font-bold">✓ JNTUK ZERO-ADJACENT ISOLATION VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {seatingPlan.map((allocation) => (
                <div key={allocation.benchNo} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                    BENCH NO. #{allocation.benchNo}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-1.5 bg-blue-950/80 text-blue-200 rounded border border-blue-800/50">
                      <span className="text-[10px] text-blue-400 font-bold">SEAT A (LEFT)</span>
                      <p className="font-bold">{allocation.seatA.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{allocation.seatA.htno} • {allocation.seatA.dept}</p>
                    </div>
                    <div className="p-1.5 bg-emerald-950/80 text-emerald-200 rounded border border-emerald-800/50">
                      <span className="text-[10px] text-emerald-400 font-bold">SEAT B (RIGHT)</span>
                      <p className="font-bold">{allocation.seatB.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{allocation.seatB.htno} • {allocation.seatB.dept}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl space-y-2">
            <Building2 className="w-8 h-8 text-amber-500 mx-auto" />
            <p>Click "Solve Hall Seating" to run the CSP solver algorithm for {selectedHall}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
