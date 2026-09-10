import React from 'react';
import { GraduationCap, Users, Building2, HeartHandshake, ShieldCheck, ArrowRight, MapPin, Layers } from 'lucide-react';
import { UserRole } from '../../types';

interface PortalGatewayProps {
  onSelectPortal: (portalRole: UserRole) => void;
}

export const PortalGateway: React.FC<PortalGatewayProps> = ({ onSelectPortal }) => {
  const portalCards = [
    {
      id: 'principal' as UserRole,
      title: 'Admin & Principal App',
      teluguTitle: 'ప్రన్సిపాల్ & అడ్మిన్ పోర్టల్',
      subtitle: 'Executive management cockpit for Principal & Management (Clean White Theme, Super Admin User Provisioning, Excel Upload, Credentials Matrix, Text-to-SQL Analytics)',
      badge: 'Executive Principal Persona',
      cardBg: 'bg-white border-slate-200 hover:border-indigo-500',
      icon: Building2,
      accentBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    {
      id: 'student' as UserRole,
      title: 'Student Web App',
      teluguTitle: 'విద్యార్థి పోర్టల్ వెబ్‌సైట్',
      subtitle: 'Dedicated portal for B.Tech & MBA Students (Individual Identity Profile, Daily 7-Periods Attendance, Mid Marks, JVD Fee Locker, Q&A Chat, Complaints Box)',
      badge: 'Student Persona',
      cardBg: 'bg-white border-slate-200 hover:border-blue-500',
      icon: GraduationCap,
      accentBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      btnBg: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      id: 'faculty' as UserRole,
      title: 'Faculty Workstation',
      teluguTitle: 'అధ్యాపకుల వెబ్‌సైట్',
      subtitle: 'Dedicated portal for Professors & HODs (Classroom Attendance Marking, Bloom\'s Taxonomy Paper Studio, Digital Rubrics, Student Mentor Q&A Chat)',
      badge: 'Faculty & HOD Persona',
      cardBg: 'bg-white border-slate-200 hover:border-purple-500',
      icon: Users,
      accentBg: 'bg-purple-50 text-purple-600 border border-purple-100',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    {
      id: 'parent' as UserRole,
      title: 'Parent Web App',
      teluguTitle: 'తల్లిదండ్రుల పోర్టల్ (తెలుగు / English)',
      subtitle: 'Dedicated portal for Parents & Guardians (Telugu/English BIET Attendance Alerts, Mid Exam Marks, JVD Disbursement, HOD WhatsApp Chat)',
      badge: 'Parent & Guardian Persona',
      cardBg: 'bg-white border-slate-200 hover:border-rose-500',
      icon: HeartHandshake,
      accentBg: 'bg-rose-50 text-rose-600 border border-rose-100',
      btnBg: 'bg-rose-600 hover:bg-rose-700 text-white'
    }
  ];

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* Gateway Hero Banner */}
      <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-8 shadow-xs relative overflow-hidden text-center md:text-left">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                BIET PORTAL GATEWAY
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> NAAC Grade 'A' • UGC Autonomous Institution
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 tracking-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Select your portal below to launch your dedicated institutional workspace. All 4 websites feature isolated workflows, matching executive white UI styling, and tailored access controls.
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              Pennada, W.G.Dist, AP - 534243 • Helpline: +91-630-128-8818 • principal@bietbvrm.ac.in
            </p>
          </div>

          <img 
            src="/biet_logo.png" 
            alt="BIET Emblem Logo" 
            className="w-24 h-24 object-contain drop-shadow-sm flex-shrink-0" 
          />
        </div>
      </div>

      {/* Grid of 4 Core Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Select Your Portal Website</span>
          </h2>
          <span className="text-xs text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            4 Websites Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalCards.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                onClick={() => onSelectPortal(portal.id)}
                className={`${portal.cardBg} rounded-2xl p-6 border shadow-xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-5 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${portal.accentBg} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {portal.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-indigo-700 font-bold mt-0.5">{portal.teluguTitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                      {portal.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-xs ${portal.btnBg}`}
                >
                  <span>Launch Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
