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
      title: 'Faculty Workstation',
      icon: LayoutDashboard,
      items: [
        { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      key: 'academics',
      title: 'Classroom Roll-Call & SMS Alerts',
      icon: Clock,
      items: [
        { id: 'attendance', label: 'Period 1-7 Roll-Call & SMS Alerts', icon: Fingerprint },
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
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-900 flex flex-col flex-shrink-0 min-h-[calc(100vh-64px)] select-none shadow-xs">
      {/* Current Session Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-semibold">Session:</span>
          <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-200">
            2026-27 (AUTONOMOUS)
          </span>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {facultyName.charAt(0)}
          </div>
          <div className="overflow-hidden text-ellipsis">
            <span className="text-xs font-bold text-slate-900 block truncate">{facultyName}</span>
            <span className="text-[10px] text-indigo-700 font-mono font-bold block">{facultyId} • {department}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Faculty Workstation Menu
        </div>

        {menuSections.map(section => {
          const SectionIcon = section.icon;
          const isCatOpen = !!openCategories[section.key];
          const hasActiveItem = section.items.some(i => i.id === activeMenu);

          return (
            <div key={section.key} className="space-y-0.5">
              <button
                onClick={() => toggleCategory(section.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  hasActiveItem
                    ? 'text-indigo-700 bg-indigo-50'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <SectionIcon className={`w-4 h-4 ${hasActiveItem ? 'text-indigo-600' : 'text-slate-500'}`} />
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
                        onClick={() => onSelectMenu(item.id as any)}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <ItemIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
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

      {/* Sign Out Button */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-white hover:bg-rose-50 text-rose-700 font-bold border border-slate-200 rounded-xl text-xs transition-colors shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Workstation</span>
        </button>
      </div>
    </aside>
  );
};
