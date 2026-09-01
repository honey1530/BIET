import React, { useState } from 'react';
import { UserRole, DepartmentCode } from './types';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { BranchBar } from './components/common/BranchBar';
import { PortalGateway } from './components/gateway/PortalGateway';
import { ExecutiveDashboard } from './components/dashboards/ExecutiveDashboard';
import { StudentPortal } from './components/student/StudentPortal';
import { FacultyHub } from './components/faculty/FacultyHub';
import { ExamCell } from './components/exam/ExamCell';
import { AttendanceModule } from './components/attendance/AttendanceModule';
import { DailyAttendanceTracker } from './components/attendance/DailyAttendanceTracker';
import { PlacementPortal } from './components/placement/PlacementPortal';
import { LMSWorkspace } from './components/lms/LMSWorkspace';
import { FinanceModule } from './components/finance/FinanceModule';
import { ParentPortal } from './components/parent/ParentPortal';
import { FacultyStudentInteraction } from './components/interaction/FacultyStudentInteraction';
import { StudentComplaints } from './components/complaints/StudentComplaints';
import { CortexAIHub } from './components/ai/CortexAIHub';
import { MapPin } from 'lucide-react';

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
      case 'daily_attendance':
        setActiveTab('daily_attendance');
        break;
      case 'interaction':
        setActiveTab('interaction');
        break;
      case 'complaints':
        setActiveTab('complaints');
        break;
      case 'faculty':
      case 'hod':
        setActiveTab('faculty');
        break;
      case 'exam_cell':
        setActiveTab('exam_cell');
        break;
      case 'placement_officer':
        setActiveTab('placement');
        break;
      case 'parent':
        setActiveTab('parent');
        break;
      case 'finance':
        setActiveTab('finance');
        break;
      case 'attendance':
        setActiveTab('attendance');
        break;
      case 'lms':
        setActiveTab('lms');
        break;
      case 'cortex_ai':
        setActiveTab('cortex_ai');
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
      case 'daily_attendance':
        setActiveTab('daily_attendance');
        break;
      case 'interaction':
        setActiveTab('interaction');
        break;
      case 'complaints':
        setActiveTab('complaints');
        break;
      case 'faculty':
      case 'hod':
        setActiveTab('faculty');
        break;
      case 'exam_cell':
        setActiveTab('exam_cell');
        break;
      case 'placement_officer':
        setActiveTab('placement');
        break;
      case 'parent':
        setActiveTab('parent');
        break;
      case 'finance':
        setActiveTab('finance');
        break;
      case 'attendance':
        setActiveTab('attendance');
        break;
      case 'lms':
        setActiveTab('lms');
        break;
      case 'cortex_ai':
        setActiveTab('cortex_ai');
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
      case 'daily_attendance':
        setCurrentRole('daily_attendance');
        break;
      case 'interaction':
        setCurrentRole('interaction');
        break;
      case 'complaints':
        setCurrentRole('complaints');
        break;
      case 'faculty':
        setCurrentRole('faculty');
        break;
      case 'exam_cell':
        setCurrentRole('exam_cell');
        break;
      case 'placement':
        setCurrentRole('placement_officer');
        break;
      case 'parent':
        setCurrentRole('parent');
        break;
      case 'finance':
        setCurrentRole('finance');
        break;
      case 'attendance':
        setCurrentRole('attendance');
        break;
      case 'lms':
        setCurrentRole('lms');
        break;
      case 'cortex_ai':
        setCurrentRole('cortex_ai');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Institutional Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        onOpenAiHub={() => handleTabChange('cortex_ai')}
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

            {activeTab === 'exam_cell' && (
              <ExamCell />
            )}

            {activeTab === 'attendance' && (
              <AttendanceModule />
            )}

            {activeTab === 'placement' && (
              <PlacementPortal />
            )}

            {activeTab === 'lms' && (
              <LMSWorkspace />
            )}

            {activeTab === 'finance' && (
              <FinanceModule />
            )}

            {activeTab === 'parent' && (
              <ParentPortal />
            )}

            {activeTab === 'cortex_ai' && (
              <CortexAIHub />
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-amber-400 font-bold font-serif text-sm">
                Bhimavaram Institute of Engineering &amp; Technology (BIET)
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                EAMCET / ICET Code: BIET
              </span>
            </div>
            <p className="text-slate-400 text-xs flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Pennada, Bhimavaram, West Godavari Dist., Andhra Pradesh - 534243
            </p>
            <p className="text-slate-500 text-[11px]">
              Approved by AICTE New Delhi • Permanently Affiliated to JNTUK Kakinada • Accredited by NAAC &amp; NBA
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-1 text-slate-400 text-[11px]">
            <span className="text-amber-300 font-semibold">BIET Academic OS v5.0 (Server-Side Gemini API Powered)</span>
            <span>24/7 Support: principal@bietbvrm.ac.in | +91 8816 235466</span>
            <span className="text-slate-500">© 2026 Bhimavaram Institute of Engineering &amp; Technology. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
