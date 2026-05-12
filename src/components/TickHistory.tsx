import React from 'react';
import { Tick } from '../types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';

interface TickHistoryProps {
  ticks: Tick[];
}

const TickHistory: React.FC<TickHistoryProps> = ({ ticks }) => {
  return (
    <div className="w-80 border-l border-slate-800 bg-slate-900/30 flex flex-col">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-300 text-sm uppercase tracking-wider">Live Feed</h3>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="divide-y divide-slate-800/50">
          {ticks.map((tick, i) => (
            <div 
              key={tick.id} 
              className={cn(
                "p-4 flex items-center justify-between transition-colors duration-300",
                i === 0 ? "bg-amber-500/5" : "hover:bg-slate-800/20"
              )}
            >
              <div className="flex flex-col">
                <span className={cn(
                  "text-sm font-mono font-bold",
                  tick.type === 'up' ? "text-emerald-400" : "text-rose-400"
                )}>
                  {tick.price.toFixed(3)}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {new Date(tick.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border-2",
                tick.digit % 2 === 0 
                  ? "border-amber-500/20 bg-amber-500/10 text-amber-500" 
                  : "border-purple-500/20 bg-purple-500/10 text-purple-500"
              )}>
                {tick.digit}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 bg-slate-900/80 border-t border-slate-800 text-[10px] text-center text-slate-500 uppercase tracking-widest font-bold">
        Last {ticks.length} Ticks Loaded
      </div>
    </div>
  );
};

export default TickHistory;