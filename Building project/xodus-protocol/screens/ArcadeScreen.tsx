
import React from 'react';

const ArcadeScreen: React.FC = () => {
  const leaders = [
    { rank: '01', name: 'VOID_RUNNER', score: '4,291,005', faction: 'SYNTH', status: 'Online', color: 'text-primary' },
    { rank: '02', name: 'XERO_DAY', score: '3,812,440', faction: 'CORP', status: 'Offline', color: 'text-slate-400' },
    { rank: '03', name: 'NEON_VULTURE', score: '3,105,920', faction: 'REBEL', status: 'Offline', color: 'text-amber-700' }
  ];

  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-primary/20 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">grid_view</span>
          <h2 className="text-xl font-black italic tracking-tighter text-primary uppercase glow-text">XODUS <span className="text-white">ARCADE</span></h2>
        </div>
        <div className="flex gap-2">
          <span className="material-symbols-outlined text-primary cursor-pointer p-2">search</span>
          <span className="material-symbols-outlined text-primary cursor-pointer p-2">notifications</span>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-8">
        <section className="bg-surface-dark border border-primary/30 p-8 rounded-xl relative overflow-hidden neon-border">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="material-symbols-outlined text-[120px] text-primary rotate-12">shield</span>
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-primary/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Personal Standing</p>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">OPERATIVE: <span className="text-primary">CYBER_GHOST</span></h3>
              </div>
              <div className="bg-primary text-black px-4 py-1 rounded font-black text-2xl italic shadow-[0_0_20px_rgba(242,185,13,0.3)]">#124</div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-primary/10 pt-6">
              <div>
                <p className="text-primary/50 text-[9px] font-black uppercase tracking-widest mb-1">Current Score</p>
                <p className="text-2xl font-black italic tracking-widest text-white leading-none">1,482,900</p>
              </div>
              <div>
                <p className="text-primary/50 text-[9px] font-black uppercase tracking-widest mb-1">Faction</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">group</span>
                  <p className="text-sm font-black uppercase text-white tracking-widest italic">REBEL_UNDERGROUND</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="flex bg-surface-dark p-1.5 rounded-xl border border-primary/10">
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-primary text-black rounded-lg">Global Top 100</button>
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-primary/40">Faction War</button>
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-primary/40">Allies</button>
        </nav>

        <div className="space-y-2">
          <div className="grid grid-cols-[3.5rem_1fr_6rem_6rem] text-[9px] font-black uppercase text-primary/30 tracking-widest px-4 mb-2">
            <span>Rank</span><span>Operative</span><span className="text-center">Faction</span><span className="text-right">Score</span>
          </div>
          
          <div className="space-y-1.5">
            {leaders.map((l) => (
              <div key={l.rank} className={`grid grid-cols-[3.5rem_1fr_6rem_6rem] items-center py-4 bg-primary/5 border border-primary/10 rounded-xl relative group transition-all hover:border-primary/40 ${l.rank === '01' ? 'border-primary/40 bg-primary/10' : ''}`}>
                {l.rank === '01' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                <div className="text-center">
                  <span className={`text-2xl font-black italic ${l.color}`}>{l.rank}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-primary/10 rounded border border-primary/20 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${l.name}/80/80`} className="size-full object-cover grayscale opacity-80" alt="pfp" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase italic group-hover:text-primary transition-colors">{l.name}</p>
                    <div className="flex items-center gap-1">
                      <span className={`size-1.5 rounded-full ${l.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`} />
                      <span className="text-[8px] text-white/30 uppercase font-black">{l.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <span className={`px-2 py-0.5 rounded border border-primary/20 text-[8px] font-black italic tracking-widest ${l.faction === 'REBEL' ? 'text-primary' : l.faction === 'CORP' ? 'text-blue-500' : 'text-red-500'}`}>{l.faction}</span>
                </div>
                <div className="text-right pr-6 font-mono font-bold text-sm">
                  <span className={l.rank === '01' ? 'text-primary' : 'text-white/60'}>{l.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-10">
          <div className="w-16 h-1 bg-primary/10 rounded-full overflow-hidden"><div className="h-full bg-primary animate-[shimmer_2s_infinite]" /></div>
          <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em]">Syncing Data Stream...</p>
        </div>
      </main>
    </div>
  );
};

export default ArcadeScreen;
