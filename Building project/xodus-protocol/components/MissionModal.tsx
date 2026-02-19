
import React from 'react';

export interface MissionDetail {
  title: string;
  description: string;
  objectives: string[];
  rewards: { label: string; value: string }[];
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  image?: string;
}

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  mission: MissionDetail | null;
  isLoading?: boolean;
}

const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose, onAccept, mission, isLoading }) => {
  if (!isOpen) return null;

  const riskColors = {
    Low: 'text-green-500 border-green-500/30 bg-green-500/10',
    Medium: 'text-primary border-primary/30 bg-primary/10',
    High: 'text-orange-500 border-orange-500/30 bg-orange-500/10',
    Critical: 'text-red-500 border-red-500/30 bg-red-500/10',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-surface-dark border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200 min-h-[400px]">
        {/* Top Scanline effect for modal */}
        <div className="absolute top-0 inset-x-0 h-1 bg-primary/20 overflow-hidden">
          <div className="h-full bg-primary w-1/3 animate-[marquee_3s_linear_infinite]" />
        </div>

        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center h-full gap-6">
            <div className="relative">
              <span className="material-symbols-outlined text- primary text-6xl animate-pulse">radar</span>
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[ping_2s_linear_infinite]" />
            </div>
            <div className="text-center">
              <h3 className="text-primary text-lg font-black italic tracking-[0.2em] uppercase">Decrypting Intel...</h3>
              <p className="text-[10px] font-mono text-primary/40 uppercase mt-2">Connecting to XODUS Neural Mesh // Gemini AI v1.5</p>
            </div>
            <div className="w-48 h-1 bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : mission ? (
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            {/* Visual Header / Image */}
            <div className="w-full md:w-56 shrink-0 relative bg-black border-b md:border-b-0 md:border-r border-primary/10">
              {mission.image ? (
                <img src={mission.image} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt="mission focus" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <span className="material-symbols-outlined text-6xl text-primary/20">radar</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent md:bg-gradient-to-l" />
            </div>

            {/* Details Content */}
            <div className="flex-1 p-8 flex flex-col overflow-y-auto custom-scrollbar">
              <header className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-widest rounded ${riskColors[mission.risk]}`}>
                    Risk: {mission.risk}
                  </span>
                  <span className="text-[10px] font-mono text-primary/40 uppercase">Ref: XOD_{Math.floor(Math.random() * 9000) + 1000}</span>
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-none">
                  {mission.title}
                </h2>
              </header>

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">description</span> Briefing
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{mission.description}"
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">checklist</span> Primary Objectives
                  </h3>
                  <ul className="space-y-2">
                    {mission.objectives.map((obj, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <div className="size-1.5 bg-primary/40 group-hover:bg-primary transition-colors rotate-45" />
                        <span className="text-xs font-bold text-white/80 uppercase tracking-wide">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {mission.rewards.map((reward, i) => (
                    <div key={i} className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest">{reward.label}</p>
                      <p className="text-sm font-black text-primary italic uppercase">{reward.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <footer className="mt-8 pt-6 border-t border-primary/10 flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-12 border border-white/10 text-white/40 font-black uppercase text-xs tracking-widest rounded-lg hover:bg-white/5 transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    onAccept();
                    onClose();
                  }}
                  className="flex-[2] h-12 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] rounded-lg shadow-[0_0_20px_rgba(242,185,13,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">bolt</span>
                  Accept Mission
                </button>
              </footer>
            </div>
          </div>
        ) : null}

        {/* Close Button (Top Corner) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-8 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};
export default MissionModal;
