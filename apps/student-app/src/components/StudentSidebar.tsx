import React, { useState } from 'react';
import { 
  GraduationCap, Clock, Bot, ChevronDown, ChevronRight, User, FileText, 
  CreditCard, Percent, Sparkles, LogOut, Calculator 
} from 'lucide-react';

export type StudentMenuId =
  | 'student_details'
  | 'student_admission'
  | 'sgpa_calculator'
  | 'fee_status'
  | 'attendance_log'
  | 'ai_tutor';

interface StudentSidebarProps {
  activeMenu: StudentMenuId;
  onSelectMenu: (menuId: StudentMenuId) => void;
  studentName: string;
  htno: string;
  department: string;
  isOpen: boolean;
  onLogout: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  activeMenu,
  onSelectMenu,
  studentName,
  htno,
  department,
  isOpen,
  onLogout
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    info: true,
    calculator: true,
    attendance: true,
    ai: true,
  });

  const toggleCategory = (catKey: string) => {
    setOpenCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const menuSections = [
    {
      key: 'info',
      title: 'Student Information',
      icon: GraduationCap,
      items: [
        { id: 'student_details', label: 'Student Bio-Data', icon: User },
        { id: 'student_admission', label: 'Academic Marks & Grades', icon: FileText },
        { id: 'fee_status', label: 'Fee & JVD Scholarship', icon: CreditCard },
      ]
    },
    {
      key: 'calculator',
      title: 'SGPA & CGPA Calculator',
      icon: Calculator,
      items: [
        { id: 'sgpa_calculator', label: 'SGPA, CGPA & Percentage Calculator', icon: Calculator },
      ]
    },
    {
      key: 'attendance',
      title: 'Attendance Management',
      icon: Clock,
      items: [
        { id: 'attendance_log', label: 'Daily 7-Periods Log', icon: Percent },
      ]
    },
    {
      key: 'ai',
      title: 'BIET Cortex AI',
      icon: Bot,
      items: [
        { id: 'ai_tutor', label: 'BIET Student AI Tutor', icon: Sparkles },
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-800 flex flex-col flex-shrink-0 min-h-[calc(100vh-64px)] select-none shadow-xs">
      {/* Current Academic Session Info Header Card */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Session</span>
          <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-200 text-[10px]">
            2026-27 (AUTONOMOUS)
          </span>
        </div>
        <div className="flex items-center space-x-2.5 pt-1">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {studentName.charAt(0)}
          </div>
          <div className="overflow-hidden text-ellipsis">
            <span className="text-xs font-bold text-slate-900 block truncate">{studentName}</span>
            <span className="text-[10px] text-slate-500 font-mono block">{htno} • {department}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {menuSections.map((sec) => {
          const SectionIcon = sec.icon;
          const isCategoryOpen = !!openCategories[sec.key];

          return (
            <div key={sec.key} className="space-y-1">
              <button
                onClick={() => toggleCategory(sec.key)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider hover:text-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-1.5">
                  <SectionIcon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{sec.title}</span>
                </div>
                {isCategoryOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>

              {isCategoryOpen && (
                <div className="space-y-0.5 pt-0.5">
                  {sec.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isSelected = activeMenu === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectMenu(item.id as any)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-white hover:bg-rose-50 text-rose-700 font-bold border border-slate-200 rounded-xl text-xs transition-colors shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Student Portal</span>
        </button>
      </div>
    </aside>
  );
};
