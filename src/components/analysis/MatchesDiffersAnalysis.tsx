import React, { useMemo } from 'react';
import { Tick } from '../../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

interface MatchesDiffersAnalysisProps {
  ticks: Tick[];
}

const MatchesDiffersAnalysis: React.FC<MatchesDiffersAnalysisProps> = ({ ticks }) => {
  const data = useMemo(() => {
    const counts = new Array(10).fill(0);
    ticks.forEach(t => counts[t.digit]++);
    
    return counts.map((count, digit) => ({
      digit: digit.toString(),
      count,
      percentage: Math.round((count / ticks.length) * 100) || 0,
    }));
  }, [ticks]);

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Digit Frequency (0-9)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="digit" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.count === maxCount ? '#f59e0b' : '#334155'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.map((d) => (
          <div 
            key={d.digit} 
            className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex flex-col items-center gap-1"
          >
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Digit {d.digit}</span>
            <span className="text-xl font-bold text-slate-100">{d.percentage}%</span>
            <div className="w-full bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${d.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesDiffersAnalysis;