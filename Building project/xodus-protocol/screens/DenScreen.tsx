
import React, { useState } from 'react';
import MissionModal, { MissionDetail } from '../components/MissionModal';

const DenScreen: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<MissionDetail | null>(null);

  const priorityBounty: MissionDetail = {
    title: "Siphon Sector 7 Power",
    description: "The Undercroft needs juice. Redirect the primary node flow from the Empire's main grid to our local junction. Expect heavy automated resistance.",
    objectives: [
      "Locate Main Power Conduit Terminal",
      "Inject Siphoning Malware",
      "Defend Junction for 180 Seconds",
      "Purge Tracking Signatures"
    ],
    rewards: [
      { label: "Payment", value: "2,400 SCRAP" },
      { label: "Reputation", value: "+200 Underworld" }
    ],
    risk: "Critical",
    image: "https://picsum.photos/seed/power/800/600"
  };

  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 border-b border-primary/20 p-4 flex justify-between items-center z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl glow-text">terminal</span>
          <div>
            <h1 className="text-white font-black text-lg italic tracking-widest leading-none">THE DEN <span className="text-primary/60 text-xs font-bold ml-1 uppercase not-italic">UNDERCROFT_HUB</span></h1>
            <p className="text-primary/40 text-[9px] uppercase tracking-[0.2em]">Subway Sector 09 // Encrypted Connection</p>
          </div>
        </div>
        <button className="size-10 bg-surface-dark border border-primary/30 rounded flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">settings_input_component</span>
        </button>
      </header>

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-dark border border-primary/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-10 w-px h-full bg-primary/5 -z-0" />
            <div className="relative">
              <div className="size-24 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/sender/100/100" className="size-full grayscale contrast-125 brightness-75" alt="pfp" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded italic">LVL 42</div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-black text-white italic tracking-tighter">SENDER_X <span className="material-symbols-outlined text-primary text-sm align-middle">verified</span></h2>
              <p className="text-primary/80 font-bold text-xs uppercase mt-1">Rank: <span className="text-white">Shadow Runner</span></p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {[ 'Reliable', 'Silent', 'Heavy Tech' ].map(t => (
                  <span key={t} className="px-2 py-1 rounded border border-primary/20 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button className="h-10 px-6 bg-primary text-black font-black uppercase text-[10px] rounded hover:bg-white transition-all">View Cred History</button>
              <button className="h-10 px-6 bg-transparent border border-white/10 text-white/60 font-black uppercase text-[10px] rounded hover:bg-white/5 transition-all">Edit Profile</button>
            </div>
          </div>

          <div className="bg-surface-dark border border-primary/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-[100px] text-primary">account_balance_wallet</span>
            </div>
            <div>
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Scrap Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black italic text-primary leading-none">14,200</span>
                <span className="text-xs text-green-500 font-bold">+12%</span>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-2">Active Vouches</p>
              <div className="flex gap-1 h-1.5"><div className="flex-1 bg-primary" /><div className="flex-1 bg-primary" /><div className="flex-1 bg-primary" /><div className="flex-1 bg-white/5" /><div className="flex-1 bg-white/5" /></div>
              <p className="text-right text-[8px] text-white/30 font-bold uppercase mt-1">3/5 Vouch Slots Filled</p>
            </div>
          </div>
        </section>

        <nav className="flex gap-8 border-b border-primary/20 no-scrollbar overflow-x-auto">
          <button className="pb-3 border-b-2 border-primary text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-lg">storefront</span> TERMINAL
          </button>
          <button className="pb-3 border-b-2 border-transparent text-white/40 font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-lg">assignment</span> BOUNTY BOARD
          </button>
          <button className="pb-3 border-b-2 border-transparent text-white/40 font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-lg">forum</span> SMUGGLER CHAT
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="size-2 bg-primary rounded-full animate-pulse" /> Available Tech
              </h3>
              <span className="text-[9px] font-mono text-white/30">REFRESH: 04:12:09</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[ { name: 'Encrypted Data Core', price: '4,500', r: 'RARE' }, { name: 'Bypasser Mk.II', price: '850', r: 'COMMON' } ].map((i, idx) => (
                <div key={idx} className="bg-surface-dark border border-white/5 p-4 rounded-xl group hover:border-primary/40 transition-all cursor-pointer">
                  <div className="aspect-video bg-black/40 rounded-lg mb-4 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${i.name}/400/225`} className="size-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale opacity-60" alt="item" />
                    <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[8px] font-black ${i.r === 'RARE' ? 'bg-primary text-black' : 'bg-white/20 text-white'}`}>{i.r}</span>
                  </div>
                  <h4 className="text-sm font-black italic uppercase text-white leading-tight">{i.name}</h4>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-[8px] font-bold text-white/30 uppercase">Scrap Value</p>
                      <p className="text-sm font-black text-primary leading-none">{i.price}</p>
                    </div>
                    <button className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                      <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">assignment_late</span> Priority Bounties
             </h3>
             <div className="space-y-3">
                <div className="p-4 bg-surface-dark border-l-4 border-red-500/50 bg-gradient-to-r from-red-500/5 to-transparent rounded-r-xl border-y border-r border-white/5">
                  <div className="flex justify-between mb-2">
                    <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">High Lethality</span>
                    <span className="text-[8px] text-white/30">2h left</span>
                  </div>
                  <h5 className="text-sm font-black text-white italic uppercase mb-1">{priorityBounty.title}</h5>
                  <p className="text-[10px] text-white/40 leading-tight line-clamp-2">{priorityBounty.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-primary font-black text-xs">2,400 <span className="text-[8px] text-white/30 not-italic">SCRAP</span></span>
                    <button 
                      onClick={() => setSelectedMission(priorityBounty)}
                      className="text-[9px] font-black text-primary uppercase hover:underline"
                    >
                      Accept Job
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <MissionModal 
        isOpen={!!selectedMission} 
        mission={selectedMission} 
        onClose={() => setSelectedMission(null)} 
        onAccept={() => console.log('Bounty Accepted')} 
      />
    </div>
  );
};

export default DenScreen;
