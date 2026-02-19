
import React from 'react';

const MarketScreen: React.FC = () => {
  const items = [
    { 
      name: "Prototype Railgun", 
      id: "#882", 
      price: "850 $XODUS", 
      time: "02:45:12", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5R3jUMq-3svivO5HTsgQo1Ec5FHGs6svV_aWOPcwzl2uxIVGRtkGbgXbgOfkdqcVMm2E6illIxSQu08nMAgnOdfbMixkkioPzD85c6x5KzdkjfLujuoFioe2nAjbISTK2M4VZvYynXKipGnWF1JL2fQUIWOcJYnFxGcur7r7Uj1KklsP5FgydXBlamNcZ4EcAp8SSR5pJyb22uKtDjiJbEvIwif-PliSuMgzi2ljAh1genm3QEk_5Avlm4qXrNaKsUkcHR92odps",
      rarity: "Legendary"
    },
    { 
      name: "Infiltrator Suit", 
      id: "V.2", 
      price: "2,100 $XODUS", 
      time: "00:12:04", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB24mt2BzHJnwYa2XIG6EnFlqRrH-rLDGiTIjVU44Wgg3FAdOZOlzp7mIGyVQJDqjGQ_643U3oH3P9GMbIrIb3Ok-9s_VPsDU0MxZmTsRZaelkTrmBMOtdMyMnWCDjvozeBTOG_VxW3KMiWXlzq4CPFoElh61XEkQ7bLBScrhUZfGOQBYqfH88hn51unF0qOVwqyimEWOv_uKsUBwnblew9dd1VxwP-u73N8UAG-P1i7i9jDeqiaL-O64dx8JtfjvCOtYDUea0vI30",
      rarity: "Exotic"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-screen pb-24 overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 bg-background-dark/95 backdrop-blur-md border-b border-primary/20 p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
          <h1 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
            XODUS <span className="text-primary">MARKET</span>
          </h1>
        </div>
        <button className="size-10 rounded border border-primary/20 flex items-center justify-center bg-primary/5">
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
        </button>
      </header>

      <main className="p-6 space-y-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">search</span>
            <input type="text" placeholder="Search Prototype Gear, Cybernetics..." className="w-full bg-surface-dark border border-primary/20 rounded-lg py-3 pl-12 pr-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 h-10 bg-surface-dark border border-primary/20 rounded flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-sm">filter_alt</span> Rarity: Legendary
            </button>
            <button className="px-4 h-10 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span> SUI VERIFIED
            </button>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-primary/20 pb-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Hot Drops <span className="text-primary/40 text-xs font-bold not-italic tracking-[0.2em] ml-2">LIVE AUCTIONS</span></h2>
            <span className="text-primary text-[10px] font-black tracking-widest uppercase hover:underline cursor-pointer">View All</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.name} className="group bg-surface-dark border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="px-2 py-1 bg-black/80 backdrop-blur-md border border-primary/40 text-[9px] font-black uppercase tracking-widest text-primary">{item.rarity}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background-dark to-transparent flex justify-between items-end">
                    <div>
                      <p className="text-[9px] font-bold text-primary/60 uppercase">Ends In</p>
                      <p className={`text-sm font-black italic ${item.rarity === 'Exotic' ? 'text-red-500' : 'text-white'}`}>{item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-primary/60 uppercase">Current Bid</p>
                      <p className="text-lg font-black italic text-primary">{item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-black italic uppercase text-white">{item.name} <span className="text-primary/60 not-italic font-bold ml-1">{item.id}</span></h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight mt-1">Limited Prototype Series</p>
                  </div>
                  <button className="w-full py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(242,185,13,0.2)]">
                    Place Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarketScreen;
