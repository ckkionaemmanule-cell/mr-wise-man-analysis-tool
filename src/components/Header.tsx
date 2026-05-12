import React from 'react';
import { Market, MARKETS } from '../types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface HeaderProps {
  currentMarket: Market;
  onMarketChange: (market: Market) => void;
  price: number;
}

const Header: React.FC<HeaderProps> = ({ currentMarket, onMarketChange, price }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-48">
          <Select 
            value={currentMarket.id} 
            onValueChange={(val) => onMarketChange(MARKETS.find(m => m.id === val) || MARKETS[0])}
          >
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200 h-10">
              <SelectValue placeholder="Select Market" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
              {MARKETS.map(m => (
                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-800/30 rounded-full border border-slate-700/50">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-slate-400 text-xs font-medium uppercase">Live Stream</span>
          <div className="w-px h-3 bg-slate-700 mx-1" />
          <span className="text-emerald-400 font-mono font-bold tracking-tight">
            {price.toFixed(3)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-amber-500/30 text-amber-500 bg-amber-500/5">
          PRO PLAN
        </Badge>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 shadow-lg" />
      </div>
    </header>
  );
};

export default Header;