
import React from 'react';

interface Props {
  onEnter: () => void;
}

const LandingScreen: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60 scale-105"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCRihTtefkY_wzZojhJYOLzWG7LAGz6DSx6NAyf7acCXPqAynkOyQPhvfp38sOk0TKMtnIyVLdxBWWICGJw3p9X4o4iDserivgKoiNeAEYchke3PFiA116029QlLdYUql4vyii1Aw_E77A0_tw8qR5cIdxaUAgcaHiPbHJuo6UdTXCLuvwO2Y9P-nRA1Pq_Pj_S4zuK8LsI614CZsRjEacGBtM0ZnexAO_IeEmuFrWjlIcLtXf3YJX9ti9zwxkkVZRXfdG0D2Cuy-I")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-background-dark/20 z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        <div className="flex items-center gap-2 opacity-80 mb-2">
          <span className="h-px w-8 bg-primary"></span>
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-primary">District 09</span>
          <span className="h-px w-8 bg-primary"></span>
        </div>
        
        <h1 className="text-white tracking-[0.2em] text-7xl md:text-8xl font-black leading-none glow-text mb-2">
          XODUS
        </h1>
        <p className="text-primary/60 text-xs tracking-[0.3em] uppercase mb-12 font-light italic">
          Cybernetic Reclamation Protocol
        </p>

        <div className="w-full max-w-[440px] flex flex-col gap-4">
          <button 
            onClick={onEnter}
            className="group relative h-16 bg-primary text-black text-lg font-black tracking-[0.1em] rounded-lg neon-border hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            ENTER THE UNDERCROFT
            <span className="material-symbols-outlined text-2xl">sensors</span>
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="h-14 bg-surface-dark/80 border border-primary/30 text-white text-xs font-bold tracking-widest rounded-lg hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">fingerprint</span>
              OPERATIVE LOGIN
            </button>
            <button className="h-14 bg-surface-dark/80 border border-primary/30 text-white text-xs font-bold tracking-widest rounded-lg hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">person_add</span>
              NEW RECRUIT
            </button>
          </div>

          <div className="mt-8 p-4 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-primary/40 uppercase tracking-widest font-mono">System Status</span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            </div>
            <div className="font-mono text-[9px] text-white/40 leading-relaxed uppercase space-y-1">
              <p>&gt; Initializing neural link...</p>
              <p>&gt; Scanning sector 7-G for operatives...</p>
              <p>&gt; Connection established via Sui Mainnet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
