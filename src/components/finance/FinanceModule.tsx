import React from 'react';
import { SAMPLE_STUDENTS } from '../../data/bietData';
import { IndianRupee, CheckCircle2, Clock, AlertTriangle, Download, Building2 } from 'lucide-react';

export const FinanceModule: React.FC = () => {
  const totalCollected = SAMPLE_STUDENTS.reduce((sum, s) => sum + (s.totalFee - s.dueFee), 0);
  const totalDue = SAMPLE_STUDENTS.reduce((sum, s) => sum + s.dueFee, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-emerald-600" />
            <span>BIET Finance &amp; JVD Scholarship Ledger</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Double-Entry Ledger &amp; AP Government Jagananna Vidya Deevena (JVD) Reconciliation
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            Reconciled: ₹{totalCollected.toLocaleString()}
          </span>
          <span className="bg-rose-50 text-rose-800 font-bold px-3 py-1.5 rounded-xl border border-rose-200">
            Pending JVD Govt Claim: ₹{totalDue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base font-serif">Student Fee &amp; JVD Disbursement Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                <th className="p-3">Hall Ticket No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Total Annual Fee</th>
                <th className="p-3">AP Govt JVD Status</th>
                <th className="p-3">Outstanding Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {SAMPLE_STUDENTS.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-amber-700">{st.htno}</td>
                  <td className="p-3 font-bold text-slate-900">{st.name}</td>
                  <td className="p-3 text-slate-600">{st.department}</td>
                  <td className="p-3 font-mono">₹{st.totalFee.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      st.jvdStatus === 'Disbursed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {st.jvdStatus}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-rose-600">
                    ₹{st.dueFee.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
