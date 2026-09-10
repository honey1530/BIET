import React, { useState, useEffect } from 'react';
import { JNTUK_COURSES, SAMPLE_STUDENTS } from '../../data/bietData';
import { Course, DepartmentCode } from '../../types';
import { ClassTimetable } from '../attendance/DailyAttendanceTracker';
import { 
  Users, FileCheck, Sparkles, CheckCircle2, XCircle, Clock, AlertTriangle, 
  Send, Fingerprint, ShieldCheck, RefreshCw, Check, Smartphone, Calendar, FileText 
} from 'lucide-react';

interface FacultyHubProps {
  selectedDept?: DepartmentCode | 'ALL';
  initialTab?: 'attendance' | 'timetable';
}

export const FacultyHub: React.FC<FacultyHubProps> = ({ 
  selectedDept = 'ALL',
  initialTab = 'attendance'
}) => {
  const filteredCourses = (selectedDept && selectedDept !== 'ALL')
    ? JNTUK_COURSES.filter(c => c.department === selectedDept)
    : JNTUK_COURSES;

  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(
    filteredCourses.length > 0 ? filteredCourses[0].code : 'R203102'
  );
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'attendance' | 'timetable'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Roster Student Attendance List State (Present / Absent line-by-line roll call)
  const [roster, setRoster] = useState<Array<{
    id: string;
    htno: string;
    name: string;
    status: 'PRESENT' | 'ABSENT';
    parentPhone: string;
  }>>(
    SAMPLE_STUDENTS.map(s => ({
      id: s.id,
      htno: s.htno,
      name: s.name,
      status: 'PRESENT',
      parentPhone: s.parentPhone || '+91 94401 12345'
    }))
  );

  const [smsAlertsSent, setSmsAlertsSent] = useState<string[]>([]);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCourse: Course = filteredCourses.find(c => c.code === selectedCourseCode) || filteredCourses[0] || JNTUK_COURSES[0];

  const periodsList = [
    { no: 1, time: '09:30 AM - 10:25 AM' },
    { no: 2, time: '10:25 AM - 11:20 AM' },
    { no: 3, time: '11:30 AM - 12:25 PM' },
    { no: 4, time: '01:15 PM - 02:10 PM' },
    { no: 5, time: '02:10 PM - 03:05 PM' },
    { no: 6, time: '03:05 PM - 04:00 PM' },
    { no: 7, time: '04:00 PM - 04:45 PM' },
  ];

  // Toggle Roll-Call Student Status Line-wisely
  const toggleStudentStatus = (id: string) => {
    setRoster(prev => prev.map(s => s.id === id ? {
      ...s,
      status: s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT'
    } : s));
  };

  // Quick Mass Actions
  const setAllStatus = (status: 'PRESENT' | 'ABSENT') => {
    setRoster(prev => prev.map(s => ({ ...s, status })));
  };

  const presentCount = roster.filter(s => s.status === 'PRESENT').length;
  const absentCount = roster.filter(s => s.status === 'ABSENT').length;

  // Submit Period Attendance & Send Parent SMS Alerts
  const handleLockPeriodAttendance = () => {
    setIsSubmitting(true);
    setBiometricVerified(true);

    const absentees = roster.filter(s => s.status === 'ABSENT');
    const alerts: string[] = absentees.map(s => 
      `📱 SMS SENT to ${s.parentPhone} (Parent of ${s.name} - ${s.htno}): "BIET ALERT: Your ward ${s.name} was marked ABSENT for Period ${selectedPeriod} (${currentCourse.name}) today at ${periodsList[selectedPeriod - 1].time.split(' - ')[0]}. Contact BIET Office: +91-630-128-8818"`
    );

    setTimeout(() => {
      setSmsAlertsSent(alerts);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fadeIn selection:bg-indigo-600 selection:text-white">
      {/* Top Banner (Executive White Theme) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            BIET Faculty Workstation &amp; Classroom Attendance
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Sequential Period 1-7 Student Roll-Call, Biometric Stamp &amp; Instant Parent SMS Alerts
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-600">Active Course:</label>
            <select
              value={selectedCourseCode}
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              className="bg-slate-50 border border-slate-200 font-bold text-indigo-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:bg-white cursor-pointer"
            >
              {filteredCourses.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name} ({c.regulation})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sub-Tab Switcher: Only Roll-Call and Master Schedule */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center space-x-2 overflow-x-auto shadow-xs">
        {[
          { id: 'attendance', label: 'Period 1-7 Roll-Call & SMS Alerts', icon: Fingerprint },
          { id: 'timetable', label: 'Master Class Timetable', icon: Calendar },
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

      {/* TAB 2: MASTER CLASS TIMETABLE */}
      {activeTab === 'timetable' && (
        <ClassTimetable
          role="faculty"
          department={selectedDept !== 'ALL' ? selectedDept : 'CSE'}
          onNavigateToRollCall={(period, code) => {
            setSelectedPeriod(period);
            if (code) setSelectedCourseCode(code);
            setActiveTab('attendance');
          }}
        />
      )}

      {/* TAB 1: PERIOD 1-7 SEQUENTIAL ROLL-CALL & PARENT SMS ALERTS */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Period Selector & Roll Call List (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>Period-by-Period Classroom Roll-Call</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select period, count numbers line-wisely, and lock attendance to trigger instant SMS alerts to parents of absentees.
                </p>
              </div>

              {/* Period Selector Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                {periodsList.map(p => (
                  <button
                    key={p.no}
                    onClick={() => setSelectedPeriod(p.no)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedPeriod === p.no
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    P{p.no}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Info & Summary Header Bar */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  Period {selectedPeriod}: {periodsList[selectedPeriod - 1].time}
                </span>
                <span className="text-slate-500 text-[11px]">
                  Subject: <strong className="text-indigo-700">{currentCourse.name} ({currentCourse.code})</strong> • Dept: {currentCourse.department}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-lg">
                  Present: {presentCount}
                </span>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold px-2.5 py-1 rounded-lg">
                  Absent: {absentCount}
                </span>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-semibold">Click any student line to toggle Present / Absent:</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setAllStatus('PRESENT')}
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 font-bold px-3 py-1 rounded-lg transition-all"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => setAllStatus('ABSENT')}
                  className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 font-bold px-3 py-1 rounded-lg transition-all"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            {/* Sequential Roll Call List */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {roster.map((st, idx) => (
                <div
                  key={st.id}
                  onClick={() => toggleStudentStatus(st.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    st.status === 'PRESENT'
                      ? 'bg-white border-slate-200 hover:border-emerald-300'
                      : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center border border-slate-200">
                      {idx + 1}
                    </span>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{st.name}</span>
                        <span className="font-mono text-[11px] text-indigo-700 font-bold">
                          {st.htno}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">Parent Mobile: {st.parentPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {st.status === 'PRESENT' ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                        <XCircle className="w-3.5 h-3.5" /> ABSENT (SMS Triggered)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit & Lock Button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Faculty Biometric Verification Stamp: <strong>Required</strong>
              </span>

              <button
                type="button"
                onClick={handleLockPeriodAttendance}
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs disabled:opacity-50"
              >
                <Fingerprint className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying & Sending SMS...' : 'Lock Attendance & Send SMS Alerts'}</span>
              </button>
            </div>
          </div>

          {/* SMS Alerts & Biometric Verification Console (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Biometric Verification Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-indigo-700">
                <Fingerprint className="w-5 h-5" />
                <h4 className="font-bold text-slate-900 text-sm">Faculty Authorization Stamp</h4>
              </div>

              {biometricVerified ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Period {selectedPeriod} Attendance Verified &amp; Saved to DB!</span>
                </div>
              ) : (
                <p className="text-xs text-slate-600">
                  Click "Lock Attendance &amp; Send SMS Alerts" to stamp attendance for Period {selectedPeriod}.
                </p>
              )}
            </div>

            {/* SMS Parent Notification Console */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Parent SMS Alerts Dispatcher
                  </h4>
                </div>
                <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                  {absentCount} Absentees
                </span>
              </div>

              {smsAlertsSent.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {smsAlertsSent.map((msg, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                        <Send className="w-3 h-3" />
                        <span>Instant SMS Delivered</span>
                      </div>
                      <p className="font-mono text-slate-900 text-[10px] leading-relaxed">{msg}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center space-y-2 border-2 border-dashed border-slate-200 rounded-xl">
                  <Smartphone className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500">
                    No SMS alerts sent yet. Mark any student as ABSENT and lock attendance to trigger instant SMS alerts to parents.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
