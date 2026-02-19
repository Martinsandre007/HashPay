
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

interface FactionData {
  name: string;
  icon: string;
  tagline: string;
  description: string;
}

const FACTIONS: FactionData[] = [
  {
    name: 'THE REBELS',
    icon: 'front_hand',
    tagline: 'NETWORK LIBERATION FRONT',
    description: 'Operating from the rusted fringes, the Rebels fight to dismantle Corporate hegemony and return neural autonomy to the masses. Ideal for those who value freedom over safety.'
  },
  {
    name: 'CORPORATIONS',
    icon: 'domain',
    tagline: 'APEX ALGORITHMIC ORDER',
    description: 'Enforcing stability through superior tech and absolute protocol. Join the ranks of the elite to secure the future of the human-machine interface—for a price.'
  },
  {
    name: 'UNDERCROFT',
    icon: 'skull',
    tagline: 'GHOST-RUNNER SYNDICATE',
    description: 'Shadow-dwellers and info-brokers who recognize no master. We thrive in the high-frequency friction between the system and the streets. Profit is the only law.'
  }
];

const RegistrationScreen: React.FC<Props> = ({ onComplete }) => {
  const [stats, setStats] = useState({ stealth: 4, tech: 7, combat: 5 });
  const [points, setPoints] = useState(8);
  const [selectedFaction, setSelectedFaction] = useState(0);

  const adjustStat = (stat: keyof typeof stats, delta: number) => {
    if (delta > 0 && points <= 0) return;
    if (delta < 0 && stats[stat] <= 0) return;
    
    setStats(prev => ({ ...prev, [stat]: prev[stat] + delta }));
    setPoints(prev => prev - delta);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Character Preview */}
      <div className="flex-1 relative bg-gradient-to-b from-background-dark to-[#2a2514]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f2b90d_0%,_transparent_70%)] opacity-10 pointer-events-none" />
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat p-12 transition-transform duration-1000 scale-100"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdbtLE9JVCxbvZ2p6NRDGnUu33GTN_wP46Dsn50t7ZG_aPxaWfnv-L6VTRighdteuDVjTKjt6eVs1nIiR-Ae-UXBzkRrcO-L98X1NErMdgah-TRmLhleGEOBKlxSjMCHyzOuAe-kYqgBgacbT94Pl8NgT7_CD-W0Ep9PNlqbBkuZQpDerOvNSmhIhKrh-15bTpovAvCrfdIcv4qwKdDAUEeq7kyY9uHLxyTcCRuV6U73N8cPsIfNUlXcSU2BQWM0l4bB770LqVMOo")' }}
        />
        
        <div className="absolute bottom-8 left-8 p-6 bg-background-dark/80 backdrop-blur-md border border-primary/20 rounded-xl shadow-2xl">
          <p className="text-[10px] text-primary tracking-widest uppercase mb-1">Subject Profile</p>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">PROTO_UNIT.09</h2>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 bg-primary text-black text-[10px] font-bold">HIGH_THREAT</span>
            <span className="px-2 py-0.5 border border-primary/40 text-primary text-[10px] font-bold">NEURAL_SYNC_98%</span>
            <span className="px-2 py-0.5 border border-primary/40 text-primary text-[10px] font-bold uppercase">{FACTIONS[selectedFaction].name}</span>
          </div>
        </div>
      </div>

      {/* Right: Config Aside */}
      <aside className="w-full md:w-[480px] bg-background-dark border-l border-primary/20 flex flex-col overflow-y-auto custom-scrollbar">
        <nav className="flex border-b border-primary/20 sticky top-0 bg-background-dark z-10">
          <button className="flex-1 py-4 text-[10px] font-black tracking-widest border-b-2 border-primary bg-primary/5">FACE</button>
          <button className="flex-1 py-4 text-[10px] font-black tracking-widest text-primary/40">CYBERNETICS</button>
          <button className="flex-1 py-4 text-[10px] font-black tracking-widest text-primary/40">GEAR</button>
        </nav>

        <div className="p-8 space-y-10">
          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Appearance Matrix</h3>
            <div className="grid grid-cols-4 gap-2">
              {[ 'face', 'palette', 'content_cut', 'flare' ].map((icon, i) => (
                <div key={icon} className={`aspect-square rounded border ${i === 0 ? 'border-primary bg-primary/20 shadow-[0_0_10px_rgba(242,185,13,0.3)]' : 'border-primary/20'} flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors group`}>
                  <span className={`material-symbols-outlined ${i === 0 ? 'text-primary' : 'text-primary/40 group-hover:text-primary'}`}>{icon}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Attribute Distribution</h3>
              <div className="text-right">
                <p className="text-[10px] text-primary/60 font-mono">AVAIL_POINTS</p>
                <p className="text-2xl font-black text-primary leading-none">0{points}</p>
              </div>
            </div>

            <div className="space-y-6">
              {(Object.keys(stats) as Array<keyof typeof stats>).map((key) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>{key}</span>
                    <span className="text-primary">{stats[key]} / 10</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => adjustStat(key, -1)} className="p-1 border border-primary/20 text-primary hover:bg-primary/10 w-8 h-8 flex items-center justify-center font-bold">-</button>
                    <div className="flex-1 h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary shadow-[0_0_10px_#f2b90d]" style={{ width: `${stats[key] * 10}%` }} />
                    </div>
                    <button onClick={() => adjustStat(key, 1)} className="p-1 border border-primary/20 text-primary hover:bg-primary/10 w-8 h-8 flex items-center justify-center font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Faction Allegiance</h3>
            <div className="space-y-3">
              {FACTIONS.map((f, i) => (
                <button 
                  key={f.name} 
                  onClick={() => setSelectedFaction(i)}
                  className={`w-full p-4 rounded border text-left flex items-start gap-4 transition-all ${selectedFaction === i ? 'border-primary bg-primary/5 shadow-[inset_0_0_15px_rgba(242,185,13,0.05)]' : 'border-primary/10 hover:border-primary/30 hover:bg-white/5'}`}
                >
                  <div className={`p-2 rounded shrink-0 ${selectedFaction === i ? 'bg-primary/20 text-primary' : 'bg-primary/5 text-primary/40'}`}>
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-xs font-black tracking-widest ${selectedFaction === i ? 'text-white' : 'text-primary/60'}`}>{f.name}</p>
                      <span className="text-[8px] font-mono text-primary/40 uppercase tracking-tighter">{f.tagline}</span>
                    </div>
                    <p className={`text-[10px] leading-relaxed font-medium transition-colors ${selectedFaction === i ? 'text-primary/70' : 'text-white/30'}`}>
                      {f.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={onComplete}
              className="w-full py-5 bg-primary text-black font-black tracking-[0.3em] uppercase rounded-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(242,185,13,0.3)] flex items-center justify-center gap-2 group"
            >
              INITIALIZE OPERATIVE
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
            </button>
            <p className="text-center text-[10px] text-primary/30 mt-4 tracking-tighter uppercase italic">Warning: neural bridge initialization is permanent</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RegistrationScreen;
