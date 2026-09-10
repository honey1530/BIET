import React, { useState } from 'react';
import { ShieldAlert, HeartHandshake, PhoneCall, MessageSquare, AlertTriangle, CheckCircle2, Calendar, FileText, IndianRupee, Clock, ArrowRight, Globe } from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Language Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-400 shadow-inner">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-amber-300 font-serif">
                {lang === 'te' ? 'బి.ఐ.ఈ.టి తల్లిదండ్రుల పోర్టల్ (Parent Portal)' : 'BIET Parent Monitoring Portal'}
              </h2>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {lang === 'te' ? 'లైవ్ వాట్సాప్ నోటిఫికేషన్లు' : 'Live WhatsApp Push Sync'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {lang === 'te'
                ? 'భీమవరం ఇంజనీరింగ్ కాలేజ్ - విద్యార్థి హాజరు, మార్కులు మరియు ఫీజు తాజా సమాచారం'
                : 'Real-time BIET Autonomous attendance alerts, mid-exam results, and fee status for your child.'}
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <Globe className="w-4 h-4 text-amber-400 ml-2 mr-1" />
          <button
            onClick={() => setLang('te')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              lang === 'te' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              lang === 'en' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Child Information Profile Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-900 text-amber-400 font-bold rounded-2xl flex items-center justify-center text-xl shadow-md border border-slate-800">
            KS
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Kolli Sai Teja (కొల్లి సాయి తేజ)</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">HTNO: 21B81A0501</span>
              <span>•</span>
              <span>3rd Year B.Tech CSE (Section A)</span>
              <span>•</span>
              <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">BIET R20</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'te' ? 'తండ్రి పేరు: కె. సత్యనారాయణ (9848012345)' : 'Guardian: K. Satyanarayana (+91 98480 12345)'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-col gap-2 text-right">
          <a
            href="https://wa.me/919848012345"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'te' ? 'మెంటర్ తో వాట్సాప్ చాట్' : 'WhatsApp Mentor (HOD)'}</span>
          </a>
          <button className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-300 transition-all">
            <PhoneCall className="w-4 h-4 text-amber-600" />
            <span>{lang === 'te' ? 'హెల్ప్‌డెస్క్ కు కాల్ చేయండి' : 'Call BIET Helpline'}</span>
          </button>
        </div>
      </div>

      {/* Critical BIET 75% Attendance Warning Alert */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-bold flex-shrink-0 mt-1">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-amber-900">
                {lang === 'te' ? 'BIET 75% హాజరు హెచ్చరిక (Low Attendance Warning)' : 'BIET Attendance Alert (75% Threshold)'}
              </h4>
              <span className="bg-amber-200 text-amber-900 font-bold text-xs px-2 py-0.5 rounded">
                71.43% Current
              </span>
            </div>
            <p className="text-xs text-amber-950 font-medium leading-relaxed mt-2">
              {lang === 'te'
                ? 'మీ అబ్బాయి సాయి తేజ ప్రస్తుత హాజరు 71.43% ఉంది. BIET స్వయంప్రతిపత్తి (Autonomous) నిబంధనల ప్రకారం 75% చేరుకోవడానికి రాబోయే 8 రోజులు వరుసగా తరగతులకు తప్పనిసరిగా హాజరు కావాలి. లేనిచో పరీక్షల రాయడానికి ఫైన్ (Condonation Fee) చెల్లించాల్సి ఉంటుంది.'
                : 'Sai Teja\'s attendance is currently 71.43% (Below the 75% mandatory BIET Autonomous limit). He must attend the next 8 consecutive classes without absence to avoid exam detention or condonation fees.'}
            </p>
          </div>
        </div>
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-3 text-center min-w-[140px] flex-shrink-0">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">Required Target</span>
          <span className="text-xl font-black text-amber-900">8 Classes</span>
          <span className="text-[11px] font-medium text-amber-700 block">Consecutive</span>
        </div>
      </div>

      {/* Grid Layout for Parent Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BIET Mid Exam Marks Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'te' ? 'మిడ్-1 పరీక్షల మార్కులు (Mid-1 Exam Marks)' : 'BIET Autonomous B.Tech III-I Mid-1 Marks'}
              </h4>
            </div>
            <span className="text-xs text-slate-500">Max: 30 Marks</span>
          </div>

          <div className="space-y-3">
            {[
              { subject: 'Database Management Systems (DBMS)', code: 'R2031051', marks: 27, status: 'Passed' },
              { subject: 'Web Technologies & Frameworks', code: 'R2031052', marks: 25, status: 'Passed' },
              { subject: 'Operating Systems & Linux', code: 'R2031053', marks: 28, status: 'Passed' },
              { subject: 'AI & Data Mining Principles', code: 'R2031054', marks: 24, status: 'Passed' },
            ].map((sub, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{sub.subject}</h5>
                  <span className="text-[10px] text-slate-500 font-mono">{sub.code}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-amber-700">{sub.marks} / 30</span>
                  <span className="text-[10px] text-emerald-600 font-bold block flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AP JVD Scholarship & Fee Payment Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <IndianRupee className="w-5 h-5 text-amber-600" />
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'te' ? 'ఫీజు & JVD స్కాలర్‌షిప్ వివరాలు' : 'Fee Ledger & AP JVD Status'}
              </h4>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              JVD Eligible
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">JVD 1st Quarter Release</span>
                <span className="text-lg font-bold text-amber-400">₹17,500</span>
              </div>
              <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                Disbursed to Bank
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">College Maintenance Fee</span>
                <span className="text-[10px] text-slate-500 block">Receipt: BIET-REC-88402</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">₹3,500</span>
                <span className="text-[10px] text-emerald-600 font-bold block">Paid (Online)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Bus Transport Pass Fee</span>
                <span className="text-[10px] text-slate-500 block">Route: Tanuku to BIET</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">₹14,000</span>
                <span className="text-[10px] text-emerald-600 font-bold block">Cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
