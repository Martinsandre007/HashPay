
import React from 'react';

const MasteryScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-primary/20 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer">arrow_back</span>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">MK-7 Railgun</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] bg-primary text-black font-black px-1.5 rounded-sm">LEGENDARY</span>
              <span className="text-[9px] text-primary/70 tracking-widest uppercase font-bold">Hardware Ver. 4.2.0</span>
            </div>
          </div>
        </div>
        <span className="material-symbols-outlined text-primary">info</span>
      </header>

      <main className="p-6 space-y-10 max-w-4xl mx-auto w-full">
        {/* Railgun Hero */}
        <section className="relative aspect-video w-full bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center overflow-hidden border border-primary/20 rounded-xl">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA3f0F76ICOMrHXCWm4_YdaY5H2SVtAZyZsnp-pCAG3xRXgeZaWG3bPdCQQrGVDvtttqq92YVRpE7ffmbtwZyV77Zl1ZfzfrIaTLZ9H1hBI-B6ucAtW3OyVm_9zUInnri5Wx1NNc4HuRqBZM3tyMkZ6BZU4bZQFR3Bxac5Kz4jNN5hnIJjZ5l4jFG76Ofrd28OotaH-V60dhfxgcGaEJfmbf04l1_vimEqrXB39OtGU4p-7PnWMcumw3er09jtMu0t6J1chzfnhvY" className="w-4/5 drop-shadow-[0_0_40px_#f2b90d]" alt="railgun" />
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[9px] text-primary/60 font-black tracking-widest uppercase">Targeting Systems</p>
              <div className="flex gap-1 h-1.5"><div className="w-6 bg-primary" /><div className="w-6 bg-primary" /><div className="w-6 bg-primary/20" /></div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-primary/60 font-black tracking-widest uppercase">Sync Status</p>
              <p className="text-xs font-black text-primary italic leading-none">OPTIMAL</p>
            </div>
          </div>
        </section>

        {/* Progression */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-primary text-[10px] font-black tracking-widest uppercase">Mastery Progress</p>
              <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">LVL 42<span className="text-primary/40 text-xl not-italic ml-2">/ 50</span></h2>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">XP to Evolution</p>
              <p className="text-primary font-black italic">2,450 XP</p>
            </div>
          </div>
          <div className="flex gap-1 h-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex-1 ${i < 8 ? 'bg-primary shadow-[0_0_5px_#f2b90d]' : 'bg-primary/10'}`} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-3 gap-4">
          {[ { l: 'Kill Counter', v: '12,402' }, { l: 'Precision', v: '38.4%' }, { l: 'Damage', v: '1.2M' } ].map(s => (
            <div key={s.l} className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{s.l}</p>
              <p className="text-2xl font-black text-primary italic tracking-tighter leading-none">{s.v}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black tracking-[0.2em] text-primary border-l-4 border-primary pl-4 uppercase">Evolution Path</h3>
          <div className="flex gap-10 overflow-x-auto pb-4 no-scrollbar relative">
            <div className="absolute top-8 left-1/2 right-0 h-px bg-primary/20 -z-10" />
            {[
              { lvl: 'LVL 25', status: 'COMPLETED', active: true, icon: 'verified' },
              { lvl: 'LVL 42', status: 'ACTIVE', active: true, icon: 'model_training' },
              { lvl: 'LVL 50', status: 'LOCKED', active: false, icon: 'lock' }
            ].map(node => (
              <div key={node.lvl} className={`flex flex-col items-center gap-3 shrink-0 w-32 ${!node.active ? 'opacity-30' : ''}`}>
                <div className={`size-16 rounded-full flex items-center justify-center border-2 transition-all ${node.active ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(242,185,13,0.3)]' : 'bg-white/5 border-white/20'}`}>
                  <span className={`material-symbols-outlined text-3xl ${node.active ? 'text-primary' : 'text-white/20'}`}>{node.icon}</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-white italic">{node.lvl}</p>
                  <p className="text-[9px] font-black text-primary uppercase mt-0.5 tracking-widest">{node.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MasteryScreen;
