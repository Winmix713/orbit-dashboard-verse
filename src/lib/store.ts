
import { create } from 'zustand';
import { type Match, type Team, type Prediction, type MatchAnalysis } from './types';

interface UserStats {
  points: number;
  totalPredictions: number;
  correctPredictions: number;
  winRate: number;
  streak: number;
}

interface AppStore {
  userStats: UserStats;
  matches: Match[];
  predictions: Prediction[];
  allTeams: Team[];
  matchAnalyses: Record<string, MatchAnalysis>;
  
  // Actions
  updateUserStats: (stats: Partial<UserStats>) => void;
  updateMatches: (matches: Match[]) => void;
  updatePredictions: (predictions: Prediction[]) => void;
  addPrediction: (prediction: Prediction) => void;
  updateMatch: (matchId: string, matchData: Partial<Match>) => void;
  setAllTeams: (teams: Team[]) => void;
  setMatchAnalysis: (matchId: string, analysis: MatchAnalysis) => void;
  getMatchAnalysis: (homeTeamId: string, awayTeamId: string) => Promise<MatchAnalysis>;
}

// Mock data for teams
const mockTeams: Team[] = [
  { id: 'team1', name: 'Arsenal', logo: '/placeholder.svg', form: ['W', 'W', 'D', 'L', 'W'], rank: '1' },
  { id: 'team2', name: 'Chelsea', logo: '/placeholder.svg', form: ['L', 'W', 'W', 'D', 'W'], rank: '3' },
  { id: 'team3', name: 'Liverpool', logo: '/placeholder.svg', form: ['W', 'D', 'W', 'W', 'W'], rank: '2' },
  { id: 'team4', name: 'Manchester City', logo: '/placeholder.svg', form: ['W', 'W', 'W', 'D', 'W'], rank: '4' },
  { id: 'team5', name: 'Manchester United', logo: '/placeholder.svg', form: ['L', 'L', 'W', 'D', 'L'], rank: '5' },
  { id: 'team6', name: 'Tottenham', logo: '/placeholder.svg', form: ['D', 'W', 'L', 'W', 'D'], rank: '6' },
];

// Mock match data
const mockMatches: Match[] = [
  {
    id: 'match1',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    date: '2025-04-20',
    time: '15:00',
    timeGMT: 'GMT+1',
    startsIn: '1 day',
    league: 'Premier League',
  },
  {
    id: 'match2',
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    date: '2025-04-21',
    time: '20:00',
    timeGMT: 'GMT+1',
    startsIn: '2 days',
    league: 'Premier League',
  },
  {
    id: 'match3',
    homeTeam: mockTeams[4],
    awayTeam: mockTeams[5],
    date: '2025-04-22',
    time: '19:30',
    timeGMT: 'GMT+1',
    startsIn: '3 days',
    league: 'Premier League',
  },
];

export const useAppStore = create<AppStore>((set, get) => ({
  userStats: {
    points: 120,
    totalPredictions: 24,
    correctPredictions: 14,
    winRate: 58,
    streak: 3,
  },
  matches: mockMatches,
  predictions: [],
  allTeams: mockTeams,
  matchAnalyses: {},
  
  updateUserStats: (stats) =>
    set((state) => ({
      userStats: { ...state.userStats, ...stats },
    })),
  
  updateMatches: (matches) => set({ matches }),
  
  updatePredictions: (predictions) => set({ predictions }),
  
  addPrediction: (prediction) =>
    set((state) => ({
      predictions: [...state.predictions, prediction],
      userStats: {
        ...state.userStats,
        totalPredictions: state.userStats.totalPredictions + 1,
      }
    })),
  
  updateMatch: (matchId, matchData) =>
    set((state) => ({
      matches: state.matches.map(match => 
        match.id === matchId ? { ...match, ...matchData } : match
      ),
    })),
  
  setAllTeams: (teams) => set({ allTeams: teams }),
  
  setMatchAnalysis: (matchId, analysis) =>
    set((state) => ({
      matchAnalyses: { ...state.matchAnalyses, [matchId]: analysis }
    })),
  
  getMatchAnalysis: async (homeTeamId, awayTeamId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          homeWinProbability: 42,
          drawProbability: 28,
          awayWinProbability: 30,
          homeForm: 75,
          awayForm: 65,
          historicalMatches: [
            {
              date: '2022-09-18',
              homeTeam: 'Arsenal',
              awayTeam: 'Chelsea',
              score: '3-1',
              result: 'home'
            },
            {
              date: '2022-01-23',
              homeTeam: 'Chelsea',
              awayTeam: 'Arsenal',
              score: '2-2',
              result: 'draw'
            }
          ]
        });
      }, 800);
    });
  }
}));
