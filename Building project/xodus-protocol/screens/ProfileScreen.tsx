
import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="p-6 border-b border-primary/20 sticky top-0 bg-background-dark/95 backdrop-blur-md z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
          <div>
            <p className="text-[9px] font-bold text-primary/60 uppercase tracking-[0.2em]">System_Link: Online</p>
            <h1 className="text-lg font-black uppercase italic leading-none">OPERATIVE_ID: CYBER_GHOST</h1>
          </div>
        </div>
        <button className="size-10 rounded border border-primary/20 text-primary flex items-center justify-center bg-primary/5">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="p-8 max-w-4xl mx-auto w-full space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <div 
                className="size-48 bg-primary/20 p-1 glow-amber animate-pulse" 
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                <div 
                  className="size-full bg-background-dark overflow-hidden relative"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                >
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCB2yMUAGnwwO5I4mMDVYgLWGoCNuYBCB01t8aunw8ELzGKw_eL33eQtX8cf8RhT8wpRlyACx-LldQ3v4zIDEmJfhrla34m6WU8uWx4AAG-lS5Mw-uqe7K9l4GVLLzmCcLLnpcIPDLnN7jFuwI5Xth8kGd-pKqXaYqFc9xEjy3_eEZfvtqlS5kzlG48SjXeekZvZO3L_jxgwFedqacoFRcMDDBRoZEznDJQ04tPj8cWSz8S4F3icXASycZ-LCmh0TasFNFNcW5dV8" className="size-full object-cover mix-blend-screen opacity-80" alt="avatar" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-black font-black px-4 py-1 rounded italic skew-x-[-12deg] text-xl border-2 border-background-dark">
                LVL 42
              </div>
            </div>
          </div>
          
          <div className="md:col-span-8 space-y-6">
            <div>
              <p className="text-primary text-[10px] font-black tracking-widest uppercase mb-1">Assigned Sector: XODUS_7</p>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Elite Infiltrator</h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black tracking-widest text-primary/60">
                <span>RANK PROGRESSION</span>
                <span>12,450 / 15,000 XP</span>
              </div>
              <div className="h-4 bg-primary/10 border border-primary/20 rounded-full overflow-hidden p-1">
                <div className="h-full bg-primary rounded-full relative" style={{ width: '75%' }}>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
                </div>
              </div>
              <p className="text-right text-[9px] text-primary/40 font-bold tracking-widest uppercase italic">Next_Rank: Ghost_Commander</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Credits', value: '452.8K', delta: '+12%', icon: 'account_balance_wallet' },
            { label: 'Bio-Data Units', value: '1,204', delta: '+5%', icon: 'biotech' },
            { label: 'Missions Comp', value: '89', sub: 'TOP 5%', icon: 'target' }
          ].map((stat) => (
            <div key={stat.label} className="bg-primary/5 border border-primary/20 p-6 rounded-xl relative group hover:border-primary/50 transition-all overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -top-4 text-[100px] text-primary/5 group-hover:opacity-10 transition-opacity">{stat.icon}</span>
              <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black italic text-white">{stat.value}</span>
                {stat.delta && <span className="text-green-400 text-xs font-bold leading-none">{stat.delta}</span>}
                {stat.sub && <span className="text-primary text-[10px] font-black leading-none">{stat.sub}</span>}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-xs font-black tracking-[0.3em] uppercase border-l-4 border-primary pl-4">Faction Alignment</h4>
            <div className="bg-primary/5 border border-white/5 p-6 rounded-xl space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-primary tracking-widest">
                  <span>THE RESISTANCE</span>
                  <span>82%</span>
                </div>
                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary glow-amber" style={{ width: '82%' }} />
                </div>
              </div>
              <div className="space-y-2 opacity-40">
                <div className="flex justify-between text-[10px] font-black text-white/40 tracking-widest">
                  <span>APEX CORPORATION</span>
                  <span>18%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20" style={{ width: '18%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black tracking-[0.3em] uppercase border-l-4 border-primary pl-4">Merit Badges</h4>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {[ { icon: 'bolt', label: 'Arcade_God' }, { icon: 'shield', label: 'Survivor_X' }, { icon: 'lock', label: 'Shadow_Op' } ].map((b, i) => (
                <div key={b.label} className={`flex flex-col items-center gap-3 shrink-0 ${i === 2 ? 'opacity-30 grayscale' : ''}`}>
                  <div className="size-16 bg-primary/20 border border-primary/40 rotate-45 flex items-center justify-center hover:rotate-90 transition-transform duration-500 cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-3xl -rotate-45">{b.icon}</span>
                  </div>
                  <span className="text-[9px] font-black text-primary/80 uppercase tracking-tighter">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileScreen;
