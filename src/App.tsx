import { useState } from 'react';
import { Toaster } from 'sonner';
import { Market, MARKETS, AnalysisMode } from './types';
import { useTickStream } from './hooks/useTickStream';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TickHistory from './components/TickHistory';
import EvenOddAnalysis from './components/analysis/EvenOddAnalysis';
import OverUnderAnalysis from './components/analysis/OverUnderAnalysis';
import MatchesDiffersAnalysis from './components/analysis/MatchesDiffersAnalysis';
import RiseFallAnalysis from './components/analysis/RiseFallAnalysis';
import { Tabs, TabsContent } from '@/components/ui/tabs';

function App() {
  const [currentMarket, setCurrentMarket] = useState<Market>(MARKETS[0]);
  const [activeMode, setActiveMode] = useState<AnalysisMode>('even-odd');
  const [tickLimit, setTickLimit] = useState(100);
  
  const { ticks, currentPrice } = useTickStream(currentMarket, tickLimit);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeMode={activeMode} onModeChange={setActiveMode} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          currentMarket={currentMarket} 
          onMarketChange={setCurrentMarket} 
          price={currentPrice}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto py-8 px-6">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                  {activeMode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' / ')}
                </h2>
                <p className="text-slate-400 text-sm">
                  Real-time algorithmic analysis for {currentMarket.name}
                </p>
              </div>

              <div className="bg-slate-900/20 border border-slate-800/50 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
                {activeMode === 'even-odd' && <EvenOddAnalysis ticks={ticks} />}
                {activeMode === 'over-under' && <OverUnderAnalysis ticks={ticks} />}
                {activeMode === 'matches-differs' && <MatchesDiffersAnalysis ticks={ticks} />}
                {activeMode === 'rise-fall' && <RiseFallAnalysis ticks={ticks} />}
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Accuracy</span>
                    <span className="text-2xl font-bold text-white">94.2%</span>
                    <p className="text-slate-400 text-xs">Based on last 500 patterns</p>
                 </div>
                 <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Volatility</span>
                    <span className="text-2xl font-bold text-amber-500">High</span>
                    <p className="text-slate-400 text-xs">Market trend is aggressive</p>
                 </div>
                 <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Status</span>
                    <span className="text-2xl font-bold text-emerald-500">Synced</span>
                    <p className="text-slate-400 text-xs">Latency: 142ms</p>
                 </div>
              </div>
            </div>
          </div>
          
          <TickHistory ticks={ticks} />
        </div>
      </main>
      
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}

export default App;