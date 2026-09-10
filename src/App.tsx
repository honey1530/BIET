import React, { useState } from 'react';
import { UserRole, DepartmentCode } from './types';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { BranchBar } from './components/common/BranchBar';
import { PortalGateway } from './components/gateway/PortalGateway';
import { ExecutiveDashboard } from './components/dashboards/ExecutiveDashboard';
import { StudentPortal } from './components/student/StudentPortal';
import { FacultyHub } from './components/faculty/FacultyHub';
import { DailyAttendanceTracker } from './components/attendance/DailyAttendanceTracker';
import { LMSWorkspace } from './components/lms/LMSWorkspace';
import { ParentPortal } from './components/parent/ParentPortal';
import { FacultyStudentInteraction } from './components/interaction/FacultyStudentInteraction';
import { StudentComplaints } from './components/complaints/StudentComplaints';
import { MapPin, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isGatewayOpen, setIsGatewayOpen] = useState<boolean>(true); // Default to Portal Gateway Launchpad!
  const [currentRole, setCurrentRole] = useState<UserRole>('principal');
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleSelectPortalFromGateway = (role: UserRole) => {
    setCurrentRole(role);
    setIsGatewayOpen(false);
    switch (role) {
      case 'student':
        setActiveTab('student');
        break;
      case 'faculty':
      case 'hod':
        setActiveTab('faculty');
        break;
      case 'parent':
        setActiveTab('parent');
        break;
      default:
        setActiveTab('dashboard');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setIsGatewayOpen(false);
    switch (role) {
      case 'principal':
        setActiveTab('dashboard');
        break;
      case 'student':
        setActiveTab('student');
        break;
      case 'faculty':
      case 'hod':
        setActiveTab('faculty');
        break;
      case 'parent':
        setActiveTab('parent');
        break;
      default:
        setActiveTab('dashboard');
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsGatewayOpen(false);
    switch (tab) {
      case 'dashboard':
        setCurrentRole('principal');
        break;
      case 'student':
        setCurrentRole('student');
        break;
      case 'faculty':
        setCurrentRole('faculty');
        break;
      case 'parent':
        setCurrentRole('parent');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Institutional Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        onOpenAiHub={() => handleTabChange('dashboard')}
        onOpenGateway={() => setIsGatewayOpen(true)}
      />

      {/* Persona Filtered Navigation Tabs */}
      {!isGatewayOpen && (
        <Navigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentRole={currentRole}
          onOpenGateway={() => setIsGatewayOpen(true)}
        />
      )}

      {/* Page Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isGatewayOpen ? (
          <PortalGateway onSelectPortal={handleSelectPortalFromGateway} />
        ) : (
          <>
            {/* Interactive Branch / Department Filter Bar */}
            <BranchBar
              selectedDept={selectedDept}
              onDeptChange={setSelectedDept}
            />

            {activeTab === 'dashboard' && (
              <ExecutiveDashboard
                selectedDept={selectedDept}
                onDeptChange={setSelectedDept}
                onNavigateTab={handleTabChange}
              />
            )}

            {activeTab === 'student' && (
              <StudentPortal selectedDept={selectedDept} />
            )}

            {activeTab === 'daily_attendance' && (
              <DailyAttendanceTracker />
            )}

            {activeTab === 'interaction' && (
              <FacultyStudentInteraction />
            )}

            {activeTab === 'complaints' && (
              <StudentComplaints />
            )}

            {activeTab === 'faculty' && (
              <FacultyHub selectedDept={selectedDept} />
            )}

            {activeTab === 'lms' && (
              <LMSWorkspace />
            )}

            {activeTab === 'parent' && (
              <ParentPortal />
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs py-8 mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-slate-900 font-bold font-serif text-sm">
                Bhimavaram Institute of Engineering &amp; Technology (BIET)
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NAAC Grade 'A' • UGC Autonomous
              </span>
            </div>
            <p className="text-slate-600 text-xs flex items-center gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              Pennada, W.G.Dist., Andhra Pradesh - 534243 • Helpline: +91-630-128-8818
            </p>
            <p className="text-slate-500 text-[11px]">
              Approved by AICTE New Delhi • Permanently Affiliated to JNTUK Kakinada • Learn and Lead
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-1 text-slate-600 text-[11px] font-medium">
            <span className="text-indigo-700 font-bold">BIET Autonomous Academic OS v5.0</span>
            <span>Support: principal@bietbvrm.ac.in | +91-630-128-8818</span>
            <span className="text-slate-500">© 2026 Bhimavaram Institute of Engineering &amp; Technology. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
