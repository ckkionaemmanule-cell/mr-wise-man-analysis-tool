import React, { useMemo } from 'react';
import { Tick } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface EvenOddAnalysisProps {
  ticks: Tick[];
}

const EvenOddAnalysis: React.FC<EvenOddAnalysisProps> = ({ ticks }) => {
  const stats = useMemo(() => {
    const total = ticks.length;
    if (total === 0) return { even: 0, odd: 0, evenPct: 0, oddPct: 0 };
    
    const even = ticks.filter(t => t.digit % 2 === 0).length;
    const odd = total - even;
    
    return {
      even,
      odd,
      evenPct: Math.round((even / total) * 100),
      oddPct: Math.round((odd / total) * 100),
    };
  }, [ticks]);

  const data = [
    { name: 'Even', value: stats.even, color: '#f59e0b' },
    { name: 'Odd', value: stats.odd, color: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Distribution Ratio
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 -mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-400 text-sm">Even ({stats.evenPct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-slate-400 text-sm">Odd ({stats.oddPct}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Even Frequency</span>
                  <span className="text-amber-500 font-bold">{stats.evenPct}%</span>
                </div>
                <Progress value={stats.evenPct} className="h-2 bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Odd Frequency</span>
                  <span className="text-purple-500 font-bold">{stats.oddPct}%</span>
                </div>
                <Progress value={stats.oddPct} className="h-2 bg-slate-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl h-fit">
                <AlertCircle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-amber-500 font-bold mb-1">Signal Strategy</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {stats.evenPct > 60 
                    ? "Significant Even bias detected. Probability of Odd follow-up is increasing."
                    : stats.oddPct > 60
                    ? "Significant Odd bias detected. Probability of Even follow-up is increasing."
                    : "No strong bias detected. Market is currently balanced."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvenOddAnalysis;