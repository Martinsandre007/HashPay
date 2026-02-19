
import React from 'react';

const SafehouseScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-hidden relative">
      <header className="px-6 py-4 border-b border-primary/20 bg-background-dark/80 backdrop-blur-md flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded bg-primary/10 border border-primary flex items-center justify-center text-primary neon-border">
            <span className="material-symbols-outlined text-3xl">shield_person</span>
          </div>
          <div>
            <h1 className="text-xl font-black italic uppercase leading-none">Safehouse: <span className="text-primary">The Nest</span></h1>
            <p className="text-[9px] text-primary/60 font-bold uppercase tracking-[0.2em] mt-1">Sector 7 - Undercity Hub</p>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="hidden md:block text-right">
            <p className="text-[9px] text-primary/40 font-black uppercase">Network Status</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-primary font-black text-xs italic tracking-widest">SECURE / ENCRYPTED</span>
              <div className="size-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
          <img src="https://picsum.photos/seed/face/40/40" className="size-10 rounded-full border border-primary/30 grayscale" alt="user" />
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Gear Sidebar */}
        <aside className="w-72 bg-black/40 border-r border-primary/10 p-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center">
            <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Armory / Gear Rack</h3>
            <span className="material-symbols-outlined text-primary text-sm">settings_input_component</span>
          </div>
          <div className="space-y-3">
            {[ 
              { mk: 'MK-IV', name: '"Dragon Breath" SMG', status: 'READY', p: 85 },
              { mk: 'PULSE', name: 'Heavy Ion Blade', status: 'REPAIRING', p: 20, bad: true },
              { mk: 'TECH', name: 'XODUS Deck Mk II', status: 'EQUIPPED', p: 100 }
            ].map((g, i) => (
              <div key={i} className={`p-4 border border-primary/20 bg-primary/5 rounded-lg group hover:border-primary transition-all cursor-pointer ${g.bad ? 'opacity-50' : ''}`}>
                <div className="flex justify-between text-[8px] font-black uppercase mb-1.5">
                  <span className={`px-1 rounded-sm ${g.bad ? 'border border-primary/30 text-primary/40' : 'bg-primary text-black'}`}>{g.mk}</span>
                  <span className={g.bad ? 'text-red-500' : 'text-primary/60'}>{g.status}</span>
                </div>
                <p className="text-[11px] font-black uppercase italic tracking-wide group-hover:text-primary mb-2">{g.name}</p>
                <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                  <div className={`h-full ${g.bad ? 'bg-red-500' : 'bg-primary shadow-[0_0_8px_#f2b90d]'}`} style={{ width: `${g.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Planning Table */}
        <section className="flex-1 relative flex flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(242,185,13,0.1)_0%,_transparent_70%)]" />
          
          <div className="absolute top-10 w-full max-w-2xl flex items-end justify-between border-b border-primary/30 pb-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Tactical Projection: Neo-Lagos Hub</h3>
            </div>
            <span className="text-[8px] font-mono text-primary/40">ZOOM: 250% | ALT: 120M</span>
          </div>

          <div className="w-full max-w-3xl aspect-video bg-background-dark/80 border border-primary/30 rounded-xl relative overflow-hidden group shadow-[0_0_50px_rgba(242,185,13,0.1)]">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo53ECfvUAP5BVAnRiwcq5Ci8Po23LYaYwiALibOz0tJt-PO-PRk6DzV5iOZzSRnrpkYUkBWCzh6Wt7onK80NBCyJMDDTfypKMpgdxqQufFpzSGerXJFEtgapJwu2p_giWPjU0J3i64WZL4_ys1d0vhazSm6068q2zeop-SKIBQuD0b6HCoq-SEc3u9LbQOBYwiKCbaCyqR4W6lGtNPIQB-3NfASaCetBKjunS3X0LSee_biuMwZrHAOD_qYOadxEBuFIo_t_u0jE" className="size-full object-cover mix-blend-screen opacity-60 contrast-150 grayscale brightness-150" alt="map" />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(242, 185, 13, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 185, 13, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
              <div className="size-4 border-2 border-primary rounded-full animate-ping mb-1" />
              <div className="px-2 py-0.5 bg-primary/90 text-black text-[8px] font-black italic rounded">TARGET: SERVER ROOM</div>
            </div>

            <button className="absolute bottom-6 left-1/2 -translate-x-1/2 h-14 bg-primary text-black font-black uppercase px-12 rounded italic tracking-[0.2em] shadow-[0_0_30px_#f2b90d] hover:scale-105 active:scale-95 transition-all">
              Initiate Mission
            </button>
          </div>
        </section>

        {/* Crew Sidebar */}
        <aside className="w-80 bg-black/40 border-l border-primary/10 p-6 flex flex-col gap-8">
          <div>
            <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">groups</span> Crew At Base
            </h3>
            <div className="space-y-3">
              {[ 'GHOST-7', 'M4Y4' ].map((c, i) => (
                <div key={c} className="flex items-center gap-4 p-3 bg-white/5 border border-primary/5 rounded hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className={`size-10 border relative ${i === 0 ? 'border-primary' : 'border-white/10 opacity-50'}`}>
                    <img src={`https://picsum.photos/seed/${c}/40/40`} className="size-full grayscale object-cover" alt="crew" />
                    {i === 0 && <div className="absolute bottom-0 right-0 size-2 bg-primary" />}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-primary' : 'text-white/40'}`}>{c}</p>
                    <p className="text-[9px] font-mono italic text-white/40 line-clamp-1">{i === 0 ? '"Check the back door."' : 'IN DEEP DIVE'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">nightlife</span> Safehouse Lounge
            </h3>
            <div className="flex-1 bg-black/60 border border-primary/5 rounded-lg relative overflow-hidden group">
              <img src="https://picsum.photos/seed/cyber-room/400/300" className="size-full object-cover grayscale opacity-20 contrast-150 group-hover:scale-110 transition-all duration-[5s]" alt="room" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span className="material-symbols-outlined text-primary/20 text-4xl mb-2">music_note</span>
                <p className="text-[8px] font-mono text-primary/40 uppercase tracking-tighter">Lo-Fi Resistance Radio</p>
                <div className="flex items-end gap-1 h-3 mt-2">
                  <div className="w-1 bg-primary/30 h-1/2 animate-[bounce_1s_infinite]" /><div className="w-1 bg-primary h-full animate-[bounce_1.2s_infinite]" /><div className="w-1 bg-primary/40 h-1/3 animate-[bounce_0.8s_infinite]" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-primary/10 font-black italic text-2xl uppercase rotate-[-5deg] select-none">XODUS RISING</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SafehouseScreen;
