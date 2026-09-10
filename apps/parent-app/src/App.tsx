import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { Header } from '../../../src/components/Header';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { ParentPortal } from '../../../src/components/parent/ParentPortal';
import { DailyAttendanceTracker } from '../../../src/components/attendance/DailyAttendanceTracker';
import { FacultyStudentInteraction } from '../../../src/components/interaction/FacultyStudentInteraction';
import { FinanceModule } from '../../../src/components/finance/FinanceModule';
import { HeartHandshake, Clock, MessageCircle, IndianRupee, LogOut } from 'lucide-react';

export default function ParentStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>('CSE');
  const [activeTab, setActiveTab] = useState<'parent' | 'attendance' | 'interaction' | 'finance'>('parent');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Parent Portal (తెలుగు / English)"
        role="parent"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  const parentTabs = [
    { id: 'parent', label: 'తెలుగు / English Overview', icon: HeartHandshake },
    { id: 'attendance', label: 'Daily 7-Periods Attendance', icon: Clock },
    { id: 'interaction', label: 'HOD Mentor WhatsApp Chat', icon: MessageCircle },
    { id: 'finance', label: 'JVD Fee Disbursement Ledger', icon: IndianRupee },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      <Header
        currentRole="parent"
        onRoleChange={() => {}}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        onOpenAiHub={() => {}}
      />

      <div className="bg-white border-b border-slate-200 px-4 py-2 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600">Logged in as Parent / Guardian: <strong className="text-slate-900 font-bold">{authSession.name}</strong></span>
        </div>

        <button
          onClick={() => setAuthSession(null)}
          className="bg-slate-100 hover:bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-xl text-xs transition-colors flex items-center space-x-1 border border-slate-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <nav className="bg-white border-b border-slate-200 text-slate-700 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 py-2 overflow-x-auto">
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-xs px-2.5 py-1 rounded-lg mr-2 uppercase tracking-wider flex-shrink-0">
            Parent Web App
          </span>
          {parentTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'parent' && <ParentPortal authSession={authSession} />}
        {activeTab === 'attendance' && <DailyAttendanceTracker />}
        {activeTab === 'interaction' && <FacultyStudentInteraction />}
        {activeTab === 'finance' && <FinanceModule />}
      </main>

      <footer className="bg-white text-slate-500 text-xs py-6 mt-12 border-t border-slate-200 text-center shadow-xs">
        <p className="text-slate-900 font-bold">BIET Parent Web App v5.0 • Bhimavaram Institute of Engineering &amp; Technology</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Pennada, W.G.Dist, AP - 534243 • Helpline: +91-630-128-8818</p>
      </footer>
    </div>
  );
}
