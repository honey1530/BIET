import React from 'react';
import { GraduationCap, Users, Building2, FileCheck2, Briefcase, HeartHandshake, IndianRupee, Bot, ShieldCheck, ArrowRight, Sparkles, MapPin, Layers } from 'lucide-react';
import { UserRole } from '../../types';

interface PortalGatewayProps {
  onSelectPortal: (portalRole: UserRole) => void;
}

export const PortalGateway: React.FC<PortalGatewayProps> = ({ onSelectPortal }) => {
  const portalCards = [
    {
      id: 'student' as UserRole,
      title: 'BIET Student Portal Website',
      teluguTitle: 'విద్యార్థి పోర్టల్ వెబ్‌సైట్',
      subtitle: 'Dedicated website for Students (Daily 7-Periods Attendance, Mid Marks, JVD Fee Locker, Q&A Chat, Complaints Box, LMS Courseware, AI Tutor)',
      badge: 'Student Persona (Kolli Sai Teja)',
      bgGradient: 'from-blue-900 via-slate-900 to-indigo-950',
      borderColor: 'border-blue-500/40',
      icon: GraduationCap,
      accentColor: 'text-blue-400',
      btnBg: 'bg-blue-600 hover:bg-blue-500 text-white'
    },
    {
      id: 'faculty' as UserRole,
      title: 'BIET Staff & Faculty Workstation',
      teluguTitle: 'అధ్యాపకుల వెబ్‌సైట్',
      subtitle: 'Dedicated website for Professors & HODs (QR & Biometric Attendance Capture, Bloom\'s Taxonomy Mid-Paper Studio, Digital Rubrics, Student Q&A Chat)',
      badge: 'Faculty & HOD Persona',
      bgGradient: 'from-purple-900 via-slate-900 to-indigo-950',
      borderColor: 'border-purple-500/40',
      icon: Users,
      accentColor: 'text-purple-400',
      btnBg: 'bg-purple-600 hover:bg-purple-500 text-white'
    },
    {
      id: 'principal' as UserRole,
      title: 'BIET Principal & Executive Cockpit',
      teluguTitle: 'ప్రన్సిపాల్ ఎగ్జిక్యూటివ్ పోర్టల్',
      subtitle: 'Dedicated website for Management & Principal (Branch Matrix, NAAC/NBA Accreditation Readiness, Natural Language Text-to-SQL Analytics)',
      badge: 'Executive Management Persona',
      bgGradient: 'from-slate-900 via-amber-950 to-slate-900',
      borderColor: 'border-amber-500/40',
      icon: Building2,
      accentColor: 'text-amber-400',
      btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
    },
    {
      id: 'exam_cell' as UserRole,
      title: 'BIET JNTUK Examination Cell Vault',
      teluguTitle: 'పరీక్షల విభాగం పోర్టల్',
      subtitle: 'Dedicated website for Exam Controller (Conflict-free Timetable Solver, Seating Allocation Generator, Encrypted Paper Vault, CGPA Moderation)',
      badge: 'Exam Controller Persona',
      bgGradient: 'from-emerald-900 via-slate-900 to-teal-950',
      borderColor: 'border-emerald-500/40',
      icon: FileCheck2,
      accentColor: 'text-emerald-400',
      btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white'
    },
    {
      id: 'parent' as UserRole,
      title: 'BIET Parent Portal Website (తెలుగు)',
      teluguTitle: 'తల్లిదండ్రుల పోర్టల్ (తెలుగు / English)',
      subtitle: 'Dedicated website for Parents (Multilingual Telugu/English JNTUK 75% Attendance Alerts, Mid Exam Marks, JVD Disbursement, HOD WhatsApp Chat)',
      badge: 'Parent & Guardian Persona',
      bgGradient: 'from-rose-900 via-slate-900 to-rose-950',
      borderColor: 'border-rose-500/40',
      icon: HeartHandshake,
      accentColor: 'text-rose-400',
      btnBg: 'bg-rose-600 hover:bg-rose-500 text-white'
    },
    {
      id: 'placement_officer' as UserRole,
      title: 'BIET Placement & Career Cell',
      teluguTitle: 'ప్లేస్‌మెంట్స్ విభాగం పోర్టల్',
      subtitle: 'Dedicated website for Placement Officers & Recruiters (Drive Creation, HTNO Eligibility Engine with CGPA/Backlog filters, Candidate Shortlists)',
      badge: 'Placement Officer Persona',
      bgGradient: 'from-amber-900 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40',
      icon: Briefcase,
      accentColor: 'text-amber-400',
      btnBg: 'bg-amber-600 hover:bg-amber-500 text-white'
    },
    {
      id: 'finance' as UserRole,
      title: 'BIET Finance & Accounts Portal',
      teluguTitle: 'ఆర్థిక విభాగం పోర్టల్',
      subtitle: 'Dedicated website for Accounts (Tuition Fee Builder, AP JVD Scholarship Reconciliation, SBI Collect Challans, Online Payment Receipts)',
      badge: 'Accounts Officer Persona',
      bgGradient: 'from-teal-900 via-slate-900 to-emerald-950',
      borderColor: 'border-teal-500/40',
      icon: IndianRupee,
      accentColor: 'text-teal-400',
      btnBg: 'bg-teal-600 hover:bg-teal-500 text-white'
    },
    {
      id: 'cortex_ai' as UserRole,
      title: 'BIET Cortex AI Platform Website',
      teluguTitle: 'బి.ఐ.ఈ.టి AI ప్లాట్‌ఫారమ్',
      subtitle: 'Dedicated AI Control Center & RAG Syllabus Engine (10 Autonomous AI Agents for Academics, Exam Papers, Placement Skills & Analytics)',
      badge: 'AI Platform Persona',
      bgGradient: 'from-cyan-900 via-slate-900 to-indigo-950',
      borderColor: 'border-cyan-500/40',
      icon: Bot,
      accentColor: 'text-cyan-400',
      btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold'
    }
  ];

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* Gateway Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                BIET ACADEMIC OS v5.0
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Standalone Dedicated Websites Ecosystem
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-amber-300 tracking-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Select a dedicated website portal below to launch your personalized institutional workspace. Each portal features isolated navigation, custom workflows, and tailored access controls for Students, Staff, Exam Cell, Parents, and Management.
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Pennada, Bhimavaram, AP • JNTUK Kakinada Affiliated • AICTE Approved
            </p>
          </div>

          <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-3xl flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl border-2 border-amber-200/40 flex-shrink-0">
            BIET
          </div>
        </div>
      </div>

      {/* Grid of Dedicated Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Select Your Dedicated Website Portal</span>
          </h2>
          <span className="text-xs text-slate-500">8 Dedicated Portal Websites Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalCards.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                onClick={() => onSelectPortal(portal.id)}
                className={`bg-gradient-to-b ${portal.bgGradient} text-white rounded-2xl p-6 border ${portal.borderColor} shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-5 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${portal.accentColor} border border-white/10 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/10">
                      {portal.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">{portal.teluguTitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-3">
                      {portal.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md ${portal.btnBg}`}
                >
                  <span>Launch Dedicated Website</span>
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
