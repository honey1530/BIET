import React, { useState } from 'react';
import { DepartmentCode, UserCredential } from '../../types';
import { getAllCredentials } from '../../data/db';
import { 
  Users, GraduationCap, CheckCircle2, Search, ExternalLink, Download, KeyRound, Eye, EyeOff 
} from 'lucide-react';

interface AdminManagementHubProps {
  currentDept?: DepartmentCode | 'ALL';
  onDeptChange?: (dept: DepartmentCode | 'ALL') => void;
}

export const AdminManagementHub: React.FC<AdminManagementHubProps> = ({
  currentDept = 'ALL',
  onDeptChange
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'staff'>('students');
  const [selectedDept, setSelectedDept] = useState<DepartmentCode | 'ALL'>(currentDept);
  const [selectedYearSem, setSelectedYearSem] = useState<string>('3-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPasswords, setShowPasswords] = useState<boolean>(true);

  // Live Database Credentials
  const [credentialsList] = useState<UserCredential[]>(getAllCredentials());
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  // Filter Students
  const studentCredentials = credentialsList.filter(u => u.role === 'student');
  const filteredStudents = studentCredentials.filter(s => {
    const matchesDept = selectedDept === 'ALL' || s.department === selectedDept;
    const matchesSearch = !searchQuery || 
      s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Filter Staff & Faculty
  const staffCredentials = credentialsList.filter(u => u.role === 'faculty' || u.role === 'principal');
  const filteredStaff = staffCredentials.filter(f => {
    const matchesDept = selectedDept === 'ALL' || f.department === selectedDept;
    const matchesSearch = !searchQuery || 
      f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Download All Credentials & Generated Passwords Directory CSV
  const exportCredentialsCsv = (type: 'students' | 'staff') => {
    const list = type === 'students' ? studentCredentials : staffCredentials;
    let csv = "User_ID,Full_Name,Role,Department,Email,Phone,Generated_Password,Account_Status\n";
    list.forEach(u => {
      const pass = u.tempPassword || u.passwordHash;
      const status = u.isFirstLogin ? "Pending Activation" : "Activated";
      csv += `"${u.username}","${u.name}","${u.role}","${u.department}","${u.email}","${u.phone}","${pass}","${status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biet_${type}_credentials_and_passwords_directory.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('success', `Exported full ${type.toUpperCase()} Credentials & Passwords directory CSV!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn selection:bg-indigo-600 selection:text-white">
      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn ${
          notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* 2 Simple Tabs: Students Details & Faculty Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center justify-between overflow-x-auto shadow-xs">
        <div className="flex items-center space-x-2">
          {[
            { id: 'students', label: `Students Details (${studentCredentials.length})`, icon: GraduationCap },
            { id: 'staff', label: `Faculty Details & HODs (${staffCredentials.length})`, icon: Users },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 mr-2">
          <button
            onClick={() => exportCredentialsCsv(activeTab)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export {activeTab.toUpperCase()} (CSV)</span>
          </button>
          <button
            onClick={() => setShowPasswords(!showPasswords)}
            className="bg-slate-100 hover:bg-slate-200 text-indigo-700 border border-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPasswords ? 'Hide Passwords' : 'Show Passwords'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: STUDENTS DETAILS MATRIX */}
      {activeTab === 'students' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Select Branch:</label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value as any);
                    if (onDeptChange) onDeptChange(e.target.value as any);
                  }}
                  className="bg-slate-50 border border-slate-200 text-indigo-700 font-bold rounded-xl px-3 py-2 focus:outline-none focus:bg-white cursor-pointer"
                >
                  <option value="ALL">All Branches</option>
                  <option value="CSE">CSE Branch</option>
                  <option value="AIDS">AIDS Branch</option>
                  <option value="ECE">ECE Branch</option>
                  <option value="EEE">EEE Branch</option>
                  <option value="ME">ME Branch</option>
                  <option value="CE">CE Branch</option>
                  <option value="MBA">MBA Stream</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-1">Select Semester:</label>
                <select
                  value={selectedYearSem}
                  onChange={(e) => setSelectedYearSem(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl px-3 py-2 focus:outline-none focus:bg-white cursor-pointer"
                >
                  <option value="1-1">1st Year / Sem 1-1</option>
                  <option value="1-2">1st Year / Sem 1-2</option>
                  <option value="2-1">2nd Year / Sem 2-1</option>
                  <option value="2-2">2nd Year / Sem 2-2</option>
                  <option value="3-1">3rd Year / Sem 3-1</option>
                  <option value="3-2">3rd Year / Sem 3-2</option>
                  <option value="4-1">4th Year / Sem 4-1</option>
                  <option value="4-2">4th Year / Sem 4-2</option>
                </select>
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Student HTNO or Name..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 font-semibold"
              />
            </div>
          </div>

          {/* Student Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Student Name &amp; HTNO</th>
                  <th className="py-3.5 px-4">Branch &amp; Sem</th>
                  <th className="py-3.5 px-4">Generated Password</th>
                  <th className="py-3.5 px-4">Email &amp; Contact</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((st) => (
                  <tr key={st.username} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{st.name}</span>
                          <span className="text-[11px] text-indigo-700 font-mono font-bold">{st.htno || st.username}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-lg border border-indigo-200 font-bold">
                        {st.department} ({selectedYearSem})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      {showPasswords ? (
                        <span className="bg-slate-100 text-indigo-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold">
                          {st.tempPassword || st.passwordHash}
                        </span>
                      ) : (
                        <span className="text-slate-400">••••••••</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span>{st.email}</span>
                      <span className="block text-[11px] text-slate-500 font-mono">Parent: {st.phone}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {st.isFirstLogin ? (
                        <span className="bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] border border-amber-200 font-bold">
                          Pending Activation
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200 font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Activated
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => showToast('success', `Promoted ${st.name} (${st.username}) to Next Semester!`)}
                        className="bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs transition-all border border-slate-200 shadow-xs"
                      >
                        Promote Sem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: FACULTY & STAFF DETAILS */}
      {activeTab === 'staff' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Faculty &amp; HOD Details</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Faculty directory, email, department, generated passwords, and HOD appointments</p>
            </div>

            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3 py-1 rounded-full">
              {filteredStaff.length} Faculty Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStaff.map((f) => (
              <div key={f.username} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-indigo-300 transition-colors shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {f.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                      <p className="text-xs text-indigo-700 font-mono font-bold">{f.username} • {f.department} Department</p>
                    </div>
                  </div>

                  {f.name.includes('HOD') ? (
                    <span className="bg-indigo-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      HEAD OF DEPT (HOD)
                    </span>
                  ) : (
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                      FACULTY MEMBER
                    </span>
                  )}
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="space-y-0.5">
                    <span>Email: <strong className="text-slate-900">{f.email}</strong></span>
                    <div className="text-[11px]">
                      Generated Password:{' '}
                      {showPasswords ? (
                        <strong className="text-indigo-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                          {f.tempPassword || f.passwordHash}
                        </strong>
                      ) : (
                        <span className="text-slate-400">••••••••</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('success', `Assigned HOD leadership for ${f.department} to ${f.name}`)}
                    className="text-indigo-700 font-bold hover:underline"
                  >
                    Set as HOD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
