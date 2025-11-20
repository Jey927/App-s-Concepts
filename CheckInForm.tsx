import React, { useState } from 'react';
import { Virtue, DailyLog } from '../types';
import { analyzeReflection } from '../services/geminiService';
import { Send, Loader2, Star, Heart, Shield, Zap, Smile, Coffee, Sun, Award } from 'lucide-react';

interface CheckInFormProps {
  onLogSubmit: (log: DailyLog) => void;
}

const VIRTUE_ICONS: Record<Virtue, React.ReactNode> = {
  [Virtue.Responsibility]: <Shield className="w-6 h-6 text-blue-500" />,
  [Virtue.Honesty]: <Star className="w-6 h-6 text-yellow-500" />,
  [Virtue.Generosity]: <Heart className="w-6 h-6 text-red-500" />,
  [Virtue.Perseverance]: <Zap className="w-6 h-6 text-orange-500" />,
  [Virtue.Respect]: <Smile className="w-6 h-6 text-purple-500" />,
  [Virtue.Gratitude]: <Sun className="w-6 h-6 text-amber-500" />,
  [Virtue.Patience]: <Coffee className="w-6 h-6 text-emerald-500" />,
  [Virtue.Humility]: <Award className="w-6 h-6 text-indigo-500" />,
};

const VIRTUE_DESCRIPTIONS: Record<Virtue, string> = {
  [Virtue.Responsibility]: "Cumplir con tus deberes y asumir consecuencias.",
  [Virtue.Honesty]: "Decir la verdad y ser auténtico.",
  [Virtue.Generosity]: "Dar a los demás sin esperar nada a cambio.",
  [Virtue.Perseverance]: "Continuar esforzándote a pesar de las dificultades.",
  [Virtue.Respect]: "Tratar a los demás con dignidad y consideración.",
  [Virtue.Gratitude]: "Apreciar lo que tienes y dar las gracias.",
  [Virtue.Patience]: "Mantener la calma ante la espera o frustración.",
  [Virtue.Humility]: "Reconocer tus límites y valorar a otros.",
};

const CheckInForm: React.FC<CheckInFormProps> = ({ onLogSubmit }) => {
  const [selectedVirtue, setSelectedVirtue] = useState<Virtue | null>(null);
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVirtue || !reflection.trim()) return;

    setIsSubmitting(true);
    try {
      const feedback = await analyzeReflection(selectedVirtue, reflection);
      
      const newLog: DailyLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        virtue: selectedVirtue,
        reflection,
        feedback
      };

      onLogSubmit(newLog);
      // Reset form
      setSelectedVirtue(null);
      setReflection('');
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Check-in Diario</h2>
        <p className="text-slate-500">¿Qué virtud practicaste hoy?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(Virtue).map((virtue) => (
          <button
            key={virtue}
            onClick={() => setSelectedVirtue(virtue)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center
              ${selectedVirtue === virtue 
                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 ring-offset-2' 
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
              }
            `}
          >
            <div className={`p-2 rounded-full ${selectedVirtue === virtue ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
              {VIRTUE_ICONS[virtue]}
            </div>
            <span className={`text-sm font-medium ${selectedVirtue === virtue ? 'text-indigo-900' : 'text-slate-600'}`}>
              {virtue}
            </span>
          </button>
        ))}
      </div>

      {selectedVirtue && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in zoom-in-95 duration-300">
          <div className="mb-4 flex items-center gap-2 text-indigo-600 bg-indigo-50 p-3 rounded-lg text-sm">
            {VIRTUE_ICONS[selectedVirtue]}
            <span className="font-medium">{VIRTUE_DESCRIPTIONS[selectedVirtue]}</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                ¿Cómo la viviste hoy? Cuéntanos un momento específico.
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                placeholder="Hoy tuve la oportunidad de..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !reflection.trim()}
              className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analizando con IA...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Registrar Progreso
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckInForm;