
import { MatchAnalysis } from './types';

export const fetchMatchAnalysis = async (homeTeamId: string, awayTeamId: string): Promise<MatchAnalysis> => {
  // In a real application, this would make an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        homeWinProbability: 45,
        drawProbability: 30,
        awayWinProbability: 25,
        homeForm: 80,
        awayForm: 70,
        prediction: {
          home: 45,
          draw: 30,
          away: 25,
          confidence: 72,
          recommended: 'home'
        },
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
    }, 1000);
  });
};

export const calculateOdds = (probability: number): string => {
  // Simple formula to convert probability to decimal odds
  if (probability <= 0) return "N/A";
  const decimal = (100 / probability).toFixed(2);
  return decimal;
};

export const formatProbability = (probability: number): string => {
  return `${probability}%`;
};
