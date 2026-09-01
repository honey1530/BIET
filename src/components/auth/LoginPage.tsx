import React, { useState } from 'react';
import { UserRole, AuthSession } from '../../types';
import { authenticateUser } from '../../data/db';
import { Lock, User, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  appName: string;
  role: UserRole;
  onLoginSuccess: (session: AuthSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ appName, role, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoggingIn(true);
    setErrorMsg(null);

    try {
      let authRes: any = null;

      // 1. Try Server API Endpoint
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password: password.trim() })
        });

        if (res.ok) {
          const text = await res.text();
          if (text) {
            authRes = JSON.parse(text);
          }
        }
      } catch (err) {
        console.warn("API login fetch failed, falling back to local database engine", err);
      }

      // 2. Fallback to Local DB Engine
      if (!authRes || !authRes.success) {
        authRes = authenticateUser(username, password);
      }

      if (!authRes || !authRes.success) {
        setErrorMsg(authRes?.error || 'Authentication failed. Please check your account details and password.');
        setIsLoggingIn(false);
        return;
      }

      // Direct Login Success
      const session: AuthSession = {
        isAuthenticated: true,
        username: authRes.user.username,
        role: authRes.user.role,
        name: authRes.user.name,
        department: authRes.user.department,
        isFirstLogin: false
      };

      onLoginSuccess(session);
    } catch (err: any) {
      setErrorMsg(`Authentication error: ${err.message || String(err)}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-4 selection:bg-indigo-600 selection:text-white">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6 relative z-10">
        
        {/* Official BIET College Emblem Logo & Title Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img 
              src="/biet_logo.png" 
              alt="Bhimavaram Institute of Engineering & Technology Logo" 
              className="w-28 h-28 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-slate-900 leading-tight">
              Bhimavaram Institute of Engineering &amp; Technology
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Pennada, Bhimavaram • UGC Autonomous Institution
            </p>
            <div className="mt-2 inline-block bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {role === 'student' ? 'Student Portal Login' : role === 'faculty' ? 'Faculty Portal Login' : `${appName} Login`}
            </div>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-fadeIn shadow-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Simple & Clean Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Account (HTNO / User ID / Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter HTNO or Account User ID..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all font-semibold placeholder-slate-400 shadow-inner"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter account password..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all font-semibold placeholder-slate-400 shadow-inner"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 ${isLoggingIn ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isLoggingIn ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium">
            Bhimavaram Institute of Engineering &amp; Technology • Learn and Lead
          </p>
        </div>

      </div>
    </div>
  );
};
