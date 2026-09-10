import React from 'react';
import { LayoutDashboard, GraduationCap, Users, HeartHandshake, Grid, Clock, MessageCircle, ShieldAlert, BookOpenCheck } from 'lucide-react';
import { UserRole } from '../types';

export type TabType =
  | 'dashboard'
  | 'student'
  | 'faculty'
  | 'parent'
  | 'daily_attendance'
  | 'interaction'
  | 'complaints'
  | 'lms';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentRole?: UserRole;
  onOpenGateway?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, currentRole, onOpenGateway }) => {
  const allTabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Admin & Principal App', icon: LayoutDashboard },
    { id: 'student', label: 'Student Web App', icon: GraduationCap },
    { id: 'faculty', label: 'Faculty Workstation', icon: Users },
    { id: 'parent', label: 'Parent Web App (తెలుగు)', icon: HeartHandshake },
    { id: 'daily_attendance', label: 'Daily 7-Periods Attendance', icon: Clock },
    { id: 'interaction', label: 'Faculty Q&A Chat', icon: MessageCircle },
    { id: 'complaints', label: 'Complaints Box', icon: ShieldAlert },
    { id: 'lms', label: 'LMS & Courseware', icon: BookOpenCheck },
  ];

  const getTabsForRole = (role?: UserRole) => {
    if (!role) return allTabs;
    if (['student', 'daily_attendance', 'interaction', 'complaints'].includes(role)) {
      return allTabs.filter(t => ['student', 'daily_attendance', 'interaction', 'complaints', 'lms'].includes(t.id));
    }
    if (['faculty', 'hod'].includes(role)) {
      return allTabs.filter(t => ['faculty', 'daily_attendance', 'interaction', 'lms'].includes(t.id));
    }
    if (['principal'].includes(role)) {
      return allTabs.filter(t => ['dashboard', 'student', 'faculty', 'parent'].includes(t.id));
    }
    if (role === 'parent') {
      return allTabs.filter(t => ['parent', 'daily_attendance', 'interaction'].includes(t.id));
    }
    return allTabs;
  };

  const filteredTabs = getTabsForRole(currentRole);

  return (
    <nav className="bg-white border-b border-slate-200 text-slate-700 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-2">
        <div className="flex items-center space-x-1">
          {onOpenGateway && (
            <button
              onClick={onOpenGateway}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all mr-2 flex-shrink-0 shadow-xs"
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
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
