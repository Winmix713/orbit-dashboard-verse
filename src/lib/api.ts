
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
      });
    }, 1000);
  });
};
