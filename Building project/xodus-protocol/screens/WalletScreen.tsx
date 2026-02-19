
import React, { useMemo } from 'react';
import { useGame } from '../GameContext';
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

const WalletScreen: React.FC = () => {
  const { state } = useGame();
  const { resources } = state;
  const currentAccount = useCurrentAccount();

  // Fetch real SUI balance
  const { data: balanceData, isLoading: isBalanceLoading } = useSuiClientQuery(
    'getBalance',
    {
      owner: currentAccount?.address || '',
    },
    {
      enabled: !!currentAccount,
      refetchInterval: 10000,
    }
  );

  const displayBalance = useMemo(() => {
    if (!currentAccount) return resources.xodus;
    if (isBalanceLoading || !balanceData) return 0;
    // Conversion: 1 SUI = 10^9 MIST
    return Number(balanceData.totalBalance) / 1_000_000_000;
  }, [currentAccount, balanceData, isBalanceLoading, resources.xodus]);

  return (
    <div className="flex-1 p-6 h-screen flex flex-col pb-24 overflow-y-auto custom-scrollbar">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-primary/30 rounded bg-primary/10">
            <span className="material-symbols-outlined text-primary">shield_person</span>
          </div>
          <div>
            <h1 className="text-lg font-black italic uppercase tracking-widest leading-none">XODUS</h1>
            <p className="text-[9px] text-primary/60 font-medium uppercase tracking-[0.2em]">Protocol v2.04</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] text-primary/40 uppercase font-bold tracking-widest">Sui Mainnet</p>
            <div className="flex items-center gap-1 justify-end">
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px] ${currentAccount ? 'bg-green-500 shadow-green-500' : 'bg-red-500 shadow-red-500'}`}></span>
              <span className={`text-[10px] font-black ${currentAccount ? 'text-green-500' : 'text-red-500'}`}>
                {currentAccount ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
          </div>
          <ConnectButton className="!bg-primary !text-black !font-black !uppercase !text-[10px] !tracking-widest !rounded !border-none !h-10 !px-4 hover:!bg-white transition-all" />
        </div>
      </header>

      <div className="space-y-6 max-w-2xl mx-auto w-full">
        {/* Balance Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-surface-dark border border-primary/30 rounded-xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[120px] text-primary rotate-12">currency_bitcoin</span>
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-primary/60 text-[10px] font-black uppercase tracking-[0.2em]">Asset Terminal // $SUI Balance</span>
              <div className="flex items-baseline gap-3 mt-4">
                <h2 className="text-5xl font-black italic tracking-tighter text-white glow-text">
                  {isBalanceLoading ? '...' : displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <span className="text-primary text-xl font-black italic tracking-tighter">$SUI</span>
              </div>
              {currentAccount && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-500 text-xs font-bold">+0.00% (24h)</span>
                  <span className="text-primary/40 text-xs font-bold">≈ ${(displayBalance * 3.85).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                </div>
              )}
              {!currentAccount && (
                <p className="text-primary/40 text-xs font-bold mt-2 italic">Using cached local data</p>
              )}
              <div className="flex gap-3 mt-8">
                <button className="flex-1 h-12 bg-primary text-black font-black uppercase text-xs rounded hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50" disabled={!currentAccount}>
                  <span className="material-symbols-outlined text-lg font-bold">call_received</span> Receive
                </button>
                <button className="flex-1 h-12 bg-transparent border border-primary/50 text-primary font-black uppercase text-xs rounded hover:bg-primary/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50" disabled={!currentAccount}>
                  <span className="material-symbols-outlined text-lg font-bold">send</span> Transmit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Panel */}
        <section className="bg-surface-dark border border-primary/20 rounded-xl p-6">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">swap_horiz</span> Conversion Matrix
          </h3>
          <div className="space-y-2">
            <div className="bg-black/60 border border-primary/10 rounded-lg p-4 flex flex-col gap-1">
              <div className="flex justify-between text-[9px] text-primary/40 uppercase font-bold tracking-widest">
                <span>Input Asset</span>
                <span>Balance: 4,200.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white italic">1000.00</span>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded border border-primary/20">
                  <span className="text-primary font-black text-[10px] italic">BIO-DATA</span>
                  <span className="material-symbols-outlined text-primary text-sm">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-primary p-1.5 rounded-full border-4 border-background-dark shadow-lg cursor-pointer hover:rotate-180 transition-transform">
                <span className="material-symbols-outlined text-black font-black text-xl">keyboard_double_arrow_down</span>
              </div>
            </div>

            <div className="bg-black/60 border border-primary/10 rounded-lg p-4 flex flex-col gap-1">
              <div className="flex justify-between text-[9px] text-primary/40 uppercase font-bold tracking-widest">
                <span>Estimated Output</span>
                <span>Fee: 0.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary italic">245.50</span>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded border border-primary/20">
                  <span className="text-primary font-black text-[10px] italic">$XODUS</span>
                  <span className="material-symbols-outlined text-primary text-sm">expand_more</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 h-14 bg-primary/10 border border-primary/40 text-primary font-black uppercase text-xs rounded hover:bg-primary hover:text-black transition-all">
            Initialize Exchange Sequence
          </button>
        </section>
      </div>
    </div>
  );
};

export default WalletScreen;
