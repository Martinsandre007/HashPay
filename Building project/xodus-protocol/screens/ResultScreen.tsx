
import React from 'react';

interface Props {
  onReturn: () => void;
}

const ResultScreen: React.FC<Props> = ({ onReturn }) => {
  return (
    <div className="flex-1 flex flex-col h-screen pb-32 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 border-b border-primary/20 p-4 z-10 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">terminal</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">System Log: S7-Alpha</span>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer">share</span>
          <span onClick={onReturn} className="material-symbols-outlined text-white cursor-pointer">close</span>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full">
        <section className="relative p-12 overflow-hidden text-center space-y-3">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center -z-10" style={{ backgroundImage: 'url("https://picsum.photos/seed/ruin/800/600")' }} />
          <div className="inline-block px-4 py-1 border border-primary/40 bg-primary/10 rounded italic font-black text-[9px] uppercase tracking-[0.3em] text-primary">Sector 7 Secure</div>
          <h1 className="text-5xl font-black italic tracking-tighter leading-none uppercase glow-text">MISSION ACCOMPLISHED</h1>
          <p className="text-xs text-primary/60 font-black tracking-widest uppercase">Objective: Scavenge the Void Cores</p>
        </section>

        <section className="px-6 grid grid-cols-2 gap-4 -mt-6">
          <div className="bg-background-dark border border-primary/30 p-5 rounded-xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary/40 mb-1">Total XP Earned</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black text-white italic leading-none">+2,450</h2>
              <span className="text-[9px] text-green-500 font-bold">+15%</span>
            </div>
          </div>
          <div className="bg-background-dark border border-primary/30 p-5 rounded-xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary/40 mb-1">$XODUS Scavenged</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black text-primary italic leading-none">45.20</h2>
              <span className="text-[9px] font-bold text-primary/60 ml-1">SUI</span>
            </div>
          </div>
        </section>

        <section className="mt-12 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Gear & Fragments</h3>
            <div className="h-px flex-1 bg-primary/10 ml-4" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex-none w-44 bg-primary/5 border border-primary/20 rounded-xl p-4 relative">
              <span className="absolute top-0 right-0 p-1.5 bg-primary text-black material-symbols-outlined text-xs">star</span>
              <div className="aspect-square bg-background-dark/50 rounded-lg mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/30">developer_board</span>
              </div>
              <p className="text-[9px] font-black text-primary uppercase mb-0.5">Epic Fragment</p>
              <p className="text-xs font-black uppercase text-white italic">Void Core Chip [01]</p>
            </div>
            <div className="flex-none w-44 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="aspect-square bg-background-dark/50 rounded-lg mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-white/10">shield_with_heart</span>
              </div>
              <p className="text-[9px] font-black text-white/40 uppercase mb-0.5">Common Gear</p>
              <p className="text-xs font-black uppercase text-white/80 italic">Rusty Optics v2</p>
            </div>
          </div>
        </section>

        <section className="mt-12 px-6 space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Rank Progression</p>
                <h4 className="text-xl font-black italic uppercase leading-none mt-1">Level 24 <span className="text-[10px] font-normal not-italic text-white/40 ml-1">SCAVENGER</span></h4>
              </div>
              <p className="text-[10px] font-black italic text-primary/60">8,450 / 10,000 XP</p>
            </div>
            <div className="h-3 bg-primary/10 border border-primary/20 rounded-full overflow-hidden p-0.5 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
              <div className="h-full bg-primary rounded-full shadow-[0_0_15px_#f2b90d]" style={{ width: '84.5%' }} />
            </div>
          </div>
        </section>

        <section className="mt-16 px-6 italic text-center">
          <div className="p-6 bg-primary/5 border-l-2 border-primary/40 rounded-r relative">
            <p className="text-xs leading-relaxed text-white/70">"The air in Sector 7 still tastes of copper and burnt circuitry. We extracted the cores before the Enforcers could triangulate. XODUS is rising."</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/30 mt-4">— UNKNOWN SCAVENGER</p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-background-dark/95 border-t border-primary/20 backdrop-blur-xl z-20">
        <div className="max-w-md mx-auto">
          <button 
            onClick={onReturn}
            className="w-full h-16 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-xl shadow-[0_0_30px_rgba(242,185,13,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">home</span>
            RETURN TO BASE
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ResultScreen;
