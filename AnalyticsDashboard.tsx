import React, { useMemo } from 'react';
import { DailyLog, Virtue } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Trophy, Calendar, TrendingUp, Sparkles } from 'lucide-react';

interface AnalyticsDashboardProps {
  logs: DailyLog[];
  insight: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ logs, insight }) => {
  
  const stats = useMemo(() => {
    const virtueCounts: Record<string, number> = {};
    logs.forEach(log => {
      virtueCounts[log.virtue] = (virtueCounts[log.virtue] || 0) + 1;
    });

    const chartData = Object.entries(virtueCounts).map(([name, value]) => ({ name, value }));
    
    // Sort by most practiced
    const sortedVirtues = Object.entries(virtueCounts).sort((a, b) => b[1] - a[1]);
    const topVirtue = sortedVirtues.length > 0 ? sortedVirtues[0][0] : 'N/A';
    
    // Calculate streak (simplified logic for prototype)
    // In a real app, this would check consecutive dates
    const today = new Date().toDateString();
    const hasLogToday = logs.some(l => new Date(l.date).toDateString() === today);
    const streak = logs.length > 0 ? (hasLogToday ? logs.length : logs.length) : 0; // Simplified streak

    return { chartData, topVirtue, streak };
  }, [logs]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];

  if (logs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-medium text-slate-800">Sin datos aún</h3>
        <p className="text-slate-500">Realiza tu primer registro para ver tus estadísticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Registros</p>
            <p className="text-2xl font-bold text-slate-800">{logs.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Racha Actual</p>
            <p className="text-2xl font-bold text-slate-800">{stats.streak} días</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Virtud Top</p>
            <p className="text-lg font-bold text-slate-800 truncate">{stats.topVirtue}</p>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <h3 className="text-indigo-100 font-medium mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Insight Semanal
          </h3>
          <p className="text-lg font-medium leading-relaxed opacity-95">
            "{insight}"
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Frequency Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Frecuencia de Virtudes</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-45} textAnchor="end" height={60} stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Historial Reciente</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-64">
            {logs.slice().reverse().map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {log.virtue}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 italic mb-3">"{log.reflection}"</p>
                {log.feedback && (
                  <div className="bg-white p-3 rounded-lg border border-slate-100 text-sm">
                    <p className="text-slate-700 mb-1"><strong>Tip:</strong> {log.feedback.practicalTip}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${log.feedback.score * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500">{log.feedback.score}/10</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;