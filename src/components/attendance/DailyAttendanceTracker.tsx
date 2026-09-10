import React, { useState, useEffect } from 'react';
import { DailyAttendanceLog } from '../../types';
import { SAMPLE_DAILY_ATTENDANCE } from '../../data/bietData';
import { 
  Calendar, Calculator, ShieldCheck, AlertTriangle, CheckCircle2, 
  XCircle, Clock, Sparkles, Percent, Target, TrendingUp, Info 
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'log' | 'calculator'>(initialSubTab);
  const [logs] = useState<DailyAttendanceLog[]>(SAMPLE_DAILY_ATTENDANCE);
  const [selectedDate, setSelectedDate] = useState<string>(SAMPLE_DAILY_ATTENDANCE[0].date);

  // Editable Base Attendance State
  const [attendedClasses, setAttendedClasses] = useState<number>(141);
  const [totalClasses, setTotalClasses] = useState<number>(160);

  // Simulation State
  const [missClassesInput, setMissClassesInput] = useState<number>(2);
  const [targetGoalPct, setTargetGoalPct] = useState<number>(85);

  useEffect(() => {
    setActiveTab(initialSubTab);
  }, [initialSubTab]);

  const activeDayLog = logs.find(l => l.date === selectedDate) || logs[0];

  // Base Calculation
  const currentPct = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 1000) / 10 : 0;
  
  // Calculate Safe Missable Classes before dropping below 75%
  const safeMissable75 = Math.max(0, Math.floor((attendedClasses / 0.75) - totalClasses));
  const safeMissable65 = Math.max(0, Math.floor((attendedClasses / 0.65) - totalClasses));

  // Simulation Results
  const simTotalClasses = totalClasses + missClassesInput;
  const simAttendedClasses = attendedClasses; // Assuming missed classes
  const simPct = simTotalClasses > 0 ? Math.round((simAttendedClasses / simTotalClasses) * 1000) / 10 : 0;

  // Needed continuous classes to reach Target Goal Pct (e.g. 75% or 85%)
  const goalDec = targetGoalPct / 100;
  let neededContinuousForGoal = 0;
  if (simPct < targetGoalPct) {
    const numerator = goalDec * simTotalClasses - simAttendedClasses;
    const denominator = 1 - goalDec;
    neededContinuousForGoal = Math.ceil(numerator / denominator);
  }

  // Needed continuous classes to recover to 75% if simulated drops below 75%
  let neededToRecover75 = 0;
  if (simPct < 75) {
    neededToRecover75 = Math.ceil((0.75 * simTotalClasses - simAttendedClasses) / 0.25);
  }

  const getStatusBadge = (pct: number) => {
    if (pct >= 75) {
      return {
        label: 'Safe & Eligible',
        color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        badge: 'bg-emerald-100 text-emerald-800'
      };
    } else if (pct >= 65) {
      return {
        label: 'Condonation Risk (65%-74.9%)',
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        badge: 'bg-amber-100 text-amber-800'
      };
    } else {
      return {
        label: 'Detained Risk (<65%)',
        color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        badge: 'bg-rose-100 text-rose-800'
      };
    }
  };

  const simStatus = getStatusBadge(simPct);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-Tab Navigation Header Bar */}
      <div className="bg-white border border-slate-200 p-2 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'log'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily 7-Periods Log</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Daily Attendance Target Calculator</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs pr-2">
          <span className="text-slate-500 font-medium">Current Attendance:</span>
          <span className={`font-extrabold px-2.5 py-0.5 rounded-full ${
            currentPct >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {currentPct}%
          </span>
        </div>
      </div>

      {activeTab === 'log' ? (
        /* Period-by-Period Timeline Log */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
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
        </div>
      ) : (
        /* Standalone Daily Attendance Target Calculator */
        <div className="space-y-6">
          {/* Base Stats Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base font-serif">Daily Attendance Target Calculator</h3>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                BIET Autonomous Regulations
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Test what happens to your attendance percentage if you miss upcoming classes or want to reach an <strong>85%+</strong> attendance score. Adjust your current numbers or use quick class simulation controls below.
            </p>

            {/* Editable Base Attendance Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Attended Classes</label>
                <input
                  type="number"
                  min="0"
                  max={totalClasses}
                  value={attendedClasses}
                  onChange={(e) => setAttendedClasses(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full bg-white border border-slate-300 font-bold text-slate-900 text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Total Classes Held</label>
                <input
                  type="number"
                  min="1"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full bg-white border border-slate-300 font-bold text-slate-900 text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Current Score</span>
                  <div className="text-2xl font-black text-emerald-400">{currentPct}%</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-300 block">{attendedClasses} / {totalClasses}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    currentPct >= 75 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {currentPct >= 75 ? 'Eligible' : 'Needs Care'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Missed Class Simulator Pane (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  Simulate Expected Missed Classes
                </h4>
                <span className="text-xs text-slate-500 font-medium">Predict Future Drops</span>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Quick Miss Class Increments:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setMissClassesInput(num)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all border shadow-2xs ${
                        missClassesInput === num
                          ? 'bg-amber-500 text-slate-950 border-amber-600 font-extrabold shadow-xs scale-105'
                          : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-300'
                      }`}
                    >
                      +{num} Classes
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Missed Class Slider & Manual Input */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Custom Missed Classes Count:</label>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    +{missClassesInput} Classes Missed
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={missClassesInput}
                    onChange={(e) => setMissClassesInput(parseInt(e.target.value, 10) || 0)}
                    className="flex-1 accent-amber-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={missClassesInput}
                    onChange={(e) => setMissClassesInput(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-16 bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Simulation Result Output Card */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Simulated Attendance</span>
                    <span className="text-xs text-slate-300">
                      {simAttendedClasses} Attended / {simTotalClasses} Total Classes
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-amber-400">{simPct}%</span>
                    <span className="text-[10px] text-slate-400 block">Projected Percentage</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300 font-medium">BIET Eligibility Status:</span>
                  <span className={`font-bold px-3 py-1 rounded-full border text-xs ${simStatus.color}`}>
                    {simStatus.label}
                  </span>
                </div>

                {neededToRecover75 > 0 ? (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong>Exam Eligibility Alert:</strong> You need <strong>{neededToRecover75} continuous classes</strong> without missing any to recover back to <strong>75%</strong>.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>You remain well above the required 75% examination threshold!</span>
                  </div>
                )}
              </div>

              {/* Safe Miss Limit Buffer Information */}
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs space-y-2">
                <h5 className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Maximum Safe Absent Bunk Buffer</span>
                </h5>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-2.5 rounded-lg border border-indigo-100">
                    <span className="text-[10px] text-slate-500 uppercase block">75% Exam Threshold Buffer</span>
                    <span className="text-base font-extrabold text-indigo-700">
                      Can miss up to <strong className="text-indigo-900 font-black">{safeMissable75}</strong> more classes
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-indigo-100">
                    <span className="text-[10px] text-slate-500 uppercase block">65% Condonation Buffer</span>
                    <span className="text-base font-extrabold text-amber-700">
                      Can miss up to <strong className="text-amber-900 font-black">{safeMissable65}</strong> more classes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Attendance Goal & BIET Regulations Pane (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Target Goal Attendance Reacher */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Reach Target Attendance Goal</h4>
                </div>

                <p className="text-xs text-slate-600">
                  Select your desired target percentage score to calculate how many additional continuous classes you must attend:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { pct: 75, label: '75% (Min Exam)' },
                    { pct: 80, label: '80% (Safe)' },
                    { pct: 85, label: '85%+ (Target)' },
                    { pct: 90, label: '90% (Honors)' },
                  ].map((item) => (
                    <button
                      key={item.pct}
                      onClick={() => setTargetGoalPct(item.pct)}
                      className={`p-2.5 rounded-xl font-bold text-xs transition-all border ${
                        targetGoalPct === item.pct
                          ? 'bg-indigo-600 text-white border-indigo-700 font-extrabold shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Selected Target Score:</span>
                    <span className="font-extrabold text-indigo-700 text-sm">{targetGoalPct}%</span>
                  </div>

                  {neededContinuousForGoal > 0 ? (
                    <div className="pt-2 border-t border-slate-200 text-xs">
                      <span className="text-slate-500 block">Classes Needed:</span>
                      <div className="text-lg font-black text-indigo-900">
                        Attend {neededContinuousForGoal} continuous classes
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Without missing any upcoming periods to elevate your attendance from <strong>{simPct}%</strong> to <strong>{targetGoalPct}%</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-200 text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Target of {targetGoalPct}% already achieved!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BIET Autonomous Official Rules Reference Card */}
              <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs space-y-3 text-amber-950 shadow-xs">
                <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2 border-b border-amber-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>BIET Autonomous Attendance Regulations (BR24 &amp; R23)</span>
                </h4>
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-emerald-950 font-bold">75% and above:</strong>
                      <p className="text-amber-900">Eligible for Semester End Examinations (SEE) without fines or condonation requirements.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-amber-950 font-bold">65% to 74.9%:</strong>
                      <p className="text-amber-900">Condonation granted on valid medical grounds with Principal approval and prescribed fee payment.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-rose-950 font-bold">Below 65%:</strong>
                      <p className="text-amber-900">Detained (Not eligible for SEE, must repeat the semester in subsequent academic year).</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

