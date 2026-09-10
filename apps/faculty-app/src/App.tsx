import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { FacultyTopBar } from './components/FacultyTopBar';
import { FacultySidebar, FacultyMenuId } from './components/FacultySidebar';
import { FacultyHub } from '../../../src/components/faculty/FacultyHub';
import { AttendanceModule } from '../../../src/components/attendance/AttendanceModule';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';
import { 
  Users, Fingerprint, LogOut, LayoutDashboard, Sparkles, ChevronRight, CheckCircle2, ShieldCheck 
} from 'lucide-react';

export default function FacultyStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<FacultyMenuId>('dashboard');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Staff &amp; Faculty Portal (UGC Autonomous)"
        role="faculty"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Smart School Style Top Header Bar */}
      <FacultyTopBar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        facultyName={authSession.name}
        facultyId={authSession.username}
        department={authSession.department}
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
      />

      {/* Main Body Layout: Left Expandable Sidebar + Right Workspace Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Collapsible Sidebar */}
        <FacultySidebar
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
          facultyName={authSession.name}
          facultyId={authSession.username}
          department={authSession.department}
          isOpen={sidebarOpen}
          onLogout={() => setAuthSession(null)}
        />

        {/* Right Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {/* Menu Title Breadcrumb Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                {activeMenu === 'dashboard' && 'Faculty Dashboard & Workstation Home'}
                {activeMenu === 'attendance' && 'Classroom Period 1-7 Roll-Call & Parent SMS Alerts'}
                {activeMenu === 'timetable' && 'Master Class Schedule & Timetable (Periods 1-7)'}
                {activeMenu === 'question_paper' && 'Bloom\'s Taxonomy AI Question Paper Studio'}
                {activeMenu === 'workstation' && 'Faculty Directory & Student Roster'}
                {activeMenu === 'ai_tutor' && 'BIET Cortex Faculty AI Workstation'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Session: 2026-27 • UGC Autonomous Institution (BIET R23/R20)
              </p>
            </div>

            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3.5 py-1 rounded-full hidden sm:inline-block">
              {authSession.department} Department
            </span>
          </div>

          {/* 1. FACULTY DASHBOARD HOME */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Faculty Welcome Hero Box (Clean White Theme) */}
              <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Academic Session 2026-2027 • NAAC Grade 'A' • UGC Autonomous</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">
                      Welcome, {authSession.name}!
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Staff &amp; Faculty Workstation for Bhimavaram Institute of Engineering &amp; Technology. Mark period-by-period daily classroom attendance, view department student rosters, manage timetables, and generate AI question papers.
                    </p>
                  </div>

                  {/* Quick Faculty Stat Summary */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center min-w-[240px] shadow-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Assigned Branch</span>
                      <span className="text-lg font-bold text-indigo-700">{authSession.department}</span>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Attendance Status</span>
                      <span className="text-lg font-bold text-emerald-700">Live Sync</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Feature Cards Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                  <span>Faculty Management Workstations</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Attendance Sync */}
                  <div
                    onClick={() => setActiveMenu('attendance')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-indigo-100">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        Periods 1-7 &amp; SMS
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        Period 1-7 Roll-Call &amp; Parent SMS Alerts
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Mark period-by-period daily student attendance &amp; trigger instant parent SMS alerts.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-indigo-700 font-bold">
                      <span>Start Classroom Roll-Call</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Master Class Timetable */}
                  <div
                    onClick={() => setActiveMenu('timetable')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-emerald-100">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-200">
                        Master Schedule
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        Master Class Schedule &amp; Timetable
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        View weekly assigned period slots, subject codes, faculty rooms &amp; interactive student timetable.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-indigo-700 font-bold">
                      <span>View Timetable</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: AI Question Paper Studio */}
                  <div
                    onClick={() => setActiveMenu('question_paper')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors border border-purple-100">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        Bloom's Taxonomy
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        Bloom's Question Paper Studio
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Generate AI-balanced Mid-1, Mid-2, and SEE question papers according to Bloom's taxonomy.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-indigo-700 font-bold">
                      <span>Open Question Paper Studio</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Component Content Rendering */}
          {activeMenu === 'attendance' && <FacultyHub selectedDept={authSession.department} initialTab="attendance" />}
          {activeMenu === 'timetable' && <FacultyHub selectedDept={authSession.department} initialTab="timetable" />}
          {activeMenu === 'question_paper' && <FacultyHub selectedDept={authSession.department} initialTab="paper" />}
          {activeMenu === 'workstation' && <FacultyHub selectedDept={authSession.department} initialTab="roster" />}
          {activeMenu === 'ai_tutor' && <CortexAIHub />}
        </main>
      </div>

      <footer className="bg-white text-slate-600 text-xs py-4 border-t border-slate-200 text-center shadow-xs">
        <p className="text-slate-900 font-bold">BIET Faculty Web App v5.0 • Bhimavaram Institute of Engineering &amp; Technology (UGC Autonomous)</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Pennada, W.G.Dist, AP - 534243 • Helpline: +91-630-128-8818</p>
      </footer>
    </div>
  );
}
