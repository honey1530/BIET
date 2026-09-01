import React from 'react';
import { LayoutDashboard, GraduationCap, Users, FileCheck2, Fingerprint, Briefcase, BookOpenCheck, IndianRupee, Bot, HeartHandshake, ShieldAlert, MessageCircle, Clock, Grid } from 'lucide-react';
import { UserRole } from '../types';

export type TabType =
  | 'dashboard'
  | 'student'
  | 'faculty'
  | 'exam_cell'
  | 'attendance'
  | 'daily_attendance'
  | 'placement'
  | 'lms'
  | 'finance'
  | 'parent'
  | 'interaction'
  | 'complaints'
  | 'cortex_ai';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentRole?: UserRole;
  onOpenGateway?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, currentRole, onOpenGateway }) => {
  const allTabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Executive Cockpit', icon: LayoutDashboard },
    { id: 'student', label: 'Student SIS Portal', icon: GraduationCap },
    { id: 'daily_attendance', label: 'Daily 7-Periods Attendance', icon: Clock },
    { id: 'interaction', label: 'Faculty Q&A Chat', icon: MessageCircle },
    { id: 'complaints', label: 'Complaints Box', icon: ShieldAlert },
    { id: 'faculty', label: 'Faculty Workstation', icon: Users },
    { id: 'exam_cell', label: 'JNTUK Exam Cell', icon: FileCheck2 },
    { id: 'attendance', label: 'Biometric Sync', icon: Fingerprint },
    { id: 'placement', label: 'Placement Cell', icon: Briefcase },
    { id: 'lms', label: 'LMS & Courseware', icon: BookOpenCheck },
    { id: 'finance', label: 'Fee & JVD Ledger', icon: IndianRupee },
    { id: 'parent', label: 'Parent Portal (తెలుగు)', icon: HeartHandshake },
    { id: 'cortex_ai', label: '10 AI Agents & Cortex', icon: Bot },
  ];

  // Map active role/view to full suite of relevant tabs so sub-nav bar never disappears
  const getTabsForRole = (role?: UserRole) => {
    if (!role) return allTabs;
    if (['student', 'daily_attendance', 'interaction', 'complaints'].includes(role)) {
      return allTabs.filter(t => ['student', 'daily_attendance', 'interaction', 'complaints', 'placement', 'lms', 'cortex_ai'].includes(t.id));
    }
    if (['faculty', 'hod', 'attendance'].includes(role)) {
      return allTabs.filter(t => ['faculty', 'attendance', 'interaction', 'lms', 'cortex_ai'].includes(t.id));
    }
    if (['principal', 'finance', 'exam_cell', 'placement_officer'].includes(role)) {
      return allTabs.filter(t => ['dashboard', 'student', 'faculty', 'exam_cell', 'placement', 'finance', 'cortex_ai'].includes(t.id));
    }
    if (role === 'parent') {
      return allTabs.filter(t => ['parent', 'daily_attendance', 'interaction', 'finance'].includes(t.id));
    }
    return allTabs;
  };

  const filteredTabs = getTabsForRole(currentRole);

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-300 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-2">
        <div className="flex items-center space-x-1">
          {onOpenGateway && (
            <button
              onClick={onOpenGateway}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all mr-2 flex-shrink-0"
              title="Return to BIET Portal Launchpad Gateway"
            >
              <Grid className="w-4 h-4" />
              <span>Switch Portal</span>
            </button>
          )}

          {filteredTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'hover:bg-slate-800 hover:text-amber-300 text-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
