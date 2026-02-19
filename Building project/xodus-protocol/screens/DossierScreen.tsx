
import React from 'react';

const DossierScreen: React.FC = () => {
  const operatives = [
    { 
      name: "JAX 'GHOST' VANE", 
      perk: "Guerilla Tactics", 
      desc: "Increases movement speed by 20% and reduces noise.", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIqufJHpOWsFxbwt2s4Ul087oxkemKzu046ZPmuORLYI3rryKNWzTBaOU7P4byF4J-6LMR6dLeBSAi4_LDcNnxE49xrOzz69EVZ3RtQshVfxaDKEWjhD358e00dVxH8oc3C7P5yB1L8nczMWlV8xBKuy9qd2HZ9j0uIUoN1lLx0HpVaixnDJ1NnE5vJ0ee56xhR4n1j6DJYBUpPla1_fm9vdOkXYRZ5KojBh-beQ7aJiZPbv1sJWfIkjKlo0tSzgEL_tE-VZkiFr8",
      icon: "shield_with_heart"
    },
    { 
      name: "MIRA 'WRENCH' STERN", 
      perk: "Improvised Shielding", 
      desc: "Deploys a kinetic barrier from scrap metal.", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLb1fEy4BkvQOJMKVcwG78Nkn1778rBUA1oexj5dPiHQq8yyVCDH32N9oCMROHZ7iUko26LcGG9BUJLJtr5HhqydtAWKn4p9T3hAoUHx_-3l0VWicGEEqnzZddOX87B4ljJMT8WVuoL4VOZE7WnwmmAGoJNzMPYt6xIaTevD-_5yX_69juf0PEQ3tTZRrs6aQrgB06YRLPU8UE0WJ2rukeznw0CLdamCvZSvuoh2KxyXr4YOmdoim5ptz9_ROAM4LSgm5pP8flwx0",
      icon: "construction"
    }
  ];

  return (
    <div className="flex-1 flex flex-col pb-24 h-screen">
      <header className="sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-primary/20 z-10 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="text-xl font-black tracking-widest text-primary flex items-center gap-2 italic uppercase">
            <span className="material-symbols-outlined">terminal</span>
            XODUS DOSSIER
          </h1>
          <span className="material-symbols-outlined text-primary">search</span>
        </div>
        <nav className="flex mt-4 border-b border-primary/10 max-w-4xl mx-auto">
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-tighter border-b-2 border-primary text-primary">Rebels</button>
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-tighter text-slate-500">Corporations</button>
          <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-tighter text-slate-500">Undercroft</button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
        <section id="rebels" className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-primary tracking-tighter uppercase italic">The Rebels</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent opacity-20"></div>
            <span className="text-[9px] text-primary/40 font-mono">SECTOR_07 // REVOLT</span>
          </div>

          <div className="grid gap-4">
            {operatives.map((op) => (
              <div key={op.name} className="flex gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg hover:border-primary/40 transition-all group">
                <div className="w-24 h-28 rounded border border-primary/20 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={op.img} className="w-full h-full object-cover" alt={op.name} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors italic leading-none">{op.name}</h3>
                    <span className="material-symbols-outlined text-primary text-sm">{op.icon}</span>
                  </div>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Perk: {op.perk}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{op.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DossierScreen;
