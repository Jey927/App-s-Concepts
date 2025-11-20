export enum Virtue {
  Responsibility = 'Responsabilidad',
  Honesty = 'Honestidad',
  Generosity = 'Generosidad',
  Perseverance = 'Perseverancia',
  Respect = 'Respeto',
  Gratitude = 'Gratitud',
  Patience = 'Paciencia',
  Humility = 'Humildad'
}

export interface AIFeedback {
  encouragement: string;
  practicalTip: string;
  score: number; // 1-10 intensity of practice based on text
}

export interface DailyLog {
  id: string;
  date: string; // ISO string
  virtue: Virtue;
  reflection: string;
  feedback?: AIFeedback;
}

export interface UserStats {
  totalLogs: number;
  currentStreak: number;
  topVirtue: Virtue | null;
}