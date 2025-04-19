
export interface Team {
  id: string;
  name: string;
  logo?: string;
  form?: TeamFormItem[];
  rank?: string;
}

export type TeamFormItem = 'W' | 'D' | 'L' | 'G' | 'Y' | 'V';

export interface Match {
  id: string;
  homeTeam?: Team;
  awayTeam?: Team;
  date: string;
  time: string;
  timeGMT?: string;
  startsIn?: string;
  league: string;
  selectableTeams?: boolean;
  predictions?: Prediction[];
}

export interface Prediction {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  prediction: 'home' | 'draw' | 'away';
  timestamp?: Date;
}

export interface MatchAnalysis {
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  homeForm: number;
  awayForm: number;
  historicalMatches?: HistoricalMatch[];
}

export interface HistoricalMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  result: 'home' | 'draw' | 'away';
}
