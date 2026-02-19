
import React, { useState } from 'react';
import MissionModal, { MissionDetail } from '../components/MissionModal';

const ForgeScreen: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<MissionDetail | null>(null);

  const mainMission: MissionDetail = {
    title: "Supply Line Sabotage",
    description: "Infiltrate the Central Logistics Hub and plant EMP charges on main conduits. Disrupting the Empire's supply line is critical for our next phase of expansion.",
    objectives: [
      "Infiltrate Sector 7 Logistics Hub",
      "Plant EMP Charges on Conduits [0/3]",
      "Disable Surveillance Network",
      "Exfiltrate via North Perimeter"
    ],
    rewards: [
      { label: "Contract Pay", value: "800 SCRAP" },
      { label: "Reputation", value: "+150 XODUS" }
    ],
    risk: "High",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNhrwlUbVSBcc8fmIlz09nPLF464EUjqlqHGlBXLp9yHpsYJqnbwkqOYCP827oYcwpZmHrPDrBSxfugBkRsmMWdJzOJcA6IFcRQGeKo2qGya4kmCSo533yh9VdtbAAycBYJxgwlCxJpV_GVdiaohOEGRZHrLxE7HpjfngGwwFy-9vrTVTvSSpGJuur8roPponUPkO8KWB82YIxMH7vVIgZVAD4nLMGHjpg94t4QcrZyfz2lPz7-gU5VYiRHEd1696_fG0cy-9sbgA"
  };

  return (
    <div className="flex-1 flex flex-col pb-24 h-screen overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-primary/20 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-primary/30 rounded bg-primary/10">
            <span className="material-symbols-outlined text-primary">terminal</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest uppercase leading-none italic">THE FORGE</h1>
            <p className="text-[9px] text-primary/60 font-medium uppercase tracking-tighter">XODUS Rebel HQ // Sector 7G</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-black text-primary italic">2,450 SCRAP</span>
            <div className="w-24 h-1 bg-primary/20 mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '75%' }}></div>
            </div>
          </div>
          <button className="size-10 bg-surface-dark border border-primary/20 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">notifications_active</span>
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8 max-w-4xl mx-auto w-full">
        <section className="bg-surface-dark border border-primary/20 p-8 rounded-xl relative overflow-hidden neon-border">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f2b90d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Global Resistance Matrix</h2>
              <div className="flex items-baseline gap-2 leading-none">
                <span className="text-5xl font-black italic tracking-tighter">64.8%</span>
                <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +2.4%
                </span>
              </div>
            </div>
            <span className="px-2 py-1 bg-accent-red/20 text-accent-red border border-accent-red/30 text-[9px] font-black uppercase tracking-widest rounded">Threat: Critical</span>
          </div>

          <div className="flex items-end gap-1 h-32 w-full mb-8 relative z-10">
            {[ 40, 60, 85, 50, 95, 55, 70, 100 ].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-sm border-t border-primary/30 transition-all hover:bg-primary/20 ${i === 4 || i === 7 ? 'bg-primary/30' : 'bg-primary/10'}`} style={{ height: `${h}%` }}>
                {i === 7 && <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#f2b90d]"></div>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-black/50 p-4 rounded border border-primary/10">
              <p className="text-[10px] text-primary/60 uppercase tracking-widest font-black mb-1">Active Cells</p>
              <p className="text-2xl font-black italic">1,248</p>
            </div>
            <div className="bg-black/50 p-4 rounded border border-primary/10">
              <p className="text-[10px] text-primary/60 uppercase tracking-widest font-black mb-1">Empire Intel</p>
              <p className="text-2xl font-black italic">82% <span className="text-xs opacity-40 italic not-italic font-normal ml-2">Leakage</span></p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-primary/20 pb-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Mission Board</h3>
            <div className="flex items-center gap-1.5 animate-pulse">
              <span className="size-1.5 bg-primary rounded-full"></span>
              <span className="text-[9px] text-primary font-bold tracking-widest">LIVE UPDATES</span>
            </div>
          </div>
          
          <div className="bg-surface-dark border border-primary/20 rounded-xl overflow-hidden group hover:border-primary transition-all">
            <div className="h-32 relative overflow-hidden">
              <img src={mainMission.image} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="mission" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase tracking-tighter">High Risk</span>
                <span className="px-2 py-0.5 bg-primary text-black text-[8px] font-black uppercase tracking-tighter">Priority</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-black italic uppercase mb-1">{mainMission.title}</h4>
              <p className="text-xs text-slate-400 mb-4 italic truncate">{mainMission.description}</p>
              <div className="flex justify-between items-end">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[9px] font-bold text-primary/40 uppercase">Rewards</p>
                    <p className="text-sm font-black text-primary">800 SCRAP</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-primary/40 uppercase">Reputation</p>
                    <p className="text-sm font-black text-white">+150 XODUS</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMission(mainMission)}
                  className="px-8 h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(242,185,13,0.1)]"
                >
                  Briefing
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MissionModal 
        isOpen={!!selectedMission} 
        mission={selectedMission} 
        onClose={() => setSelectedMission(null)} 
        onAccept={() => console.log('Mission Accepted')} 
      />
    </div>
  );
};

export default ForgeScreen;
