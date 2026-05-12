import React, { useMemo } from 'react';
import { Tick } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverUnderAnalysisProps {
  ticks: Tick[];
}

const OverUnderAnalysis: React.FC<OverUnderAnalysisProps> = ({ ticks }) => {
  const threshold = 4.5;
  
  const stats = useMemo(() => {
    const total = ticks.length;
    if (total === 0) return { over: 0, under: 0, overPct: 0, underPct: 0 };
    
    const over = ticks.filter(t => t.digit > 4).length;
    const under = total - over;
    
    return {
      over,
      under,
      overPct: Math.round((over / total) * 100),
      underPct: Math.round((under / total) * 100),
    };
  }, [ticks]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-500" />
              Over / Under {threshold}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 py-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-sm font-medium">Over 4.5</span>
                <span className="text-2xl font-black text-amber-500">{stats.overPct}%</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700" 
                  style={{ width: `${stats.overPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-sm font-medium">Under 4.5</span>
                <span className="text-2xl font-black text-purple-500">{stats.underPct}%</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-700" 
                  style={{ width: `${stats.underPct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-slate-100 font-bold mb-1">Probability Insight</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Historically, digits are uniformly distributed. Deviations greater than 15% from the mean (50%) suggest a potential corrective movement.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700/50">
          <h4 className="text-slate-300 font-bold text-sm uppercase tracking-wider">Digit Groupings</h4>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800">
            {[
              { label: 'High (7-9)', digits: [7, 8, 9], color: 'bg-amber-500' },
              { label: 'Mid (4-6)', digits: [4, 5, 6], color: 'bg-blue-500' },
              { label: 'Low (0-3)', digits: [0, 1, 2, 3], color: 'bg-emerald-500' },
            ].map((group) => {
              const groupCount = ticks.filter(t => group.digits.includes(t.digit)).length;
              const pct = Math.round((groupCount / ticks.length) * 100);
              return (
                <div key={group.label} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-slate-100 font-medium">{group.label}</p>
                    <p className="text-slate-500 text-xs">Digits: {group.digits.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{pct}%</p>
                    <div className="w-20 h-1 bg-slate-800 rounded-full mt-1">
                      <div className={cn("h-full rounded-full", group.color)} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverUnderAnalysis;