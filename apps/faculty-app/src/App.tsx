import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { FacultyTopBar } from './components/FacultyTopBar';
import { FacultySidebar, FacultyMenuId } from './components/FacultySidebar';
import { FacultyHub } from '../../../src/components/faculty/FacultyHub';
import { AttendanceModule } from '../../../src/components/attendance/AttendanceModule';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';
import { 
  Users, Fingerprint, LogOut, LayoutDashboard, Sparkles, ChevronRight, CheckCircle2 
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
                {activeMenu === 'attendance' && 'Classroom Attendance Marking & Sync'}
                {activeMenu === 'workstation' && 'Faculty Directory & Student Roster'}
                {activeMenu === 'ai_tutor' && 'BIET Cortex Faculty AI Workstation'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Session: 2026-27 • UGC Autonomous Institution • JNTUK Kakinada Affiliated Engine
              </p>
            </div>

            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3.5 py-1 rounded-full hidden sm:inline-block">
              {authSession.department} Department
            </span>
          </div>

          {/* 1. FACULTY DASHBOARD HOME */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Faculty Welcome Hero Box */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Academic Year 2026-2027 • UGC Autonomous</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-amber-300">
                      Welcome, {authSession.name}!
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Staff &amp; Faculty Portal for Bhimavaram Institute of Engineering &amp; Technology. Mark period-by-period daily classroom attendance, view department student rosters, and access faculty AI tools.
                    </p>
                  </div>

                  {/* Quick Faculty Stat Summary */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center min-w-[240px]">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Branch</span>
                      <span className="text-lg font-bold text-amber-400">{authSession.department}</span>
                    </div>
                    <div className="border-l border-slate-800 pl-4">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance Status</span>
                      <span className="text-lg font-bold text-emerald-400">Live Sync</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Feature Cards Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Faculty Management Portals</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Attendance Sync */}
                  <div
                    onClick={() => setActiveMenu('attendance')}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                        Periods 1-7
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                        Classroom Attendance Marking &amp; Sync
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Mark period-by-period daily attendance (Periods 1-7) &amp; sync biometric entry logs.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span>Mark Classroom Attendance</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Faculty Directory & Roster */}
                  <div
                    onClick={() => setActiveMenu('workstation')}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                        {authSession.department} Roster
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                        Faculty Directory &amp; Student Roster
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        View department faculty profiles, research publications &amp; enrolled student marks.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span>View Faculty Workstation</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Component Content Rendering */}
          {activeMenu === 'attendance' && <AttendanceModule />}
          {activeMenu === 'workstation' && <FacultyHub selectedDept={authSession.department} />}
          {activeMenu === 'ai_tutor' && <CortexAIHub />}
        </main>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-xs py-4 border-t border-slate-800 text-center">
        <p className="text-amber-400 font-bold">BIET Faculty Web App v5.0 • Bhimavaram Institute of Engineering &amp; Technology (UGC Autonomous)</p>
      </footer>
    </div>
  );
}
