import React from 'react';
import { Menu, Search, Globe, IndianRupee, Bell, ShieldCheck } from 'lucide-react';

interface StudentTopBarProps {
  onToggleSidebar: () => void;
  studentName: string;
  htno: string;
  department: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const StudentTopBar: React.FC<StudentTopBarProps> = ({
  onToggleSidebar,
  studentName,
  htno,
  department,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 h-16 px-4 flex items-center justify-between shadow-xs z-20">
      {/* Left Section: Sidebar Toggle & Institutional Crest Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors focus:outline-none"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <img 
            src="/biet_logo.png" 
            alt="BIET Logo" 
            className="w-10 h-10 object-contain drop-shadow-xs" 
          />
          <div>
            <h1 className="text-sm font-bold font-serif text-slate-900 leading-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-[10px] text-indigo-700 font-bold">Pennada, W.G.Dist, AP • NAAC Grade 'A' • UGC Autonomous Institution</p>
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
            placeholder="Search student records, hall ticket number, or courses..."
            className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-xs pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 transition-colors placeholder-slate-400 shadow-inner"
          />
        </div>
      </div>

      {/* Right Section: Badges & Profile */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-700">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
          <span>INR</span>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-700">
          <Globe className="w-3.5 h-3.5 text-indigo-600" />
          <span>English</span>
        </div>

        <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1.5 right-1.5 animate-pulse" />
        </button>

        <div className="flex items-center space-x-2.5 border-l border-slate-200 pl-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-900 block">{studentName}</span>
            <span className="text-[10px] text-indigo-700 font-mono font-semibold">{htno} ({department})</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
            {studentName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
