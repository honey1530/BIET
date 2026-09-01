import React, { useState } from 'react';
import { SAMPLE_STUDENTS } from '../../../../src/data/bietData';
import { StudentProfile } from '../../../../src/types';
import { Search, List, Grid, User, Eye, Download, CheckCircle2, ShieldAlert, Award, FileText, Phone, Mail } from 'lucide-react';

export const StudentDetailsView: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSection, setSelectedSection] = useState('3-CSE-A');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile>(SAMPLE_STUDENTS[0]);

  // Filter students based on branch, section & search keyword
  const filteredStudents = SAMPLE_STUDENTS.filter(st => {
    const matchesBranch = selectedBranch === 'ALL' || st.department === selectedBranch;
    const matchesKeyword = !searchKeyword.trim() || 
      st.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      st.htno.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesBranch && matchesKeyword;
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Select Criteria Panel (Matching Smart School Reference Image) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-serif border-b border-slate-800 pb-2">
          Select Criteria
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Class / Branch <span className="text-rose-400">*</span>
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500 font-semibold"
            >
              <option value="ALL">All Engineering Branches</option>
              <option value="CSE">CSE (Computer Science)</option>
              <option value="AIDS">AIDS (AI &amp; Data Science)</option>
              <option value="ECE">ECE (Electronics &amp; Comm)</option>
              <option value="EEE">EEE (Electrical &amp; Electronics)</option>
              <option value="ME">ME (Mechanical Engg)</option>
              <option value="CE">CE (Civil Engg)</option>
              <option value="MBA">MBA (Management)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500 font-semibold"
            >
              <option value="3-CSE-A">3-CSE-A Section</option>
              <option value="3-CSE-B">3-CSE-B Section</option>
              <option value="4-CSE-A">4-CSE-A Section</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Search By Keyword</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search By Student Name, Roll Number..."
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => {}}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all flex-shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tabbed View Switcher Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>

          <button
            onClick={() => setViewMode('details')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'details'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Details View</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-amber-400 font-bold">{filteredStudents.length}</strong> Student Records
        </span>
      </div>

      {/* 3. LIST VIEW TABLE */}
      {viewMode === 'list' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Admission / HTNO</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Branch &amp; Sec</th>
                  <th className="py-3.5 px-4">Father's Name</th>
                  <th className="py-3.5 px-4">CGPA</th>
                  <th className="py-3.5 px-4">Attendance %</th>
                  <th className="py-3.5 px-4">Mobile Number</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStudents.map((st) => (
                  <tr
                    key={st.id}
                    className={`hover:bg-slate-800/60 transition-colors ${
                      selectedStudent.id === st.id ? 'bg-purple-950/20 border-l-4 border-purple-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{st.htno}</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{st.name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded text-[11px]">
                        {st.yearSection}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">K. Satyanarayana</td>
                    <td className="py-3 px-4 font-bold text-slate-200">{st.cgpa} / 10.0</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        st.attendancePercentage >= 75
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {st.attendancePercentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{st.phone}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedStudent(st);
                          setViewMode('details');
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 shadow"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. DETAILS VIEW CARD */}
      {viewMode === 'details' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md">
          {/* Header Profile Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg border border-purple-400/30">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 font-serif">{selectedStudent.name}</h3>
                <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                  JNTUK HTNO: {selectedStudent.htno} • Regulation: {selectedStudent.regulation}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Department: <span className="font-semibold text-slate-200">{selectedStudent.department}</span> • Section: <span className="font-semibold text-slate-200">{selectedStudent.yearSection}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all">
                <Download className="w-4 h-4" />
                <span>Download Bonafide PDF</span>
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs border border-slate-700 transition-all">
                Print ID Card
              </button>
            </div>
          </div>

          {/* Academic Profile Details Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Academic Performance</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-amber-400">{selectedStudent.cgpa}</span>
                <span className="text-xs text-slate-400">/ 10.0 CGPA</span>
              </div>
              <p className="text-xs text-slate-400">Backlogs: <strong className="text-slate-200">{selectedStudent.backlogs}</strong></p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Biometric Attendance Log</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-emerald-400">{selectedStudent.attendancePercentage}%</span>
                <span className="text-xs text-emerald-500 font-bold">JNTUK Threshold: 75%</span>
              </div>
              <p className="text-xs text-slate-400">Status: <strong className="text-emerald-400">Exam Hall Ticket Eligible</strong></p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">AP JVD Scholarship Status</span>
              <div className="text-sm font-bold text-slate-100">{selectedStudent.jvdStatus}</div>
              <p className="text-xs text-slate-400">Tuition Fee Due: <strong className="text-emerald-400">₹{selectedStudent.dueFee} (Fully Paid)</strong></p>
            </div>
          </div>

          {/* Contact Details & Guardian Info */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
              Personal &amp; Guardian Contact Record
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Student Phone</span>
                <span className="font-bold text-slate-200 font-mono">{selectedStudent.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Student Email</span>
                <span className="font-bold text-slate-200">{selectedStudent.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Parent / Guardian Phone</span>
                <span className="font-bold text-amber-400 font-mono">{selectedStudent.parentPhone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
