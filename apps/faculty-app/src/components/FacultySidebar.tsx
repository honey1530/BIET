import React, { useState } from 'react';
import { 
  Users, Fingerprint, LayoutDashboard, ChevronDown, ChevronRight, 
  Sparkles, LogOut, BookOpen, Clock, Building2, UserCheck 
} from 'lucide-react';

export type FacultyMenuId =
  | 'dashboard'
  | 'attendance'
  | 'workstation'
  | 'ai_tutor';

interface FacultySidebarProps {
  activeMenu: FacultyMenuId;
  onSelectMenu: (menuId: FacultyMenuId) => void;
  facultyName: string;
  facultyId: string;
  department: string;
  isOpen: boolean;
  onLogout: () => void;
}

export const FacultySidebar: React.FC<FacultySidebarProps> = ({
  activeMenu,
  onSelectMenu,
  facultyName,
  facultyId,
  department,
  isOpen,
  onLogout
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    dashboard: true,
    academics: true,
    faculty: true,
    ai: true,
  });

  const toggleCategory = (catKey: string) => {
    setOpenCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const menuSections = [
    {
      key: 'dashboard',
      title: 'Faculty Navigation',
      icon: LayoutDashboard,
      items: [
        { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      key: 'academics',
      title: 'Attendance & Marking',
      icon: Clock,
      items: [
        { id: 'attendance', label: 'Classroom Attendance Sync', icon: Fingerprint },
      ]
    },
    {
      key: 'faculty',
      title: 'Department Roster',
      icon: Building2,
      items: [
        { id: 'workstation', label: 'Faculty Directory & Students', icon: Users },
      ]
    },
    {
      key: 'ai',
      title: 'BIET Cortex AI',
      icon: Sparkles,
      items: [
        { id: 'ai_tutor', label: 'Faculty AI Workstation', icon: Sparkles },
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-60px)] select-none">
      {/* Current Session Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">Session:</span>
          <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
            2026-27 (AUTONOMOUS)
          </span>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center shadow">
            {facultyName.charAt(0)}
          </div>
          <div className="overflow-hidden text-ellipsis">
            <span className="text-xs font-bold text-slate-100 block truncate">{facultyName}</span>
            <span className="text-[10px] text-amber-400 font-mono block">{facultyId} • {department}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Faculty Portal Navigation
        </div>

        {menuSections.map(section => {
          const SectionIcon = section.icon;
          const isCatOpen = !!openCategories[section.key];
          const hasActiveItem = section.items.some(i => i.id === activeMenu);

          return (
            <div key={section.key} className="space-y-0.5">
              <button
                onClick={() => toggleCategory(section.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  hasActiveItem
                    ? 'text-amber-300 bg-amber-500/10'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <SectionIcon className={`w-4 h-4 ${hasActiveItem ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{section.title}</span>
                </div>
                {isCatOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {isCatOpen && (
                <div className="pl-6 pr-1 space-y-0.5">
                  {section.items.map(item => {
                    const ItemIcon = item.icon;
                    const isSelected = activeMenu === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectMenu(item.id as FacultyMenuId)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <ItemIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Footer Button */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={onLogout}
          className="w-full bg-slate-850 hover:bg-rose-600/20 hover:text-rose-300 text-slate-400 border border-slate-800 hover:border-rose-500/40 font-bold px-3 py-2 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Faculty Portal</span>
        </button>
      </div>
    </aside>
  );
};
