import React, { useState, useEffect } from 'react';
import { InteractionThread } from '../../types';
import { SAMPLE_INTERACTIONS, JNTUK_COURSES } from '../../data/bietData';
import { MessageSquare, Send, CheckCircle2, UserCheck, BookOpen, Sparkles, MessageCircle, Clock, Plus, HelpCircle, FileText, Upload, CheckSquare, Download } from 'lucide-react';

interface FacultyStudentInteractionProps {
  initialSubTab?: 'chat' | 'assignments';
}

export const FacultyStudentInteraction: React.FC<FacultyStudentInteractionProps> = ({ initialSubTab = 'chat' }) => {
  const [threads, setThreads] = useState<InteractionThread[]>(SAMPLE_INTERACTIONS);
  const [activeThreadId, setActiveThreadId] = useState<string>(SAMPLE_INTERACTIONS[0].id);
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'assignments'>(initialSubTab);

  // Assignment Submission State
  const [submittedAssignment, setSubmittedAssignment] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  // New Thread Form State
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [selectedCourseCode, setSelectedCourseCode] = useState('R232101');
  const [firstQuestion, setFirstQuestion] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      sender: 'student' as const,
      senderName: 'Kolla Sai Teja (HTNO: 21A91A0501)',
      text: replyText,
      timestamp: 'Just now'
    };

    const updatedThreads = threads.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: replyText,
          timestamp: 'Just now',
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setReplyText('');
  };

  const handleCreateNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !firstQuestion.trim()) return;

    const course = JNTUK_COURSES.find(c => c.code === selectedCourseCode) || JNTUK_COURSES[0];
    const newThread: InteractionThread = {
      id: `th_${Date.now()}`,
      studentHtno: '21A91A0501',
      studentName: 'Kolla Sai Teja',
      facultyName: course.facultyName,
      courseCode: course.code,
      courseName: course.name,
      topic: newTopic,
      lastMessage: firstQuestion,
      timestamp: 'Just now',
      status: 'Open',
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'student',
          senderName: 'Kolla Sai Teja',
          text: firstQuestion,
          timestamp: 'Just now'
        }
      ]
    };

    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
    setNewTopic('');
    setFirstQuestion('');
    setIsCreatingThread(false);
  };

  const handleAssignmentUpload = (taskName: string) => {
    setSubmittedAssignment(`Submitted PDF for ${taskName}! Marked as Pending Faculty Grading.`);
    setTimeout(() => setSubmittedAssignment(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-400/40 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner">
            <MessageCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-indigo-300">
                BIET Faculty &amp; Student Academics Portal
              </h2>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-semibold">
                Direct Mentor &amp; Assignment Submissions
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Ask syllabus doubts, submit assignment PDFs, or request project guidance directly from your branch professors.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'chat' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Faculty Q&amp;A Chat
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assignments' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Assignments &amp; Lab Submissions
          </button>
        </div>
      </div>

      {submittedAssignment && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-fadeIn shadow">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{submittedAssignment}</span>
        </div>
      )}

      {/* VIEW 1: FACULTY Q&A CHAT */}
      {activeTab === 'chat' && (
        <div className="space-y-6">
          {/* New Question Form Modal/Panel */}
          {isCreatingThread && (
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-md space-y-4 animate-fadeIn">
              <h3 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Ask a New Course Doubt / Question to Faculty</span>
              </h3>

              <form onSubmit={handleCreateNewThread} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Select Subject &amp; Faculty</label>
                    <select
                      value={selectedCourseCode}
                      onChange={(e) => setSelectedCourseCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    >
                      {JNTUK_COURSES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.code} - {c.name} ({c.facultyName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Question Topic / Subject</label>
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g. Unit 3 Algorithm derivation doubt..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Doubt / Message</label>
                  <textarea
                    value={firstQuestion}
                    onChange={(e) => setFirstQuestion(e.target.value)}
                    rows={3}
                    placeholder="Write your specific question or derivation step..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Question to Faculty</span>
                </button>
              </form>
            </div>
          )}

          {/* Main Interaction Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Threads Sidebar (4 Cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">
                  Active Discussions ({threads.length})
                </h3>
                <button
                  onClick={() => setIsCreatingThread(!isCreatingThread)}
                  className="text-xs text-indigo-600 font-bold hover:underline"
                >
                  + New Question
                </button>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {threads.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveThreadId(t.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                      activeThreadId === t.id
                        ? 'bg-indigo-50/90 border-indigo-500 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded">
                        {t.courseCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{t.topic}</h4>
                    <p className="text-[11px] text-slate-500">Faculty: <strong className="text-slate-700">{t.facultyName}</strong></p>

                    <p className="text-[11px] text-slate-600 line-clamp-1 italic bg-white/60 p-1.5 rounded border border-slate-200/60">
                      "{t.lastMessage}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Conversation View (8 Cols) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Conversation Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-900 text-amber-400 font-bold text-xs px-2.5 py-0.5 rounded">
                        {activeThread.courseCode}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base font-serif">{activeThread.topic}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Subject: <strong className="text-slate-800">{activeThread.courseName}</strong> • Faculty: <strong className="text-indigo-700">{activeThread.facultyName}</strong>
                    </p>
                  </div>

                  <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full ${
                    activeThread.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeThread.status} Thread
                  </span>
                </div>

                {/* Chat Messages Stream */}
                <div className="space-y-3 min-h-[300px] max-h-[420px] overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {activeThread.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[85%] ${
                        m.sender === 'student' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 font-medium mb-1 px-1">
                        {m.senderName} • {m.timestamp}
                      </span>
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        m.sender === 'student'
                          ? 'bg-slate-900 text-white rounded-tr-none'
                          : 'bg-indigo-600 text-white rounded-tl-none font-sans'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your doubt or reply to faculty..."
                  className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ASSIGNMENTS & LAB LOGS PORTAL */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <span>Assignment &amp; Lab Manual Submission Portal</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download course assignment question sheets &amp; submit completed PDF solution scripts
              </p>
            </div>

            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
              3 Pending Tasks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Task 1: DBMS Assignment 1 */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">R203102</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Due in 2 Days</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">DBMS Unit 1 &amp; 2 Relational Algebra Assignment</h4>
              <p className="text-xs text-slate-500">Faculty: Dr. G. Srinivas Rao • Max Marks: 10</p>
              <div className="pt-2 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => handleAssignmentUpload('DBMS Unit 1 Assignment')}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload PDF</span>
                </button>
              </div>
            </div>

            {/* Task 2: DAA Lab Record */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">R203105</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Submitted</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">DAA Lab Record Experiment 4: N-Queens Problem</h4>
              <p className="text-xs text-slate-500">Faculty: Dr. V. Rama Krishna • Grade: 9/10</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Evaluated &amp; Verified
                </span>
              </div>
            </div>

            {/* Task 3: AI Lab Record */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">R203108</span>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">Action Required</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">AI &amp; ML Lab Task: A* Search Algorithm Python Notebook</h4>
              <p className="text-xs text-slate-500">Faculty: Dr. V. Rama Krishna • Max Marks: 10</p>
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleAssignmentUpload('AI Python Lab Notebook')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit Code &amp; PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
