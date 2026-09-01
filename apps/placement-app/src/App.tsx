import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { Header } from '../../../src/components/Header';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { BranchBar } from '../../../src/components/common/BranchBar';
import { PlacementPortal } from '../../../src/components/placement/PlacementPortal';
import { StudentPortal } from '../../../src/components/student/StudentPortal';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';
import { Briefcase, GraduationCap, Bot, LogOut } from 'lucide-react';

export default function PlacementStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'placement' | 'students' | 'ai'>('placement');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Placement & Career Cell"
        role="placement_officer"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  const placementTabs = [
    { id: 'placement', label: 'Campus Placement Drives & CRM', icon: Briefcase },
    { id: 'students', label: 'Eligible Candidates List', icon: GraduationCap },
    { id: 'ai', label: 'AI Resume Matcher & Interview Coach', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      <Header
        currentRole="placement_officer"
        onRoleChange={() => {}}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        onOpenAiHub={() => setActiveTab('ai')}
      />

      <div className="bg-slate-950 text-white border-b border-slate-800 px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Logged in as: <strong className="text-amber-400 font-bold">{authSession.name}</strong> (Placement Officer)</span>
        </div>

        <button
          onClick={() => setAuthSession(null)}
          className="bg-rose-600/80 hover:bg-rose-600 text-white font-bold px-3 py-1 rounded-lg transition-colors flex items-center space-x-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <nav className="bg-slate-900 border-b border-slate-800 text-slate-300 px-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 py-2 overflow-x-auto">
          <span className="bg-amber-600 text-white font-bold text-xs px-2.5 py-1 rounded mr-2 uppercase tracking-wider flex-shrink-0">
            Placement Web App
          </span>
          {placementTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'hover:bg-slate-800 text-slate-300'
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
        <BranchBar selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        {activeTab === 'placement' && <PlacementPortal />}
        {activeTab === 'students' && <StudentPortal selectedDept={selectedDept} />}
        {activeTab === 'ai' && <CortexAIHub />}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-6 mt-12 border-t border-slate-800 text-center">
        <p className="text-amber-400 font-bold">BIET Placement Web App v5.0 • Corporate Recruitment Hub</p>
      </footer>
    </div>
  );
}
