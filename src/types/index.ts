export interface Tick {
  id: string;
  price: number;
  digit: number;
  timestamp: number;
  type: 'up' | 'down' | 'neutral';
}

export type AnalysisMode = 'even-odd' | 'over-under' | 'matches-differs' | 'rise-fall';

export interface Market {
  id: string;
  name: string;
  symbol: string;
}

export const MARKETS: Market[] = [
  { id: 'R_10', name: 'Volatility 10 Index', symbol: 'V10' },
  { id: 'R_25', name: 'Volatility 25 Index', symbol: 'V25' },
  { id: 'R_50', name: 'Volatility 50 Index', symbol: 'V50' },
  { id: 'R_75', name: 'Volatility 75 Index', symbol: 'V75' },
  { id: 'R_100', name: 'Volatility 100 Index', symbol: 'V100' },
];