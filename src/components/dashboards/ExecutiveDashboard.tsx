import React, { useState } from 'react';
import { DEPARTMENTS, SAMPLE_STUDENTS } from '../../data/bietData';
import { DepartmentCode, UserCredential } from '../../types';
import { getAllCredentials, bulkUploadUsers } from '../../data/db';
import { 
  Users, GraduationCap, Percent, Briefcase, ShieldCheck, CheckCircle2, Shield, 
  UserPlus, Upload, FileSpreadsheet, Download, Sparkles 
} from 'lucide-react';

interface ExecutiveDashboardProps {
  selectedDept: DepartmentCode | 'ALL';
  onDeptChange?: (dept: DepartmentCode | 'ALL') => void;
  onNavigateTab: (tab: any) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ selectedDept, onDeptChange }) => {
  // Super Admin Credentials Manager State
  const [credentialsList, setCredentialsList] = useState<UserCredential[]>(getAllCredentials());
  
  // Excel / CSV Upload State
  const [excelPasteText, setExcelPasteText] = useState('');
  const [excelTargetRole, setExcelTargetRole] = useState<UserCredential['role']>('student');
  const [excelTargetDept, setExcelTargetDept] = useState<DepartmentCode>('CSE');
  const [excelTempPass, setExcelTempPass] = useState('BIET@2026');

  // Single User Create Form State
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserCredential['role']>('student');
  const [newDept, setNewDept] = useState<DepartmentCode>('CSE');
  const [newEmail, setNewEmail] = useState('');
  const [singleTempPass, setSingleTempPass] = useState('BIET@2026');

  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string | null>(null);

  // Single User Provision Handler
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newName.trim()) return;

    const newUser: UserCredential = {
      username: newUsername.trim(),
      passwordHash: singleTempPass || 'BIET@2026',
      tempPassword: singleTempPass || 'BIET@2026',
      isFirstLogin: true,
      role: newRole,
      name: newName.trim(),
      department: newDept,
      email: newEmail.trim() || `${newUsername.toLowerCase()}@bietbvrm.ac.in`,
      phone: '+91 9848012345',
      htno: newRole === 'student' ? newUsername : undefined,
      facultyId: newRole === 'faculty' ? newUsername : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    bulkUploadUsers([newUser]);
    
    // Sync to Shared Server API
    try {
      fetch('/api/admin/users/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: [newUser] })
      }).catch(err => console.warn("Background API sync alert:", err));
    } catch (e) {
      // Ignore offline errors
    }

    setCredentialsList(getAllCredentials());
    setNewUsername('');
    setNewName('');
    setNewEmail('');
    setAdminSuccessMsg(`✅ Account saved to DB! User: ${newName} (${newUsername}) as ${newRole.toUpperCase()}. Default Pass: ${singleTempPass}`);
    setTimeout(() => setAdminSuccessMsg(null), 5000);
  };

  // Excel / CSV File & Paste Batch Save Handler
  const handleSaveExcelData = (e: React.FormEvent) => {
    e.preventDefault();
    const rawText = excelPasteText.trim();
    if (!rawText) {
      alert("Please paste rows from your Excel sheet (or upload a CSV file) first.");
      return;
    }

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const parsedUsers: UserCredential[] = [];

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      // Ignore header row if copied directly from Excel/CSV
      if (
        lower.includes('user_id') || 
        lower.includes('user id') || 
        lower.includes('htno') || 
        lower.includes('full_name') || 
        lower.includes('student_name') ||
        lower.includes('faculty_name')
      ) {
        return;
      }

      // Supports Tab-delimited (TSV), Comma-delimited (CSV), and Semicolon-delimited
      let delimiter = '\t';
      if (line.includes('\t')) delimiter = '\t';
      else if (line.includes(',')) delimiter = ',';
      else if (line.includes(';')) delimiter = ';';

      const parts = line
        .split(delimiter)
        .map(p => p.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);

      if (parts.length >= 2) {
        const id = parts[0];
        const name = parts[1];
        const email = parts[2] || `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}@bietbvrm.ac.in`;
        const phone = parts[3] || '+91 9848012345';

        if (id && name) {
          parsedUsers.push({
            username: id,
            passwordHash: excelTempPass || 'BIET@2026',
            tempPassword: excelTempPass || 'BIET@2026',
            isFirstLogin: true,
            role: excelTargetRole,
            name,
            department: excelTargetDept,
            email,
            phone,
            htno: excelTargetRole === 'student' ? id : undefined,
            facultyId: excelTargetRole === 'faculty' ? id : undefined,
            createdAt: new Date().toISOString().split('T')[0]
          });
        }
      }
    });

    if (parsedUsers.length === 0) {
      alert("No valid rows detected. Ensure columns match: User ID / HTNO, Full Name, Email Address, Phone Number");
      return;
    }

    // Persist/Save users directly to DB state
    bulkUploadUsers(parsedUsers);
    
    // Sync to Shared Server API
    try {
      fetch('/api/admin/users/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: parsedUsers })
      }).catch(err => console.warn("Background API sync alert:", err));
    } catch (e) {
      // Ignore offline errors
    }

    setCredentialsList(getAllCredentials());
    setAdminSuccessMsg(`🎉 Successfully saved ${parsedUsers.length} entries from Excel/CSV file into database! Default Password: ${excelTempPass}`);
    setTimeout(() => setAdminSuccessMsg(null), 6000);
  };

  // File Upload Reader for .csv / .tsv files
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setExcelPasteText(content);
      }
    };
    reader.readAsText(file);
  };

  // Download Sample Excel Template
  const downloadExcelTemplate = (role: 'student' | 'faculty') => {
    let csvData = "";
    if (role === 'student') {
      csvData = "User_ID_HTNO,Student_Full_Name,Email_Address,Parent_Phone_Number\n21A91A0501,Kolli Sai Teja,saiteja@bietbvrm.ac.in,9848012345\n21A91A0512,Gudimetla Navyasri,navyasri@bietbvrm.ac.in,9848098765\n21A91A0525,Penumatsa Varma,varma@bietbvrm.ac.in,9848011223\n21A91A0540,Kolla Bhavani,bhavani@bietbvrm.ac.in,9848033445";
    } else {
      csvData = "User_ID_FacultyID,Faculty_Full_Name,Email_Address,Contact_Phone_Number\nFAC-CSE-01,Dr. V. Rama Krishna (HOD),ramakrishna@bietbvrm.ac.in,9440123456\nFAC-CSE-02,Dr. G. Srinivas Rao,srinivas@bietbvrm.ac.in,9440654321\nFAC-ECE-01,Prof. K. Srimannarayana,sriman@bietbvrm.ac.in,9440998877";
    }

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biet_sample_${role}_excel_sheet.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Fill Sample Excel Data for Instant Testing
  const populateSampleExcelData = () => {
    const sample = excelTargetRole === 'student'
      ? "21A91A0588,Kolla Srinivas,srinivas.k@bietbvrm.ac.in,9848099881\n21A91A0589,Vaddi Anitha,anitha.v@bietbvrm.ac.in,9848099882\n21A91A0590,Grandhi Rajesh,rajesh.g@bietbvrm.ac.in,9848099883"
      : "FAC-CSE-08,Dr. P. Venkateswara Rao,venkat.p@bietbvrm.ac.in,9440887766\nFAC-CSE-09,Prof. M. Lakshmi,lakshmi.m@bietbvrm.ac.in,9440887767";
    setExcelPasteText(sample);
  };

  const filteredDepts = selectedDept === 'ALL'
    ? DEPARTMENTS
    : DEPARTMENTS.filter(d => d.code === selectedDept);

  const totalStudents = DEPARTMENTS.reduce((sum, d) => sum + d.studentCount, 0);
  const totalFaculty = DEPARTMENTS.reduce((sum, d) => sum + d.facultyCount, 0);
  const atRiskStudents = SAMPLE_STUDENTS.filter(s => s.attendancePercentage < 75);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{totalStudents.toLocaleString()}</span>
            <span className="text-xs text-emerald-600 font-medium ml-2">↑ 100% Enrolled</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across B.Tech &amp; MBA Streams</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty &amp; Staff</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{totalFaculty}</span>
            <span className="text-xs text-purple-600 font-medium ml-2">1:15 Faculty-Student</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Ph.D &amp; M.Tech Qualified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">84.2%</span>
            <span className="text-xs text-emerald-600 font-medium ml-2">Above JNTUK 75%</span>
          </div>
          <p className="text-xs text-amber-600 mt-1 font-medium">{atRiskStudents.length} Students At-Risk (&lt;75%)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Offers</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">128</span>
            <span className="text-xs text-emerald-600 font-medium ml-2">Highest 9.5 LPA</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">TCS, Infosys, Virtusa &amp; Accenture</p>
        </div>
      </div>

      {/* Super Admin User Provisioning & Password Management */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-900 text-amber-400 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Super Admin User Provisioning &amp; Password Management
              </h3>
              <p className="text-xs text-slate-500">
                Easily add individual user accounts or bulk import data directly from Excel sheets into the database.
              </p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Database Auto-Save Active
          </span>
        </div>

        {/* Success Alert Banner */}
        {adminSuccessMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fadeIn shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{adminSuccessMsg}</span>
          </div>
        )}

        {/* SAMPLE EXCEL FORMAT VISUAL GUIDE BOX */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-4 text-xs space-y-3 shadow-inner border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-amber-300">Sample Excel Format Guide (How to Prepare Your Sheet)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadExcelTemplate('student')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Student Excel (.csv)
              </button>
              <button
                type="button"
                onClick={() => downloadExcelTemplate('faculty')}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Faculty Excel (.csv)
              </button>
            </div>
          </div>

          <p className="text-slate-300 text-[11px]">
            To import data from Excel, ensure your columns match the 4 standard fields below. You can copy-paste directly from Microsoft Excel or upload a <code>.csv</code> file:
          </p>

          {/* Sample Format Visual Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] border border-slate-800 bg-slate-950/80 rounded-lg">
              <thead className="bg-slate-900 text-amber-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-2 border-r border-slate-800">Column A (User ID / HTNO)</th>
                  <th className="p-2 border-r border-slate-800">Column B (Full Name)</th>
                  <th className="p-2 border-r border-slate-800">Column C (Email Address)</th>
                  <th className="p-2">Column D (Phone Number)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-2 border-r border-slate-800 text-amber-300 font-bold">21A91A0501</td>
                  <td className="p-2 border-r border-slate-800 font-sans">Kolli Sai Teja</td>
                  <td className="p-2 border-r border-slate-800">saiteja@bietbvrm.ac.in</td>
                  <td className="p-2">9848012345</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-800 text-amber-300 font-bold">21A91A0512</td>
                  <td className="p-2 border-r border-slate-800 font-sans">Gudimetla Navyasri</td>
                  <td className="p-2 border-r border-slate-800">navyasri@bietbvrm.ac.in</td>
                  <td className="p-2">9848098765</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-800 text-purple-300 font-bold">FAC-CSE-01</td>
                  <td className="p-2 border-r border-slate-800 font-sans">Dr. V. Rama Krishna (HOD)</td>
                  <td className="p-2 border-r border-slate-800">ramakrishna@bietbvrm.ac.in</td>
                  <td className="p-2">9440123456</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel 1: Excel Sheet Import & Paste Form (6 Cols) */}
          <form onSubmit={handleSaveExcelData} className="lg:col-span-6 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Option 1: Excel Sheet Bulk Import &amp; Save
                </h4>
              </div>
              <button
                type="button"
                onClick={populateSampleExcelData}
                className="text-[10px] bg-amber-500/20 text-amber-900 hover:bg-amber-500 hover:text-slate-950 font-bold px-2 py-0.5 rounded border border-amber-500/30 transition-all flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Auto-Fill Sample Rows
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Target Account Type</label>
                <select
                  value={excelTargetRole}
                  onChange={(e) => setExcelTargetRole(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-2 py-1.5 focus:outline-none"
                >
                  <option value="student">Student Accounts</option>
                  <option value="faculty">Faculty Accounts</option>
                  <option value="parent">Parent Accounts</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Branch / Dept</label>
                <select
                  value={excelTargetDept}
                  onChange={(e) => setExcelTargetDept(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-2 py-1.5 focus:outline-none"
                >
                  <option value="CSE">CSE</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Default Password</label>
                <input
                  type="text"
                  value={excelTempPass}
                  onChange={(e) => setExcelTempPass(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs rounded-xl px-2 py-1.5 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Choose Excel (.csv / .txt) File</label>
              <input
                type="file"
                accept=".csv, .txt, .tsv"
                onChange={handleFileUpload}
                className="w-full bg-white border border-slate-300 text-xs text-slate-900 font-semibold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Or Paste Copied Excel / CSV Rows Directly
              </label>
              <textarea
                rows={5}
                value={excelPasteText}
                onChange={(e) => setExcelPasteText(e.target.value)}
                placeholder={"21A91A0501, Kolli Sai Teja, saiteja@bietbvrm.ac.in, 9848012345\n21A91A0512, Gudimetla Navyasri, navyasri@bietbvrm.ac.in, 9848098765"}
                className="w-full bg-white border border-slate-300 text-slate-900 font-mono font-semibold text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-500 shadow-inner selection:bg-amber-200 selection:text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-all flex items-center justify-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Save Excel Sheet Details into Database</span>
            </button>
          </form>

          {/* Panel 2: Single User Account Provision Form (6 Cols) */}
          <form onSubmit={handleCreateUser} className="lg:col-span-6 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Option 2: Single Account Provisioner
              </h4>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                Individual Account
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Use this form when you want to add a single student or faculty member manually without an Excel file.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Step 1: Select Account Role / Type
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="student">🎓 Student Account (Access Student Portal)</option>
                <option value="faculty">👨‍🏫 Faculty / Professor Account (Access Faculty Portal)</option>
                <option value="parent">👨‍👩‍👦 Parent Account (Access Parent Portal)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Step 2: User ID / HTNO
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder={newRole === 'student' ? 'e.g. 21A91A0599' : 'e.g. FAC-CSE-09'}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold rounded-xl px-3 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Step 3: Branch / Dept
                </label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="CSE">CSE (Computer Science)</option>
                  <option value="AIDS">AIDS (AI &amp; Data Sci)</option>
                  <option value="ECE">ECE (Electronics)</option>
                  <option value="EEE">EEE (Electrical)</option>
                  <option value="ME">ME (Mechanical)</option>
                  <option value="CE">CE (Civil)</option>
                  <option value="MBA">MBA Stream</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Step 4: Full Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Akula Suresh Reddy"
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Step 5: Assign Default Password
              </label>
              <input
                type="text"
                value={singleTempPass}
                onChange={(e) => setSingleTempPass(e.target.value)}
                placeholder="e.g. BIET@2026"
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold rounded-xl px-3 py-2 focus:outline-none"
                required
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                User will be prompted to change password on their first login.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Save &amp; Provision User Credentials</span>
            </button>
          </form>
        </div>

        {/* Saved Credentials Database Log */}
        <div className="space-y-3 border-t border-slate-200 pt-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>Saved Database Credentials Matrix ({credentialsList.length} Accounts)</span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Saved in Database</span>
          </h4>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {credentialsList.map((usr) => (
              <div key={usr.username} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded text-[11px]">
                      {usr.username}
                    </span>
                    <span className="font-bold text-slate-900">{usr.name}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                      {usr.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{usr.email} • {usr.department}</p>
                </div>

                <div className="flex items-center space-x-2">
                  {usr.isFirstLogin ? (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      Pending First Login (Temp Pass: {usr.tempPassword || usr.passwordHash})
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Saved &amp; Activated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BIET Academic Departments Matrix */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              BIET Academic Departments &amp; Accreditation Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Departmental breakdown across Pennada Bhimavaram campus
            </p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            JNTUK Regulation R20 &amp; R23
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepts.map((dept) => (
            <div
              key={dept.code}
              onClick={() => onDeptChange && onDeptChange(dept.code)}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {dept.code}
                </span>
                {dept.nbaAccredited ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> NBA Accredited
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                    NAAC Evaluated
                  </span>
                )}
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">{dept.name}</h4>
              <p className="text-xs text-slate-600">HOD: <span className="font-semibold text-slate-800">{dept.hod}</span></p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Students: <strong className="text-slate-800">{dept.studentCount}</strong></span>
                <span>Faculty: <strong className="text-slate-800">{dept.facultyCount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
