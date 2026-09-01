import React, { useState } from 'react';
import { INITIAL_ATTENDANCE_LOGS, SAMPLE_STUDENTS } from '../../data/bietData';
import { AttendanceRecord } from '../../types';
import { Fingerprint, QrCode, CheckCircle2, AlertTriangle, MessageSquare, Send, UserCheck, ShieldCheck } from 'lucide-react';

export const AttendanceModule: React.FC = () => {
  const [logs, setLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_LOGS);
  const [selectedHtno, setSelectedHtno] = useState<string>('21A91A0501');
  const [scanMode, setScanMode] = useState<'Biometric Fingerprint' | 'QR Code'>('Biometric Fingerprint');
  const [whatsappPreview, setWhatsappPreview] = useState<string | null>(null);

  const handleSimulateScan = () => {
    const st = SAMPLE_STUDENTS.find(s => s.htno === selectedHtno);
    if (!st) return;

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      htno: st.htno,
      studentName: st.name,
      department: st.department,
      yearSection: st.yearSection,
      courseCode: 'R203102',
      date: new Date().toISOString().split('T')[0],
      status: 'PRESENT',
      mode: scanMode
    };

    setLogs([newRecord, ...logs]);
    alert(`Success! Attendance recorded for ${st.name} (${st.htno}) via ${scanMode}.`);
  };

  const handleGenerateParentWhatsappAlert = (htno: string) => {
    const st = SAMPLE_STUDENTS.find(s => s.htno === htno);
    if (!st) return;

    const msg = `[BHIMAVARAM INSTITUTE OF ENGINEERING & TECHNOLOGY - BIET]
Dear Parent,
Your ward ${st.name} (Hall Ticket: ${st.htno}, Dept: ${st.department}) has a current attendance of ${st.attendancePercentage}%, which is BELOW the mandatory JNTUK 75% threshold.

తెలుగు సందేశం:
గమనిక: భీమవరం ఇన్సిస్టిట్యూట్ ఆఫ్ ఇంజనీరింగ్ & టెక్నాలజీ (BIET) వారి సమాచారం ప్రకారము, మీ అబ్బాయి/అమ్మాయి ${st.name} గారి హాజరు శాతం ${st.attendancePercentage}% గా ఉన్నది (75% కంటే తక్కువ). క్రమంగా తరగతులకు హాజరు కావాలని కోరుచున్నాము.

Please contact HOD immediately.
- Principal, BIET Bhimavaram`;

    setWhatsappPreview(msg);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-amber-600" />
            <span>BIET Biometric Attendance &amp; QR Intelligence</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            TimescaleDB High-Throughput Attendance Stream Syncing with JNTUK 75% Shortage Engine
          </p>
        </div>

        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Biometric Hardware Daemon Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware Simulator Terminal */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-400 text-sm">Biometric Terminal Device #BVRM-04</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Authentication Mode:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setScanMode('Biometric Fingerprint')}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    scanMode === 'Biometric Fingerprint'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Fingerprint</span>
                </button>
                <button
                  onClick={() => setScanMode('QR Code')}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    scanMode === 'QR Code'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>QR Code</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Student Hall Ticket No:</label>
              <select
                value={selectedHtno}
                onChange={(e) => setSelectedHtno(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none"
              >
                {SAMPLE_STUDENTS.map(s => (
                  <option key={s.id} value={s.htno}>
                    {s.htno} - {s.name} ({s.department})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSimulateScan}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 fill-slate-950" />
              <span>Log Biometric Entry Now</span>
            </button>
          </div>
        </div>

        {/* Real-time Logs List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Real-Time Class Attendance Ledger</h3>
            <span className="text-xs text-slate-500 font-mono">Date: {new Date().toISOString().split('T')[0]}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                  <th className="p-3">Hall Ticket No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">WhatsApp Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-700">{log.htno}</td>
                    <td className="p-3 font-bold text-slate-900">{log.studentName}</td>
                    <td className="p-3 text-slate-600">{log.department}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.status === 'PRESENT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.status === 'ABSENT'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 font-medium">{log.mode}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleGenerateParentWhatsappAlert(log.htno)}
                        className="text-[11px] bg-slate-900 text-amber-300 hover:bg-slate-800 px-2.5 py-1 rounded font-semibold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3 text-amber-400" /> WhatsApp Draft
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {whatsappPreview && (
            <div className="mt-4 p-4 bg-emerald-950 text-emerald-100 rounded-xl space-y-2 border border-emerald-800 text-xs font-sans">
              <div className="flex items-center justify-between font-bold text-emerald-400 border-b border-emerald-800 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> BILINGUAL PARENT WHATSAPP ALERT PREVIEW
                </span>
                <button
                  onClick={() => setWhatsappPreview(null)}
                  className="text-[10px] text-emerald-300 hover:underline"
                >
                  Close
                </button>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed font-mono text-slate-200">
                {whatsappPreview}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
