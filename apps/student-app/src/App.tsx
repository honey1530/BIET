import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { StudentTopBar } from './components/StudentTopBar';
import { StudentSidebar, StudentMenuId } from './components/StudentSidebar';
import { StudentSelfProfileView } from './components/StudentSelfProfileView';
import { DailyAttendanceTracker } from '../../../src/components/attendance/DailyAttendanceTracker';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';

export default function StudentStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<StudentMenuId>('student_details');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Student Portal (UGC Autonomous)"
        role="student"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Executive Clean White Header Bar */}
      <StudentTopBar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        studentName={authSession.name}
        htno={authSession.username}
        department={authSession.department}
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
      />

      {/* Main Body Layout: Left Expandable Sidebar + Right Workspace Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Collapsible Clean White Sidebar */}
        <StudentSidebar
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
          studentName={authSession.name}
          htno={authSession.username}
          department={authSession.department}
          isOpen={sidebarOpen}
          onLogout={() => setAuthSession(null)}
        />

        {/* Right Main Workspace Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {/* Menu Title Breadcrumb Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                {activeMenu === 'student_details' && 'Student Details & Bio-Data'}
                {activeMenu === 'student_admission' && 'Academic Performance & Grade Sheet'}
                {activeMenu === 'sgpa_calculator' && 'SGPA, CGPA & Percentage Calculator (Subject-Wise & Cleared Backlogs Tracker)'}
                {activeMenu === 'fee_status' && 'Personal Fee Ledger & AP JVD Scholarship Status'}
                {activeMenu === 'attendance_log' && 'Daily 7-Periods Biometric Attendance Log'}
                {activeMenu === 'attendance_calculator' && 'Daily Attendance Target Calculator & Absence Simulator'}
                {activeMenu === 'ai_tutor' && 'BIET Cortex Student AI Academic Tutor'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Session: 2026-27 • UGC Autonomous Institution (BIET R23/R20)
              </p>
            </div>

            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3.5 py-1 rounded-full hidden sm:inline-block shadow-xs">
              {authSession.department} Branch
            </span>
          </div>

          {/* Dynamic Component Content Rendering */}
          {activeMenu === 'student_details' && (
            <StudentSelfProfileView
              studentHtno={authSession.username}
              studentName={authSession.name}
              department={authSession.department}
              initialSubTab="biodata"
            />
          )}

          {activeMenu === 'student_admission' && (
            <StudentSelfProfileView
              studentHtno={authSession.username}
              studentName={authSession.name}
              department={authSession.department}
              initialSubTab="marks"
            />
          )}

          {activeMenu === 'sgpa_calculator' && (
            <StudentSelfProfileView
              studentHtno={authSession.username}
              studentName={authSession.name}
              department={authSession.department}
              initialSubTab="calculator"
            />
          )}

          {activeMenu === 'fee_status' && (
            <StudentSelfProfileView
              studentHtno={authSession.username}
              studentName={authSession.name}
              department={authSession.department}
              initialSubTab="fee"
            />
          )}

          {activeMenu === 'attendance_log' && (
            <DailyAttendanceTracker
              initialSubTab="log"
              studentName={authSession.name}
              studentHtno={authSession.username}
              department={authSession.department}
            />
          )}

          {activeMenu === 'attendance_calculator' && (
            <DailyAttendanceTracker
              initialSubTab="calculator"
              studentName={authSession.name}
              studentHtno={authSession.username}
              department={authSession.department}
            />
          )}

          {activeMenu === 'ai_tutor' && (
            <CortexAIHub />
          )}
        </main>
      </div>

      <footer className="bg-white text-slate-500 text-xs py-3 border-t border-slate-200 text-center shadow-xs">
        <p className="text-slate-700 font-bold">BIET Student Web App v5.0 • Bhimavaram Institute of Engineering &amp; Technology (UGC Autonomous)</p>
      </footer>
    </div>
  );
}
