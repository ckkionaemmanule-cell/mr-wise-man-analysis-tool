import React, { useMemo } from 'react';
import { Tick } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowUp, ArrowDown, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiseFallAnalysisProps {
  ticks: Tick[];
}

const RiseFallAnalysis: React.FC<RiseFallAnalysisProps> = ({ ticks }) => {
  const analysis = useMemo(() => {
    if (ticks.length < 2) return { currentStreak: 0, streakType: 'neutral', stats: { up: 0, down: 0 } };

    let currentStreak = 0;
    let streakType: 'up' | 'down' | 'neutral' = ticks[0].type;
    
    for (const tick of ticks) {
      if (tick.type === streakType) {
        currentStreak++;
      } else {
        break;
      }
    }

    const up = ticks.filter(t => t.type === 'up').length;
    const down = ticks.filter(t => t.type === 'down').length;

    return {
      currentStreak,
      streakType,
      stats: {
        up: Math.round((up / ticks.length) * 100),
        down: Math.round((down / ticks.length) * 100),
      }
    };
  }, [ticks]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Current Momentum
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center border-4 mb-4",
            analysis.streakType === 'up' ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-rose-500 bg-rose-500/10 text-rose-500"
          )}>
            {analysis.streakType === 'up' ? <ArrowUp className="w-12 h-12" /> : <ArrowDown className="w-12 h-12" />}
          </div>
          <h3 className="text-2xl font-black text-white">{analysis.currentStreak}x Ticks</h3>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">
            Consecutive {analysis.streakType === 'up' ? 'Rise' : 'Fall'}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 font-medium">Market Sentiment</span>
              <div className="flex gap-1">
                <div className={cn("w-2 h-2 rounded-full", analysis.stats.up > 50 ? "bg-emerald-500 animate-pulse" : "bg-slate-700")} />
                <div className={cn("w-2 h-2 rounded-full", analysis.stats.down > 50 ? "bg-rose-500 animate-pulse" : "bg-slate-700")} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 text-emerald-500 font-bold">{analysis.stats.up}%</div>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${analysis.stats.up}%` }} />
                </div>
                <ArrowUp className="w-4 h-4 text-emerald-500" />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 text-rose-500 font-bold">{analysis.stats.down}%</div>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${analysis.stats.down}%` }} />
                </div>
                <ArrowDown className="w-4 h-4 text-rose-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Repeat className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-100 text-sm font-bold">Trend Reversal Probability</p>
                <p className="text-slate-400 text-xs">
                  {analysis.currentStreak > 3 
                    ? `High probability of reversal after ${analysis.currentStreak} consecutive ticks.` 
                    : "Momentum is currently stable."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiseFallAnalysis;