import React from 'react';
import { 
  BarChart3, 
  Binary, 
  TrendingUp, 
  Hash, 
  Settings2,
  ChevronRight
} from 'lucide-react';
import { AnalysisMode } from '../types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeMode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMode, onModeChange }) => {
  const menuItems = [
    { id: 'even-odd', label: 'Even / Odd', icon: Binary },
    { id: 'over-under', label: 'Over / Under', icon: BarChart3 },
    { id: 'matches-differs', label: 'Matches / Differs', icon: Hash },
    { id: 'rise-fall', label: 'Rise / Fall', icon: TrendingUp },
  ];

  return (
    <div className="w-64 h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 p-4 flex flex-col gap-6">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
          <TrendingUp className="text-slate-900 w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight">DERIV ANALYST</h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">v2.0 Professional</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMode === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onModeChange(item.id as AnalysisMode)}
              className={cn(
                "group flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300")} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button className="flex items-center gap-3 p-3 w-full text-slate-400 hover:text-slate-200 transition-colors">
          <Settings2 className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;