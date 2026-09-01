import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { Header } from '../../../src/components/Header';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { BranchBar } from '../../../src/components/common/BranchBar';
import { ExecutiveDashboard } from '../../../src/components/dashboards/ExecutiveDashboard';
import { AdminManagementHub } from '../../../src/components/admin/AdminManagementHub';
import { FinanceModule } from '../../../src/components/finance/FinanceModule';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';
import { LayoutDashboard, Users, IndianRupee, Bot, LogOut } from 'lucide-react';

export default function PrincipalStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'admin_hub' | 'cockpit' | 'finance' | 'ai'>('admin_hub');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Admin &amp; Principal Management Cockpit"
        role="principal"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  const principalTabs = [
    { id: 'admin_hub', label: 'Staff & Student Admin Hub', icon: Users },
    { id: 'cockpit', label: 'Executive Institutional Cockpit', icon: LayoutDashboard },
    { id: 'finance', label: 'Revenue & JVD Fee Ledger', icon: IndianRupee },
    { id: 'ai', label: 'Text-to-SQL Analytics AI', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      <Header
        currentRole="principal"
        onRoleChange={() => {}}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        onOpenAiHub={() => setActiveTab('ai')}
      />

      <div className="bg-white border-b border-slate-200 px-4 py-2.5 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600">Logged in as: <strong className="text-slate-900 font-bold">{authSession.name}</strong> (HOD / Principal / Super Admin)</span>
        </div>

        <button
          onClick={() => setAuthSession(null)}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-xl transition-colors border border-rose-200 flex items-center space-x-1 shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <nav className="bg-white border-b border-slate-200 text-slate-700 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 py-2 overflow-x-auto">
          <span className="bg-indigo-600 text-white font-black text-xs px-2.5 py-1.5 rounded-xl mr-2 uppercase tracking-wider flex-shrink-0 shadow-xs">
            Admin &amp; HOD App
          </span>
          {principalTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <BranchBar selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        {activeTab === 'admin_hub' && (
          <AdminManagementHub
            currentDept={selectedDept}
            onDeptChange={setSelectedDept}
          />
        )}
        {activeTab === 'cockpit' && (
          <ExecutiveDashboard
            selectedDept={selectedDept}
            onDeptChange={setSelectedDept}
            onNavigateTab={() => {}}
          />
        )}
        {activeTab === 'finance' && <FinanceModule />}
        {activeTab === 'ai' && <CortexAIHub />}
      </main>

      <footer className="bg-white text-slate-500 text-xs py-4 mt-12 border-t border-slate-200 text-center shadow-xs">
        <p className="text-slate-700 font-bold">BIET Admin &amp; HOD Management Portal v5.0 • UGC Autonomous Governance Engine</p>
      </footer>
    </div>
  );
}
