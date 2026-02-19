
import React, { useState, useEffect, useCallback } from 'react';
import { Sector, MapEvent } from '../types';
import MissionModal, { MissionDetail } from '../components/MissionModal';
import { useGame } from '../GameContext';
import { generateMission } from '../MissionGenerator';

const CommandScreen: React.FC = () => {
  const { state, navigateTo, updateState, updateRotation } = useGame();
  const { activeEvents, scanRotation } = state;
  const [selectedMission, setSelectedMission] = useState<MissionDetail | null>(null);

  // Simulate radar sweep and event spawning
  useEffect(() => {
    const eventInterval = setInterval(() => {
      // Spawn logic
      let currentEvents = [...activeEvents];
      let spawned = false;

      // Randomly spawn new tactical events
      if (currentEvents.length < 8 && Math.random() > 0.85) {
        const types: Array<MapEvent['type']> = ['hostile', 'distress', 'intel'];
        const type = types[Math.floor(Math.random() * types.length)];
        const labels = {
          hostile: 'STRIKE TEAM',
          distress: 'CIVILIAN SOS',
          intel: 'ENCRYPTED UPLOAD'
        };

        const newEvent: MapEvent = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          label: labels[type],
          ttl: 15 + Math.floor(Math.random() * 25) // Starts between 15 and 40 seconds
        };
        currentEvents.push(newEvent);
        spawned = true;
      }

      // Decay TTL and filter expired
      const updatedEvents = currentEvents
        .map(e => ({ ...e, ttl: e.ttl - 1 }))
        .filter(e => e.ttl > 0);

      updateState({
        activeEvents: updatedEvents,
        scanRotation: (scanRotation + 2) % 360
      });
    }, 1000);

    return () => clearInterval(eventInterval);
  }, [activeEvents, scanRotation, updateState]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleEventClick = async (event: MapEvent) => {
    setIsGenerating(true);

    // Try to generate AI mission
    const aiMission = await generateMission(event.type, "Skyline Sector");

    if (aiMission) {
      setSelectedMission(aiMission);
      setIsGenerating(false);
      return;
    }

    // Fallback static briefings
    const briefings: Record<MapEvent['type'], MissionDetail> = {
      hostile: {
        title: "Neutralize: " + event.label,
        description: "An elite corporate strike team has been detected at these coordinates. They are hunting resistance sympathizers. Intercept and neutralize before they complete their sweep.",
        objectives: ["Locate Strike Team", "Secure Peripheral Access", "Neutralize High-Value Targets", "Exfiltrate via Shadow Corridor"],
        rewards: [{ label: "Combat Pay", value: "1,200 SCRAP" }, { label: "Intel", value: "Encrypted Keys" }],
        risk: "High",
        image: "https://picsum.photos/seed/hostile/800/600"
      },
      distress: {
        title: "Rescue: " + event.label,
        description: "A civilian distress signal has breached our firewall. A local merchant cell is pinned down by automated enforcers. Extract them immediately.",
        objectives: ["Identify Distress Source", "Clear Landing Zone", "Escort Civilians to Extraction", "Eliminate Tracking Drones"],
        rewards: [{ label: "Reputation", value: "+200 Rebel" }, { label: "Supply", value: "Medical Kits" }],
        risk: "Medium",
        image: "https://picsum.photos/seed/distress/800/600"
      },
      intel: {
        title: "Secure: " + event.label,
        description: "A high-frequency burst has revealed a vulnerable data relay. We have a narrow window to siphon corporate secrets before the node self-destructs.",
        objectives: ["Establish Neural Link", "Siphon Encrypted Data", "Avoid Detection Sub-routines", "Upload to XODUS Mainframe"],
        rewards: [{ label: "Data Credits", value: "500 $XODUS" }, { label: "Unlocks", value: "MK-IV Blueprints" }],
        risk: "Low",
        image: "https://picsum.photos/seed/intel/800/600"
      }
    };
    setSelectedMission(briefings[event.type]);
    setIsGenerating(false);
  };

  const sectorBriefing: MissionDetail = {
    title: "Deployment: Sector Skyline",
    description: "Sector Skyline is experiencing high-frequency corporate interference. We need an operative on the ground to re-establish the rebel mesh network and secure local assets.",
    objectives: [
      "Drop into Skyline High-Rise Zone",
      "Deploy Mesh Repeater [0/2]",
      "Evade Corporate Patrols",
      "Sync with Local Resistance Cells"
    ],
    rewards: [
      { label: "Asset Drop", value: "Random Gear Fragment" },
      { label: "Status", value: "+50 Skyline Control" }
    ],
    risk: "Medium",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDgMgwFoWjV2MzSe56j5nHstrzoK4WkKy-ZkNV9ZocGS6EtHFzLm9_ScaosTqe00vgzzzCrvUZIeOHFEUuPMfk1bI_quhnfnbnBTJz5nQbezDeuzeQ0v5dM8PBQU9RrOls3BAK3Wwwn-XKKK8lvDVLFSqanVxZKyR_4WVx6J8M647rzOAUlbRq6cEq0gFCi7V9qo9NgXylQQOSaVWMpj0m9KXtkvq1LfuncjkSr_Me19MLSub8Zo4Nlr1OQw7USKACrDBfy2BFZZA"
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden pb-24">
      {/* Header */}
      <header className="flex items-center bg-background-dark border-b border-primary/20 p-4 shrink-0">
        <span className="material-symbols-outlined text-primary text-3xl glow-text">terminal</span>
        <div className="flex-1 px-4">
          <h1 className="text-primary text-xl font-black tracking-widest uppercase italic">XODUS COMMAND</h1>
          <p className="text-[10px] text-primary/60 tracking-widest uppercase">Tactical Overlay v4.2.0 // Active Session</p>
        </div>
        <div className="flex gap-3">
          <button className="relative p-2 rounded bg-primary/10 border border-primary/30">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button onClick={() => navigateTo(Sector.LOBBY)} className="p-2 rounded bg-primary text-black font-bold text-xs uppercase px-4">Lobby</button>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="p-4 bg-primary/5 border-b border-primary/10 shrink-0">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Resistance Matrix</h2>
            <p className="text-2xl font-black text-white italic leading-none">68.4% <span className="text-xs text-primary/60 font-normal">REBEL DOMINANCE</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-primary/40 uppercase">Network Stability</p>
            <p className="text-xs font-mono text-primary font-bold">STABLE</p>
          </div>
        </div>
        <div className="w-full h-3 bg-primary/10 rounded-full border border-primary/20 overflow-hidden p-0.5">
          <div className="h-full bg-primary shadow-[0_0_15px_#f2b90d]" style={{ width: '68.4%' }}></div>
        </div>
      </section>

      {/* Map View */}
      <main className="flex-1 p-4 relative overflow-hidden flex flex-col">
        <div className="flex-1 relative bg-surface-dark border border-primary/20 rounded-xl overflow-hidden group shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">

          {/* Coordinate Grid Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f2b90d 1px, transparent 1px), linear-gradient(90deg, #f2b90d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <img
            alt="Map"
            className="w-full h-full object-cover grayscale opacity-30 mix-blend-screen contrast-125 scale-110"
            style={{ filter: 'sepia(1) saturate(5) hue-rotate(10deg)' }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDgMgwFoWjV2MzSe56j5nHstrzoK4WkKy-ZkNV9ZocGS6EtHFzLm9_ScaosTqe00vgzzzCrvUZIeOHFEUuPMfk1bI_quhnfnbnBTJz5nQbezDeuzeQ0v5dM8PBQU9RrOls3BAK3Wwwn-XKKK8lvDVLFSqanVxZKyR_4WVx6J8M647rzOAUlbRq6cEq0gFCi7V9qo9NgXylQQOSaVWMpj0m9KXtkvq1LfuncjkSr_Me19MLSub8Zo4Nlr1OQw7USKACrDBfy2BFZZA"
          />

          {/* Radar Sweep Effect */}
          <div
            className="absolute top-1/2 left-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-20"
            style={{ transform: `translate(-50%, -50%) rotate(${scanRotation}deg)` }}
          />

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-black/80 border border-red-500/50 p-2 rounded flex items-center gap-2 backdrop-blur-md">
                <span className="material-symbols-outlined text-red-500 text-sm animate-pulse">warning</span>
                <span className="text-[9px] font-bold uppercase text-red-500 tracking-tighter">Tactical Alerts Active</span>
              </div>
              <div className="flex flex-col gap-2">
                <button className="size-10 bg-black/60 border border-primary/40 rounded flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"><span className="material-symbols-outlined">zoom_in</span></button>
                <button className="size-10 bg-black/60 border border-primary/40 rounded flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"><span className="material-symbols-outlined">zoom_out</span></button>
              </div>
            </div>

            {/* Dynamic Map Events with Visual Decay */}
            {activeEvents.map(event => {
              // Calculate visual decay styles
              const isExpiring = event.ttl <= 10;
              const isCritical = event.ttl <= 5;
              const opacity = isExpiring ? Math.max(0.1, event.ttl / 10) : 1;
              const scale = isCritical ? Math.max(0.7, 0.7 + (event.ttl / 5) * 0.3) : 1;

              return (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="absolute cursor-pointer group transition-all duration-1000"
                  style={{
                    left: `${event.x}%`,
                    top: `${event.y}%`,
                    opacity: opacity,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                  }}
                >
                  <div className={`relative flex flex-col items-center`}>
                    <div className={`size-3 rounded-full animate-ping absolute ${event.type === 'hostile' ? 'bg-red-500' : event.type === 'distress' ? 'bg-cyan-500' : 'bg-yellow-500'}`} />
                    <div className={`size-3 rounded-full ring-2 ring-offset-2 ring-offset-black relative shadow-lg ${event.type === 'hostile' ? 'bg-red-600 ring-red-500' : event.type === 'distress' ? 'bg-cyan-600 ring-cyan-500' : 'bg-yellow-600 ring-yellow-500'} ${isCritical ? 'animate-pulse' : ''}`} />

                    <div className={`mt-2 bg-black/90 border border-primary/20 px-2 py-0.5 rounded backdrop-blur-md scale-75 origin-top group-hover:scale-100 transition-all duration-300 ${isCritical ? 'border-red-500/40' : ''}`}>
                      <p className={`text-[8px] font-black uppercase whitespace-nowrap ${event.type === 'hostile' ? 'text-red-500' : event.type === 'distress' ? 'text-cyan-500' : 'text-yellow-500'}`}>
                        {event.label}
                        {isCritical && <span className="ml-1 text-[7px] animate-pulse opacity-60">!!</span>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-black/80 border-l-4 border-primary p-3 rounded backdrop-blur-md cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-primary/80 font-black uppercase">Old Town</span>
                  <span className="text-[10px] text-primary font-bold">SECURED</span>
                </div>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-2">
                  <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="bg-black/80 border-l-4 border-red-500 p-3 rounded backdrop-blur-md cursor-pointer hover:bg-red-500/10 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-white/80 font-black uppercase">Undercroft</span>
                  <span className="text-[10px] text-red-500 font-bold animate-pulse">HOT ZONE</span>
                </div>
                <div className="w-full h-1 bg-red-500/20 rounded-full mt-2">
                  <div className="h-full bg-red-500" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Sector Intelligence: Skyline</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/5 border border-primary/20 p-3 rounded">
              <p className="text-[10px] text-primary/60 uppercase">Faction Influence</p>
              <div className="flex h-1 bg-slate-800 mt-2">
                <div className="bg-primary h-full" style={{ width: '40%' }}></div>
                <div className="bg-slate-600 h-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-[9px] mt-1 text-slate-400">40% Rebel / 60% Corp</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-3 rounded">
              <p className="text-[10px] text-primary/60 uppercase">Available Assets</p>
              <p className="text-lg font-black italic">08 <span className="text-[10px] font-normal not-italic tracking-tighter uppercase">Squads</span></p>
            </div>
          </div>
          <button
            onClick={() => setSelectedMission(sectorBriefing)}
            className="w-full h-14 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-lg shadow-[0_0_20px_rgba(242,185,13,0.3)] flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined">bolt</span>
            DEPLOY TO SECTOR
          </button>
        </div>
      </main>

      <footer className="bg-primary/10 py-1 overflow-hidden shrink-0 border-y border-primary/20">
        <div className="whitespace-nowrap flex items-center animate-[marquee_20s_linear_infinite]">
          <span className="text-[9px] font-black text-primary px-4 uppercase tracking-tighter">LIVE FEED //</span>
          <span className="text-[9px] text-primary/80 uppercase px-4">SQUAD ALPHA DEPLOYED TO OLD TOWN...</span>
          <span className="text-[9px] text-primary/80 uppercase px-4">CORPORATE BREACH DETECTED IN SKYLINE...</span>
          <span className="text-[9px] text-primary/80 uppercase px-4">UNDERCROFT RESISTANCE LEVELS RISING...</span>
          <span className="text-[9px] text-cyan-400 uppercase px-4">DISTRESS SIGNAL RECEIVED IN SECTOR 4...</span>
          <span className="text-[9px] text-red-500 uppercase px-4">ENEMY PATROL SPOTTED NEAR DOWNTOWN...</span>
        </div>
      </footer>

      <MissionModal
        isOpen={!!selectedMission || isGenerating}
        mission={selectedMission}
        isLoading={isGenerating}
        onClose={() => {
          setSelectedMission(null);
          setIsGenerating(false);
        }}
        onAccept={() => navigateTo(Sector.HUD)}
      />
    </div>
  );
};

export default CommandScreen;
