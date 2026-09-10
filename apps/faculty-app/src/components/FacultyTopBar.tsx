import React from 'react';
import { Menu, Search, Bell, Globe, User, ShieldCheck } from 'lucide-react';

interface FacultyTopBarProps {
  onToggleSidebar: () => void;
  facultyName: string;
  facultyId: string;
  department: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const FacultyTopBar: React.FC<FacultyTopBarProps> = ({
  onToggleSidebar,
  facultyName,
  facultyId,
  department,
  searchQuery,
  onSearchChange
}) => {
  const getInitials = (name: string) => {
    if (!name) return 'FC';
    const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim();
    const parts = cleanName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return cleanName.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 h-16 px-4 flex items-center justify-between shadow-xs z-20">
      {/* Left Section: Sidebar Toggle & Institutional Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors focus:outline-none border border-slate-200"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5">
          <img 
            src="/biet_logo.png" 
            alt="BIET Logo" 
            className="w-10 h-10 object-contain drop-shadow-xs" 
          />
          <div>
            <h1 className="text-sm font-bold font-serif text-slate-900 leading-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-[10px] text-indigo-700 font-bold">Staff &amp; Faculty Workstation • NAAC Grade 'A' • UGC Autonomous</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Student HTNO, Subject, or Classroom Roster..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 font-medium"
          />
        </div>
      </div>

      {/* Right Section: User Profile Pill */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {getInitials(facultyName)}
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-slate-900 block leading-tight">{facultyName}</span>
            <span className="text-[10px] text-indigo-700 font-mono font-bold block">{facultyId} • {department}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
