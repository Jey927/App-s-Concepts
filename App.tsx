import React, { useState, useEffect } from 'react';
import CheckInForm from './components/CheckInForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { DailyLog } from './types';
import { generateWeeklyInsight } from './services/geminiService';
import { BookOpen, BarChart3, PlusCircle, UserCircle } from 'lucide-react';

function App() {
  const [view, setView] = useState<'checkin' | 'dashboard'>('checkin');
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [weeklyInsight, setWeeklyInsight] = useState<string>('Cargando análisis...');

  // Load logs from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('virtueLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs when updated
  useEffect(() => {
    localStorage.setItem('virtueLogs', JSON.stringify(logs));
  }, [logs]);

  // Generate insight when switching to dashboard
  useEffect(() => {
    if (view === 'dashboard' && logs.length > 0) {
      generateWeeklyInsight(logs).then(setWeeklyInsight);
    }
  }, [view, logs]);

  const handleLogSubmit = (newLog: DailyLog) => {
    setLogs((prev) => [...prev, newLog]);
    // Optional: Auto switch to dashboard after log
    setTimeout(() => setView('dashboard'), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-md shadow-indigo-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Virtus</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {view === 'checkin' ? (
          <CheckInForm onLogSubmit={handleLogSubmit} />
        ) : (
          <AnalyticsDashboard logs={logs} insight={weeklyInsight} />
        )}
      </main>

      {/* Bottom Navigation (Mobile-First) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          <button
            onClick={() => setView('checkin')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              view === 'checkin' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <PlusCircle className={`w-6 h-6 ${view === 'checkin' ? 'fill-indigo-100' : ''}`} />
            <span className="text-xs font-medium">Registrar</span>
          </button>
          
          <div className="w-px h-8 bg-slate-100"></div>

          <button
            onClick={() => setView('dashboard')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              view === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BarChart3 className={`w-6 h-6 ${view === 'dashboard' ? 'fill-indigo-100' : ''}`} />
            <span className="text-xs font-medium">Mi Progreso</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;