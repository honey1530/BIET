import React, { useState } from 'react';
import { DepartmentCode, AuthSession } from '../../../src/types';
import { LoginPage } from '../../../src/components/auth/LoginPage';
import { BranchBar } from '../../../src/components/common/BranchBar';
import { PrincipalTopBar } from './components/PrincipalTopBar';
import { PrincipalSidebar, PrincipalMenuId } from './components/PrincipalSidebar';
import { ExecutiveDashboard } from '../../../src/components/dashboards/ExecutiveDashboard';
import { AdminManagementHub } from '../../../src/components/admin/AdminManagementHub';
import { FinanceModule } from '../../../src/components/finance/FinanceModule';
import { CortexAIHub } from '../../../src/components/ai/CortexAIHub';
import { ShieldCheck } from 'lucide-react';

export default function PrincipalStandaloneApp() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>('ALL');
  const [activeMenu, setActiveMenu] = useState<PrincipalMenuId>('admin_hub');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  if (!authSession) {
    return (
      <LoginPage
        appName="BIET Admin &amp; Principal Management Cockpit"
        role="principal"
        onLoginSuccess={(session) => setAuthSession(session)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Header Bar */}
      <PrincipalTopBar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        principalName={authSession.name}
        department={authSession.department}
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
      />

      {/* Main Body Layout: Left Expandable Sidebar + Right Workspace Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Collapsible Side Navigation Menu */}
        <PrincipalSidebar
          activeMenu={activeMenu}
          onSelectMenu={(menuId) => setActiveMenu(menuId)}
          principalName={authSession.name}
          department={authSession.department}
          isOpen={sidebarOpen}
          onLogout={() => setAuthSession(null)}
        />

        {/* Right Main Workspace Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {/* Breadcrumb Title Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                {activeMenu === 'admin_hub' && 'Super Admin User Management & Password Provisioning Hub'}
                {activeMenu === 'cockpit' && 'Executive Institutional Dashboard & Accreditation Cockpit'}
                {activeMenu === 'finance' && 'Institutional Revenue, Tuition Fee & JVD Ledger'}
                {activeMenu === 'ai' && 'BIET Cortex Text-to-SQL Natural Language AI Console'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Session: 2026-27 • UGC Autonomous Institution • NAAC Grade 'A'
              </p>
            </div>

            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3.5 py-1 rounded-full hidden sm:inline-block shadow-xs">
              Principal &amp; Executive Cockpit
            </span>
          </div>

          {/* Interactive Branch Filter Bar */}
          <BranchBar selectedDept={selectedDept} onDeptChange={setSelectedDept} />

          {/* Dynamic Component Rendering */}
          {activeMenu === 'admin_hub' && (
            <AdminManagementHub
              currentDept={selectedDept}
              onDeptChange={setSelectedDept}
            />
          )}

          {activeMenu === 'cockpit' && (
            <ExecutiveDashboard
              selectedDept={selectedDept}
              onDeptChange={setSelectedDept}
              onNavigateTab={() => {}}
            />
          )}

          {activeMenu === 'finance' && (
            <FinanceModule />
          )}

          {activeMenu === 'ai' && (
            <CortexAIHub />
          )}
        </main>
      </div>

      <footer className="bg-white text-slate-600 text-xs py-3 border-t border-slate-200 text-center shadow-xs">
        <p className="text-slate-900 font-bold">BIET Admin &amp; Principal Control Center v5.0 • Bhimavaram Institute of Engineering &amp; Technology (UGC Autonomous)</p>
      </footer>
    </div>
  );
}
