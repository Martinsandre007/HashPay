
import React, { useState } from 'react';
import MissionModal, { MissionDetail } from '../components/MissionModal';

const LoungeScreen: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<MissionDetail | null>(null);

  const missions: (MissionDetail & { id: string })[] = [
    { 
      id: 'A', 
      title: 'Operation: Silent Ledger', 
      description: 'Systematically manipulate the financial records of Sector 4. Our investors require a 15% adjustment in asset valuation without alerting the regulatory nodes.',
      objectives: [
        "Infiltrate Sector 4 Financial Database",
        "Override Verification Sub-routines",
        "Modify Ledger Entries [X42-99]",
        "Wipe Access Logs"
      ],
      rewards: [
        { label: "Executive Bonus", value: "2.4M Credits" },
        { label: "Corporate Trust", value: "High Grade" }
      ],
      risk: "Medium",
      image: "https://picsum.photos/seed/finance/800/600"
    },
    { 
      id: 'B', 
      title: 'Acquisition: Helios Labs', 
      description: 'Helios Labs is on the verge of a breakthrough. Secure their proprietary research data before the hostile takeover is finalized. Discretion is mandatory.',
      objectives: [
        "Breach Helios Research Server",
        "Download Bio-Gen Prototype Data",
        "Encrypt Local Backup",
        "Establish Backdoor for Future Access"
      ],
      rewards: [
        { label: "Consulting Fee", value: "850K Credits" },
        { label: "Asset Ownership", value: "Bio-Gen Share" }
      ],
      risk: "High",
      image: "https://picsum.photos/seed/labs/800/600"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/80 backdrop-blur-md border-b border-primary/20 p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded border border-primary/20 bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">fingerprint</span>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase italic">Skyline Lounge</h1>
            <div className="flex items-center gap-1.5"><div className="size-1.5 bg-primary rounded-full animate-pulse" /><span className="text-[9px] text-primary font-bold uppercase tracking-tighter">Biometric Verified: Alpha</span></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white/40 hover:text-primary cursor-pointer">notifications</span>
          <img src="https://picsum.photos/seed/director/40/40" className="size-10 rounded-lg border border-primary/20 grayscale" alt="director" />
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto w-full space-y-8 relative">
        <div className="fixed inset-0 pointer-events-none opacity-20 -z-10">
          <img src="https://picsum.photos/seed/night-city/1200/800" className="size-full object-cover" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark" />
        </div>

        <section className="bg-white/5 border-l-4 border-primary border-y border-r border-primary/10 p-8 rounded-r-xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">Corporate Identity</p>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Director Xanthus</h2>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Net Worth</p>
              <p className="text-2xl font-black italic text-primary leading-none">742.8M <span className="text-[9px] opacity-60 not-italic font-normal">CREDITS</span></p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-primary/10 pt-6">
            <div className="text-center border-r border-primary/10"><p className="text-[8px] text-white/30 uppercase font-black">Influence</p><p className="text-xs font-black uppercase text-white/80">Rank 04</p></div>
            <div className="text-center border-r border-primary/10"><p className="text-[8px] text-white/30 uppercase font-black">Holdings</p><p className="text-xs font-black uppercase text-white/80">12 Assets</p></div>
            <div className="text-center"><p className="text-[8px] text-white/30 uppercase font-black">Security</p><p className="text-xs font-black uppercase text-white/80">Enforced</p></div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4 px-1">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">rss_feed</span> Live Intel Feed
             </h3>
             <span className="text-[9px] text-primary font-black uppercase tracking-widest hover:underline cursor-pointer">Market Analysis</span>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {[ { t: 'Critical', m: 'Sector 7 stock manipulation detected.', p: 75, bad: true }, { t: 'Opportunity', m: 'New orbital yacht auction starting.', p: 25 } ].map((intel, idx) => (
              <div key={idx} className="min-w-[300px] bg-white/5 border border-primary/10 p-5 rounded-xl backdrop-blur-md group hover:border-primary transition-all">
                 <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${intel.bad ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>{intel.t}</span>
                  <span className="text-[9px] text-white/30">14m ago</span>
                 </div>
                 <p className="text-sm font-bold text-white/80 mb-4">{intel.m}</p>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${intel.bad ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${intel.p}%` }} />
                 </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-lg">assignment</span> Executive Missions
          </h3>
          <div className="space-y-3">
            {missions.map(m => (
              <div 
                key={m.id} 
                onClick={() => setSelectedMission(m)}
                className="bg-white/5 border border-primary/10 p-5 rounded-xl flex items-center gap-6 group hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="size-14 rounded bg-primary/5 border border-primary/20 flex items-center justify-center font-black text-primary text-xl">{m.id}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-black italic uppercase text-white group-hover:text-primary transition-colors">{m.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Industrial Espionage / Sector 4</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary leading-none">{m.rewards[0].value}</p>
                  <p className="text-[9px] font-black text-white/30 uppercase mt-1">Review Briefing</p>
                </div>
              </div>
            ))}
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

export default LoungeScreen;
