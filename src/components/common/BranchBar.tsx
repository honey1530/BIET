import React from 'react';
import { DepartmentCode } from '../../types';
import { DEPARTMENTS } from '../../data/bietData';
import { Building2, ShieldCheck, Layers } from 'lucide-react';

interface BranchBarProps {
  selectedDept: DepartmentCode | 'ALL';
  onDeptChange: (dept: DepartmentCode | 'ALL') => void;
}

export const BranchBar: React.FC<BranchBarProps> = ({ selectedDept, onDeptChange }) => {
  const currentDeptInfo = selectedDept === 'ALL'
    ? null
    : DEPARTMENTS.find(d => d.code === selectedDept);

  return (
    <div className="space-y-4 mb-6">
      {/* Quick Interactive Branch Selector Pills */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider px-2 flex items-center gap-1.5 flex-shrink-0">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>Branch Filter:</span>
        </span>

        <button
          onClick={() => onDeptChange('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedDept === 'ALL'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🌐 All Branches (BIET Overall)
        </button>

        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.code}
            onClick={() => onDeptChange(dept.code)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              selectedDept === dept.code
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <span>{dept.code}</span>
            {dept.nbaAccredited && (
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                selectedDept === dept.code ? 'bg-white text-indigo-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                NBA
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected Branch Overview Banner (When a specific branch is selected) */}
      {currentDeptInfo ? (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-300/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-indigo-600 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                BRANCH: {currentDeptInfo.code}
              </span>
              <h3 className="text-lg md:text-xl font-bold font-serif text-white">
                Department of {currentDeptInfo.name}
              </h3>
              {currentDeptInfo.nbaAccredited && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NBA Accredited Department
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-4">
              <span>HOD: <strong className="text-white font-semibold">{currentDeptInfo.hod}</strong></span>
              <span>•</span>
              <span>Affiliation: <strong className="text-amber-300">JNTUK Kakinada (R20 &amp; R23)</strong></span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-300 font-bold block uppercase">Enrolled Students</span>
              <span className="text-base font-extrabold text-amber-300">{currentDeptInfo.studentCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-300 font-bold block uppercase">Faculty Members</span>
              <span className="text-base font-extrabold text-amber-300">{currentDeptInfo.facultyCount}</span>
            </div>
            <button
              onClick={() => onDeptChange('ALL')}
              className="text-xs text-slate-200 hover:text-white bg-white/20 hover:bg-white/30 px-3.5 py-2 rounded-xl border border-white/20 transition-all font-semibold"
            >
              Clear Filter
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-3 px-4 flex items-center justify-between text-xs text-slate-700 shadow-xs">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Viewing BIET Institution-Wide Overview (All 7 Engineering &amp; MBA Departments)</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">Click any branch pill above to filter views by department</span>
        </div>
      )}
    </div>
  );
};
