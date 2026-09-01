import React, { useState } from 'react';
import { StudentComplaint } from '../../types';
import { SAMPLE_COMPLAINTS } from '../../data/bietData';
import { MessageSquarePlus, ShieldAlert, CheckCircle2, Clock, AlertTriangle, EyeOff, Tag, Search, Send, Sparkles, Filter, Lock } from 'lucide-react';

export const StudentComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<StudentComplaint[]>(SAMPLE_COMPLAINTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudentComplaint['category']>('Lab Equipment & Wifi');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredComplaints = complaints.filter(c => {
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNum = `BIET-CMP-${Math.floor(1000 + Math.random() * 9000)}`;
      const newComplaint: StudentComplaint = {
        id: `cmp_${Date.now()}`,
        ticketNo: ticketNum,
        htno: isAnonymous ? 'ANONYMOUS' : '21A91A0501',
        studentName: isAnonymous ? 'Anonymous Student' : 'Kolla Sai Teja',
        department: 'CSE',
        category,
        title,
        description,
        isAnonymous,
        priority,
        status: 'Submitted',
        createdAt: 'Just now',
        assignedTo: 'BIET Grievance Redressal Committee'
      };

      setComplaints([newComplaint, ...complaints]);
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
      setSuccessMsg(`Grievance ticket ${ticketNum} submitted successfully! BIET Committee has been notified.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 border border-rose-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-rose-500/20 border border-rose-400/40 rounded-2xl flex items-center justify-center text-rose-400 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-rose-300">
                BIET 24/7 Student Complaints &amp; Grievance Box
              </h2>
              <span className="bg-rose-500/20 text-rose-300 text-xs px-2.5 py-0.5 rounded-full border border-rose-500/30 font-semibold">
                Confidential &amp; Anti-Ragging Protected
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Submit issues regarding Academics, Labs, Hostels, Transport, Canteen, Safety, or Infrastructure with optional anonymity.
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Form + Complaints List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submit Complaint Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <MessageSquarePlus className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-base font-serif">Drop a Complaint / Grievance</h3>
          </div>

          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Grievance Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500"
              >
                <option value="Lab Equipment & Wifi">Lab Equipment &amp; Wi-Fi</option>
                <option value="Academics & Faculty">Academics &amp; Faculty</option>
                <option value="Hostel & Mess">Hostel &amp; Mess Facilities</option>
                <option value="Bus & Transport">Bus &amp; Transport Services</option>
                <option value="Canteen & Water">Canteen &amp; Drinking Water</option>
                <option value="Anti-Ragging & Safety">Anti-Ragging &amp; Campus Safety</option>
                <option value="Fee & Scholarships">Fee &amp; JVD Scholarships</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Complaint Title / Subject</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lab 3 Workstation restarting frequently..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Description &amp; Location</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the issue clearly (include room no, bus no, lab name, or specific incident details)..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <EyeOff className="w-3.5 h-3.5 text-rose-600" />
                  <span>Submit Anonymously</span>
                </label>
              </div>
            </div>

            {isAnonymous && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-900 flex items-center space-x-2 font-medium">
                <Lock className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>Your identity (Name &amp; HTNO) will be completely masked from the resolution team.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Ticket...' : 'Submit Grievance Ticket'}</span>
            </button>
          </form>
        </div>

        {/* Complaints Ticket Status List (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base font-serif">Grievance Tickets Tracker ({filteredComplaints.length})</h3>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ticket # or title..."
                  className="bg-slate-50 border border-slate-300 text-xs pl-8 pr-3 py-1.5 rounded-lg w-40 focus:outline-none focus:border-rose-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 px-2 py-1.5 rounded-lg focus:outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="Lab Equipment & Wifi">Lab &amp; Wi-Fi</option>
                <option value="Academics & Faculty">Academics</option>
                <option value="Hostel & Mess">Hostel &amp; Mess</option>
                <option value="Bus & Transport">Bus &amp; Transport</option>
                <option value="Anti-Ragging & Safety">Anti-Ragging</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredComplaints.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-rose-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs bg-slate-900 text-rose-400 px-2 py-0.5 rounded">
                      {c.ticketNo}
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    {c.isAnonymous && (
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Anonymous
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    c.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                  <span>Submitted: {c.createdAt} • Assigned: <strong className="text-slate-700">{c.assignedTo}</strong></span>
                  {c.resolutionRemarks && (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Remark: {c.resolutionRemarks}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
