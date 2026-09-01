import React from 'react';
import { Menu, Search, Bell, Globe, IndianRupee, User, ShieldCheck } from 'lucide-react';

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
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white h-15 px-4 flex items-center justify-between shadow-md z-20">
      {/* Left Section: Sidebar Toggle & Institutional Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors focus:outline-none"
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
            <h1 className="text-sm font-bold font-serif text-slate-100 leading-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-[10px] text-amber-400 font-semibold">Staff &amp; Faculty Portal • UGC Autonomous Institution</p>
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
            placeholder="Search Faculty Directory, Student Roster, Subject Codes..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-500"
          />
        </div>
      </div>

      {/* Right Section: Badges & Profile */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-300">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          <span>INR</span>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-300">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>English</span>
        </div>

        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-amber-400 rounded-full absolute top-1.5 right-1.5 animate-pulse" />
        </button>

        <div className="flex items-center space-x-2 border-l border-slate-800 pl-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-200 block">{facultyName}</span>
            <span className="text-[10px] text-amber-400 font-mono">{facultyId} ({department})</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow">
            {facultyName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
