
import React from 'react';

interface Props {
  onReady: () => void;
}

const LobbyScreen: React.FC<Props> = ({ onReady }) => {
  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            XODUS <span className="text-primary/70 font-light">// LOBBY</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-primary/40 uppercase tracking-[0.2em]">Connection Status</span>
            <span className="text-xs font-mono font-bold">LATENCY: 24MS</span>
          </div>
          <span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-90 transition-transform">settings</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left: Squad & Chat */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <section className="bg-surface-dark border border-primary/20 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Squad_Status [3/4]</h2>
              <span className="text-[9px] px-2 py-0.5 border border-primary/30 rounded text-primary font-bold">TACTICAL_HUD_ACTIVE</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-primary/10 border-l-4 border-primary rounded-r">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkN6R2N3Fg5SC8VHbsEBE_oyqa4t0Ns_gxvDAL1NH3Jkj6OtTPcoox8Kig9rDamVC3PRqj59yL2IjlNzkqOA9HK-DsYP-sMghKoo-dHmNMlbUXNb3UKYzPazbxMi4ZjffhL2jHCCfjZd2m5R-uLS_lArS36AN8UO2Mn84dGxyruEnMGh7Je00KNOuAH_JaLM2eLLXCNM_oXVnu55brpbuBWtVrvT_ozO18dm6eJtiz41NTyKvvnGxEhTKrHIFZhuxQze2HwwSPgM4" className="size-12 rounded bg-black border border-primary/30" alt="me" />
                    <div className="absolute -bottom-1 -right-1 size-3.5 bg-green-500 rounded-full border-2 border-background-dark"></div>
                  </div>
                  <div>
                    <p className="font-black text-[10px] uppercase">User_Zero <span className="text-primary">[YOU]</span></p>
                    <p className="text-[9px] text-primary/60 font-bold uppercase tracking-widest">Role: Sniper</p>
                  </div>
                </div>
                <div className="flex gap-2 text-primary">
                  <span className="material-symbols-outlined text-lg animate-pulse">graphic_eq</span>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
              </div>

              {[ 'Valkyrie_99', 'Iron_Clad' ].map((n, i) => (
                <div key={n} className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded bg-black border border-white/10" />
                    <div>
                      <p className="font-black text-[10px] uppercase text-white/80">{n}</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Role: {i === 0 ? 'Medic' : 'Demolition'}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-white/20">{i === 0 ? 'mic' : 'mic_off'}</span>
                </div>
              ))}

              <button className="w-full p-4 border-2 border-dashed border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all rounded flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary">person_add</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary">Invite Operative</span>
              </button>
            </div>
          </section>

          <section className="bg-surface-dark border border-primary/20 rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-primary/20 bg-primary/5 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Comm_Channel // Global</span>
              <span className="text-[8px] text-white/30">4,201 ONLINE</span>
            </div>
            <div className="flex-1 p-4 text-[10px] font-mono space-y-3 overflow-y-auto custom-scrollbar">
              <p><span className="text-primary/60">[SYSTEM]:</span> <span className="opacity-70">Sector 7-B stability dropping.</span></p>
              <p><span className="text-blue-400">Cyber_Punk:</span> <span className="opacity-70">LFG Hub-Zero raid, need high DPS.</span></p>
              <p><span className="text-primary">User_Zero:</span> <span className="opacity-70">Ready to drop. Sniper active.</span></p>
              <p><span className="text-primary/60">[SYSTEM]:</span> <span className="opacity-70">Iron_Clad has joined the lobby.</span></p>
            </div>
            <div className="p-3 bg-black/40 flex items-center gap-2">
              <input type="text" placeholder="TYPE MESSAGE..." className="flex-1 bg-transparent border-none focus:ring-0 text-[10px] uppercase font-bold" />
              <span className="material-symbols-outlined text-primary cursor-pointer text-sm">send</span>
            </div>
          </section>
        </div>

        {/* Center: Search & Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-dark border border-primary/30 rounded-xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden neon-border">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"><div className="h-full bg-primary w-2/3 shadow-[0_0_10px_#f2b90d]" /></div>
            <span className="material-symbols-outlined text-primary text-5xl mb-4 animate-pulse">radar</span>
            <h2 className="text-xl font-black italic tracking-[0.2em] uppercase text-white mb-2">Searching for Operatives...</h2>
            <p className="text-[10px] font-mono text-primary/60 tracking-widest">ESTIMATED: 00:45 | ELAPSED: 00:32</p>
          </div>

          <div className="bg-surface-dark border border-primary/20 rounded-xl p-6 flex flex-col gap-6">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-center">Select Faction Identity</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-8 bg-primary/10 border border-primary rounded-lg flex flex-col items-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(242,185,13,0.1)]">
                <span className="material-symbols-outlined text-primary text-5xl">skull</span>
                <p className="font-black text-lg italic tracking-widest text-white">REBELS</p>
                <p className="text-[9px] font-mono text-primary/60 text-center uppercase">Resistance Underground</p>
              </button>
              <button className="p-8 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center gap-3 transition-all grayscale hover:grayscale-0">
                <span className="material-symbols-outlined text-white/20 text-5xl">domain</span>
                <p className="font-black text-lg italic tracking-widest text-white/40">CORPORATE</p>
                <p className="text-[9px] font-mono text-white/20 text-center uppercase">Enforcer Units</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-dark border border-primary/20 rounded-xl p-5 flex-1 flex flex-col">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Loadout_Preview</h3>
            <div className="space-y-4 flex-1">
              {[ { label: 'Primary Weapon', val: 'M-42 Vulcan Sniper', icon: 'target' }, { label: 'Tactical', val: 'Cloaking Field', icon: 'visibility_off' }, { label: 'Equipment', val: 'EMP Grenade [x2]', icon: 'bolt' } ].map(i => (
                <div key={i.label} className="p-3 bg-white/5 border border-white/5 rounded">
                  <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">{i.label}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-white/80">{i.val}</span>
                    <span className="material-symbols-outlined text-primary text-sm">{i.icon}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-primary/40 text-primary font-black uppercase tracking-widest text-[9px] rounded hover:bg-primary hover:text-black transition-all">
              Customize Loadout
            </button>
          </div>

          <div className="space-y-3">
            <button onClick={onReady} className="w-full h-20 bg-primary text-black font-black text-2xl italic tracking-[0.2em] uppercase rounded-xl shadow-[0_0_40px_rgba(242,185,13,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl">verified</span>
              READY UP
            </button>
            <button className="w-full py-4 border border-red-500/30 text-red-500 font-black uppercase text-[10px] tracking-widest rounded hover:bg-red-500/10 transition-all">
              Leave Squad
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LobbyScreen;
