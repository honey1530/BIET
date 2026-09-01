import React, { useState } from 'react';
import { DailyAttendanceLog } from '../../types';
import { SAMPLE_DAILY_ATTENDANCE } from '../../data/bietData';
import { Fingerprint, Calendar, CheckCircle2, XCircle, Clock, AlertTriangle, Calculator, Sparkles, Percent, ShieldCheck, QrCode, UserCheck } from 'lucide-react';

interface DailyAttendanceTrackerProps {
  initialSubTab?: 'log' | 'calculator';
  studentName?: string;
  studentHtno?: string;
  department?: string;
}

export const DailyAttendanceTracker: React.FC<DailyAttendanceTrackerProps> = ({
  initialSubTab = 'log',
  studentName,
  studentHtno,
  department
}) => {
  const [logs] = useState<DailyAttendanceLog[]>(SAMPLE_DAILY_ATTENDANCE);
  const [selectedDate, setSelectedDate] = useState<string>(SAMPLE_DAILY_ATTENDANCE[0].date);

  // Target Calculator State
  const [missClassesInput, setMissClassesInput] = useState<number>(2);
  const [targetResult, setTargetResult] = useState<{
    newPct: number;
    neededContinuous: number;
    status: 'Safe' | 'Condonation Risk' | 'Detained';
  } | null>(null);

  // Auto-run simulation if opened with calculator sub-tab
  React.useEffect(() => {
    if (initialSubTab === 'calculator') {
      handleSimulateFutureAbsence(2);
    }
  }, [initialSubTab]);

  const activeDayLog = logs.find(l => l.date === selectedDate) || logs[0];
  const currentTotalAttended = 141; // Out of 160 classes
  const currentTotalClasses = 160;
  const currentPercentage = Math.round((currentTotalAttended / currentTotalClasses) * 1000) / 10; // 88.1%

  const handleSimulateFutureAbsence = (missCount: number) => {
    const newAttended = currentTotalAttended;
    const newTotal = currentTotalClasses + missCount;
    const newPct = Math.round((newAttended / newTotal) * 1000) / 10;

    // Calculate how many continuous present classes needed to reach 75% if below 75%
    let needed = 0;
    if (newPct < 75) {
      needed = Math.ceil((0.75 * newTotal - newAttended) / 0.25);
    }

    setTargetResult({
      newPct,
      neededContinuous: Math.max(0, needed),
      status: newPct >= 75 ? 'Safe' : newPct >= 65 ? 'Condonation Risk' : 'Detained'
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Grid Layout: Daily Period Log + Interactive Attendance Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Period-by-Period Timeline (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-base font-serif">Daily Periods Attendance Breakdown</h3>
                {studentName && (
                  <p className="text-xs text-slate-500 font-medium">
                    Student Record: <strong className="text-slate-900">{studentName}</strong> ({studentHtno || 'Verified'} • {department || 'CSE'} Branch)
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs text-slate-600 font-semibold">Select Date:</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-50 border border-slate-300 font-bold text-slate-900 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {logs.map(l => (
                  <option key={l.date} value={l.date}>
                    {l.date} ({l.dayOfWeek})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Daily Percentage Overview Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">{activeDayLog.dayOfWeek} Summary</span>
              <span className="text-lg font-bold text-amber-400">
                {activeDayLog.presentCount} / {activeDayLog.totalPeriodsCount} Periods Attended
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">{activeDayLog.dailyPercentage}%</span>
              <span className="text-[10px] text-slate-400 block">Daily Score</span>
            </div>
          </div>

          {/* 7 Periods Detailed List */}
          <div className="space-y-2.5">
            {activeDayLog.periods.map((p) => (
              <div
                key={p.periodNo}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  p.status === 'PRESENT'
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                    : p.status === 'ABSENT'
                    ? 'bg-rose-50/60 border-rose-200 text-slate-900'
                    : 'bg-amber-50/60 border-amber-200 text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center ${
                    p.status === 'PRESENT' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    P{p.periodNo}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">{p.subjectName}</span>
                      <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-semibold">
                        {p.subjectCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {p.timeSlot} • Faculty: <strong className="text-slate-700">{p.facultyName}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                    p.status === 'PRESENT'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 font-mono">{p.captureMode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive JNTUK Target & Absence Simulator (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Calculator className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base font-serif">Daily Attendance Target Calculator</h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Test what happens to your JNTUK percentage if you miss upcoming classes or want to reach an 85%+ attendance score.
          </p>

          {/* Quick Simulation Buttons */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 block">Simulate Expected Missed Classes:</label>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 5, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setMissClassesInput(num);
                    handleSimulateFutureAbsence(num);
                  }}
                  className="bg-white hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-bold border border-slate-300 py-2 rounded-lg text-xs transition-all shadow-sm"
                >
                  +{num} Classes
                </button>
              ))}
            </div>

            {targetResult && (
              <div className="mt-3 p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs font-sans">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Simulated Attendance:</span>
                  <span className="text-lg font-black text-amber-400">{targetResult.newPct}%</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">JNTUK Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    targetResult.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {targetResult.status}
                  </span>
                </div>

                {targetResult.neededContinuous > 0 && (
                  <p className="text-[11px] text-rose-300 font-medium pt-1 border-t border-slate-800">
                    ⚠️ You need <strong>{targetResult.neededContinuous} continuous classes</strong> to recover back to 75%.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* JNTUK Official Rules Reference */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2 text-amber-950">
            <h4 className="font-bold flex items-center gap-1 text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>JNTUK Attendance Regulations (R20 &amp; R23)</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li><strong>75% and above:</strong> Eligible for Semester End Exams (SEE) without fines.</li>
              <li><strong>65% to 74.9%:</strong> Condonation granted on valid medical grounds with Principal approval.</li>
              <li><strong>Below 65%:</strong> Detained (Must repeat the semester).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
