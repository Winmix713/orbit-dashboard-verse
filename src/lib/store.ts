
import { create } from 'zustand';

interface UserStats {
  points: number;
  totalPredictions: number;
  correctPredictions: number;
  winRate: number;
  streak: number;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  predictions?: any[];
}

interface AppStore {
  userStats: UserStats;
  matches: Match[];
  predictions: any[];
  updateUserStats: (stats: Partial<UserStats>) => void;
  updateMatches: (matches: Match[]) => void;
  updatePredictions: (predictions: any[]) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  userStats: {
    points: 0,
    totalPredictions: 0,
    correctPredictions: 0,
    winRate: 0,
    streak: 0,
  },
  matches: [],
  predictions: [],
  updateUserStats: (stats) =>
    set((state) => ({
      userStats: { ...state.userStats, ...stats },
    })),
  updateMatches: (matches) => set({ matches }),
  updatePredictions: (predictions) => set({ predictions }),
}));
