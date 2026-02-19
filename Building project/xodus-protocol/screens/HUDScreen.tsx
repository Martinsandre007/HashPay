
import React from 'react';

interface Props {
  onComplete: () => void;
}

const HUDScreen: React.FC<Props> = ({ onComplete }) => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center grayscale-[0.4] contrast-[1.2] overflow-hidden"
      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBv-58Ws4At3WXNUxoi0wh4fqcpsjk4uQkG0n0gD1GiZJtIyx4k-cOtWz-RfaqXgxzFbxS9OuRAnimBUFI2fCWFliF5qY7rRkCHR_ptA1W2Cy-_5m-DxjgsZmdqs8eKbd1iz-RtyTa8SOPBiZ55s79xZ_CotFgGtZIgMRRcISBRWPZiTJo0h7cq31ZaSKmpzfH4AoPY76RJCfhqfFJlyLJlc2e2cwzftx_XixWsJUDNX5fCUV7hAaEqBvZL7RBRtnI3h0C7QwxyDxE")' }}>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_40%,_rgba(0,0,0,0.8)_100%)] pointer-events-none border-[20px] border-primary/5" />
      
      {/* HUD Elements */}
      <header className="relative z-10 p-8 flex justify-between items-start">
        <div className="flex items-center gap-4 bg-black/60 p-3 backdrop-blur-md border-l-4 border-primary">
          <div>
            <p className="text-[10px] text-primary/70 font-black leading-none uppercase">Objective</p>
            <p className="text-md font-black italic tracking-tighter uppercase text-white">SECURE ALLEYWAY</p>
          </div>
          <div className="w-px h-8 bg-primary/20" />
          <div>
            <p className="text-[10px] text-primary/70 font-black leading-none uppercase">Timer</p>
            <p className="text-md font-black italic tracking-tighter text-white">04:12:09</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center max-w-xs w-full">
          <div className="flex justify-between w-full text-[9px] font-black tracking-widest text-primary mb-1">
            <span className="flex items-center gap-1">STEALTH <span className="material-symbols-outlined text-xs">visibility_off</span></span>
            <span className="flex items-center gap-1">ACTION <span className="material-symbols-outlined text-xs">local_fire_department</span></span>
          </div>
          <div className="relative w-full h-2.5 bg-black/80 rounded-full border border-primary/30 overflow-hidden backdrop-blur-md">
            <div className="absolute inset-y-0 left-0 bg-blue-500/30 border-r border-blue-400" style={{ width: '45%' }} />
            <div className="absolute inset-y-0 right-0 bg-primary/40 border-l border-white" style={{ width: '20%' }} />
          </div>
        </div>
      </header>

      {/* Sidebars */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {['SGT. MILLER', 'GHOST', 'MEDIC'].map((name, i) => (
          <div key={name} className="w-48 bg-black/60 backdrop-blur-md p-3 border border-primary/20 relative">
            <div className="absolute top-0 left-0 w-4 h-px bg-primary" />
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold tracking-widest text-white italic">{name}</span>
              <span className={`text-[9px] font-bold ${i === 1 ? 'text-red-500' : 'text-primary'}`}>{i === 1 ? '42%' : '85%'} HP</span>
            </div>
            <div className="flex gap-1 h-1.5">
              <div className={`flex-1 ${i === 1 ? 'bg-red-500' : 'bg-primary'}`} />
              <div className={`flex-1 ${i === 1 ? 'bg-red-500/20' : 'bg-primary'}`} />
              <div className={`flex-1 ${i === 1 ? 'bg-red-500/20' : 'bg-primary/20'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-end">
        <div className="w-40 h-40 bg-black/80 backdrop-blur-md border border-primary/40 relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#f2b90d 1px, transparent 1px), linear-gradient(90deg, #f2b90d 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-primary rounded-full ring-4 ring-primary/20" />
          <div className="absolute top-1/4 left-1/4 size-2 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute bottom-2 left-2 text-[8px] text-primary/60 font-mono">COORD: 45.2N / 12.8W</div>
        </div>
        <div className="w-40 flex justify-between bg-black/80 p-2 border-b border-primary/50 text-[10px] font-bold text-white/40">
          <span className="text-primary">W</span><span>NW</span><span className="text-white">N</span><span>NE</span><span>E</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <footer className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {[ 'MOVE TO COVER', 'FLANK LEFT', 'SUPPRESSION', 'HOLD POSITION' ].map((order, i) => (
            <button key={order} className="w-40 h-24 bg-black/60 border border-primary/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-primary/20 transition-all group">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform">
                {i === 0 ? 'shield' : i === 1 ? 'trending_flat' : i === 2 ? 'warning' : 'radio'}
              </span>
              <div className="text-center">
                <p className="text-[10px] font-black tracking-widest text-primary leading-none">{order}</p>
                <p className="text-[8px] text-white/40 uppercase mt-1">[F{i+1}]</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="w-full max-w-4xl bg-primary px-8 py-3 rounded-lg flex justify-between items-center text-black font-black">
          <button onClick={onComplete} className="flex items-center gap-2 hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined">radar</span>
            <span className="text-sm uppercase tracking-widest">TACTICAL OVERRIDE: FINISH MISSION</span>
          </button>
          <span className="text-sm italic opacity-60">// FORGE_FRONTLINE_OS_v2.0</span>
        </div>
      </footer>
    </div>
  );
};

export default HUDScreen;
