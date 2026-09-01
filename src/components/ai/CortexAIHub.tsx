import React, { useState } from 'react';
import { BIET_AI_AGENTS } from '../../data/bietData';
import { AIAgentInfo, ChatMessage } from '../../types';
import { Bot, Sparkles, Send, GraduationCap, IndianRupee, Briefcase, FileCheck, BookOpen, Microscope, Building2, UserPlus, ShieldAlert, BarChart3, RefreshCw, User, CheckCircle2 } from 'lucide-react';

export const CortexAIHub: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgentInfo>(BIET_AI_AGENTS[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'agent',
      agentName: 'BIET Cortex AI Core Router',
      text: `Namaste! Welcome to **BIET Cortex AI** — Bhimavaram Institute of Engineering & Technology's Autonomous Intelligence Hub.

I route your requests across 10 specialized autonomous agents trained on **JNTUK Kakinada R20 & R23 Regulations**, **NBA CO-PO Attainment Matrices**, **AP JVD Scholarship Rules**, and **BIET Campus Operations**.

How can I assist you today? Select any agent above or pick a sample query below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'IndianRupee': return IndianRupee;
      case 'Briefcase': return Briefcase;
      case 'FileCheck': return FileCheck;
      case 'BookOpen': return BookOpen;
      case 'Microscope': return Microscope;
      case 'Building2': return Building2;
      case 'UserPlus': return UserPlus;
      case 'ShieldAlert': return ShieldAlert;
      default: return BarChart3;
    }
  };

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!promptText) setInputMessage('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/cortex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          agentId: selectedAgent.id,
          contextData: { agentName: selectedAgent.name, role: selectedAgent.role }
        })
      });

      const data = await res.json();

      const agentReply: ChatMessage = {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        agentName: selectedAgent.name,
        text: data.text || "No response received from agent.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentReply]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'system',
        text: `Error connecting to BIET Cortex server: ${err.message || String(err)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                SERVER-SIDE GEMINI 3.6 FLASH
              </span>
              <span className="text-amber-300 text-xs font-mono">10 Autonomous Agents Active</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-amber-300">
              BIET Cortex AI &amp; Autonomous Agents Hub
            </h2>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              LangGraph-inspired specialized multi-agent orchestrator for Bhimavaram Institute of Engineering &amp; Technology. Seamlessly handling JNTUK academic pathing, exam Bloom papers, AP JVD fee reconciliation, placement prep, and executive analytics.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Active System Model</span>
            <p className="text-sm font-bold text-emerald-400 font-mono">gemini-3.6-flash</p>
          </div>
        </div>
      </div>

      {/* 10 Autonomous AI Agents Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
          <Bot className="w-5 h-5 text-amber-600" />
          <span>The 10 Specialized BIET AI Agents</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {BIET_AI_AGENTS.map((agent) => {
            const IconComponent = getAgentIcon(agent.iconName);
            const isSelected = selectedAgent.id === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-amber-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-amber-600'}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
                    {agent.category}
                  </span>
                </div>

                <h4 className="font-bold text-xs leading-snug">{agent.name}</h4>
                <p className={`text-[10px] line-clamp-2 mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {agent.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Agent Prompt Chat Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-amber-300 font-serif">{selectedAgent.name}</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  ACTIVE AGENT
                </span>
              </div>
              <p className="text-xs text-slate-400">{selectedAgent.role} • {selectedAgent.description}</p>
            </div>
          </div>
        </div>

        {/* Preset Prompt Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold text-[11px]">Quick Prompts:</span>
          {selectedAgent.examplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-lg transition-colors text-left text-[11px]"
            >
              💬 "{p}"
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1 text-[10px] text-slate-500 font-medium">
                {msg.sender === 'user' ? (
                  <span>You (User) • {msg.timestamp}</span>
                ) : (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> {msg.agentName || 'BIET Cortex AI'} • {msg.timestamp}
                  </span>
                )}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-amber-200 rounded-br-none shadow-md font-sans'
                    : msg.sender === 'system'
                    ? 'bg-rose-50 text-rose-900 border border-rose-200 font-mono'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm whitespace-pre-wrap font-sans'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center space-x-2 text-xs text-amber-700 font-medium p-3 bg-amber-50 rounded-xl border border-amber-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>BIET Cortex AI processing query through @google/genai...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask ${selectedAgent.name}... (e.g. ${selectedAgent.examplePrompts[0]})`}
            className="flex-1 bg-slate-100 border border-slate-300 text-slate-900 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isSending}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
