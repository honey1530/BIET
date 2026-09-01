import React from 'react';
import { UserRole, DepartmentCode } from '../types';
import { ShieldCheck, MapPin, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedDept: DepartmentCode | 'ALL';
  onDeptChange: (dept: DepartmentCode | 'ALL') => void;
  onOpenAiHub: () => void;
  onOpenGateway?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedDept,
  onDeptChange,
  onOpenAiHub,
}) => {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 shadow-xs sticky top-0 z-40">
      {/* Top Notification Banner */}
      <div className="bg-indigo-700 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="bg-white text-indigo-800 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">BIET OFFICIAL</span>
          <span>Pennada, W.G.Dist, AP - 534243 • Helpline: +91-630-128-8818</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Pennada, Bhimavaram</span>
          <span className="text-indigo-100 font-semibold">principal@bietbvrm.ac.in</span>
        </div>
      </div>

      {/* Main Institutional Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Emblem Logo */}
        <div className="flex items-center space-x-3.5">
          <img 
            src="/biet_logo.png" 
            alt="BIET Logo" 
            className="w-11 h-11 object-contain drop-shadow-xs" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 font-serif">
                Bhimavaram Institute of Engineering &amp; Technology
              </h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NAAC Grade 'A' • UGC Autonomous
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Affiliated to JNTUK Kakinada • Approved by AICTE New Delhi • Learn and Lead
            </p>
          </div>
        </div>

        {/* Quick Controls & Persona Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
            <span className="text-slate-500">Branch:</span>
            <select
              value={selectedDept}
              onChange={(e) => onDeptChange(e.target.value as DepartmentCode | 'ALL')}
              className="bg-transparent text-xs font-bold text-indigo-700 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-white text-slate-900">All Departments</option>
              <option value="CSE" className="bg-white text-slate-900">CSE (Computer Science)</option>
              <option value="AIDS" className="bg-white text-slate-900">AIDS (AI &amp; Data Sci)</option>
              <option value="ECE" className="bg-white text-slate-900">ECE (Electronics)</option>
              <option value="EEE" className="bg-white text-slate-900">EEE (Electrical)</option>
              <option value="ME" className="bg-white text-slate-900">ME (Mechanical)</option>
              <option value="CE" className="bg-white text-slate-900">CE (Civil)</option>
              <option value="MBA" className="bg-white text-slate-900">MBA (Management)</option>
            </select>
          </div>

          {/* AI Hub Direct Launcher */}
          <button
            onClick={onOpenAiHub}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>BIET Cortex AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
