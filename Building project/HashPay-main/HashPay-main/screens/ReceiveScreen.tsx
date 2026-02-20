import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';
import { useWallet } from '../WalletContext';

interface ReceiveScreenProps {
  onBack: () => void;
}

const ReceiveScreen: React.FC<ReceiveScreenProps> = ({ onBack }) => {
  const { showToast } = useToast();
  const { userProfile } = useWallet();
  const [isRequesting, setIsRequesting] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('SUI');
  const [note, setNote] = useState('');
  const [qrData, setQrData] = useState(userProfile.address);

  const address = userProfile.address;

  useEffect(() => {
    // Dynamically update QR data based on form inputs
    if (isRequesting && amount) {
      setQrData(`hashpay:${address}?amount=${amount}&token=${selectedToken}&note=${encodeURIComponent(note)}`);
    } else {
      setQrData(address);
    }
  }, [isRequesting, amount, selectedToken, note, address]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    showToast('Address copied to clipboard', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Hash-pay Address',
        text: isRequesting ? `Pay me ${amount} ${selectedToken} on Hash-pay` : `My Hash-pay Address: ${address}`,
        url: qrData
      }).catch(() => showToast('Sharing failed', 'error'));
    } else {
      showToast('Native sharing not supported, address copied', 'info');
      copyToClipboard();
    }
  };

  const tokens = [
    { symbol: 'SUI', name: 'Sui Network', icon: 'water_drop', color: 'text-blue-400' },
    { symbol: 'USDC', name: 'USD Coin', icon: 'attach_money', color: 'text-green-400' },
    { symbol: 'BTC', name: 'Bitcoin', icon: 'currency_bitcoin', color: 'text-orange-400' }
  ];

  return (
    <div className="bg-background-dark text-white font-display min-h-screen flex flex-col overflow-x-hidden animate-fade-in pb-10">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <button onClick={onBack} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 shadow-lg border border-white/5">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-xl font-black leading-tight tracking-tight uppercase tracking-widest text-primary-light">Receive Assets</h1>
        <button onClick={() => showToast('Settings coming soon!', 'info')} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 text-gray-400 shadow-lg border border-white/5">
          <span className="material-symbols-outlined text-2xl">tune</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-8 items-center pt-8">
        {/* QR Code Section */}
        <section className="w-full max-w-sm">
          <div className="relative group perspective-1000">
            <div className="relative bg-gradient-to-br from-surface-dark to-background-dark rounded-[3rem] p-8 border border-white/10 shadow-2xl flex flex-col items-center gap-6 group-hover:scale-[1.01] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all"></div>

              <div className="relative z-10 w-full aspect-square bg-white rounded-[2rem] p-6 shadow-2xl ring-8 ring-white/5 overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&color=0f172a&bgcolor=ffffff`}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-x-0 bottom-0 py-2 bg-primary/90 text-[8px] font-black uppercase tracking-[0.2em] text-center text-white animate-pulse">
                  Scan to Pay
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 w-full">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Your Wallet Address</p>
                <div
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-5 py-4 rounded-2xl border border-white/5 cursor-pointer transition-all active:scale-95 group/addr w-full justify-between shadow-inner"
                >
                  <span className="text-xs font-black font-mono text-gray-300 truncate group-hover/addr:text-primary transition-colors pr-2">
                    {address.slice(0, 10)}...{address.slice(-10)}
                  </span>
                  <span className="material-symbols-outlined text-primary text-xl">content_copy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="w-full grid grid-cols-2 gap-4 max-w-sm">
          <button
            onClick={() => setIsRequesting(!isRequesting)}
            className={`flex flex-col items-center gap-4 p-5 rounded-[2rem] transition-all active:scale-95 group shadow-xl border ${isRequesting ? 'bg-primary border-primary/50' : 'bg-surface-dark/40 hover:bg-surface-dark border-white/5'}`}
          >
            <div className={`size-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${isRequesting ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
              <span className="material-symbols-outlined text-2xl font-bold">{isRequesting ? 'close' : 'payments'}</span>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isRequesting ? 'text-white' : 'text-gray-400'}`}>
              {isRequesting ? 'Cancel Request' : 'Set Amount'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-4 p-5 bg-surface-dark/40 hover:bg-surface-dark border border-white/5 rounded-[2rem] transition-all active:scale-95 group shadow-xl"
          >
            <div className="size-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <span className="material-symbols-outlined text-2xl font-bold">ios_share</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Copy/Share</span>
          </button>
        </section>

        {/* Social Share Intents */}
        <section className="w-full flex justify-between gap-3 max-w-sm px-2">
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Pay me ${amount || ''} ${selectedToken} on HashPay! Address: ${address}`)}`, '_blank')}
            className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex flex-col items-center gap-2 group"
          >
            <div className="text-white group-hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Post</span>
          </button>
          <button
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://hashpay.app')}&summary=${encodeURIComponent(`My HashPay Address: ${address}`)}`, '_blank')}
            className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex flex-col items-center gap-2 group"
          >
            <div className="text-white group-hover:text-blue-500 transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Share</span>
          </button>
          <button
            onClick={() => window.open(`mailto:?subject=${encodeURIComponent('My HashPay Payment Address')}&body=${encodeURIComponent(`Here is my HashPay address:\n\n${address}\n\nSend ${amount || ''} ${selectedToken}!`)}`, '_blank')}
            className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex flex-col items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-xl text-white group-hover:text-red-500 transition-colors">mail</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Email</span>
          </button>
        </section>

        {/* Request Form */}
        {isRequesting && (
          <section className="w-full max-w-sm animate-slide-up">
            <div className="bg-surface-dark/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-light">Payment Request Details</h3>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">Amount to Receive</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-lg font-black focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 pointer-events-none">
                      <span className="text-[10px] font-black text-primary">{selectedToken}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">Select Asset</label>
                  <div className="grid grid-cols-3 gap-3">
                    {tokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => setSelectedToken(token.symbol)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${selectedToken === token.symbol ? 'bg-primary/20 border-primary shadow-lg ring-1 ring-primary' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'}`}
                      >
                        <span className={`material-symbols-outlined text-xl ${token.color}`}>{token.icon}</span>
                        <span className="text-[9px] font-black uppercase">{token.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">Add a Note (Optional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Dinner, Rent..."
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-700 resize-none"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Network Info */}
        {!isRequesting && (
          <section className="w-full mt-4 flex flex-col gap-4 max-w-sm">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Active Network</h3>
              <span className="badge badge-success !text-[8px] animate-pulse">Live</span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-[2rem] border bg-primary/10 border-primary/30 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-2xl">lan</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white">SUI Mainnet</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Connected & Secure</span>
                </div>
              </div>
              <div className="size-6 bg-primary rounded-full flex items-center justify-center border-4 border-background-dark shadow-lg">
                <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="p-8 text-center mt-auto pb-safe">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] leading-relaxed">
          Only send <span className="text-primary-light">SUI</span> or <span className="text-primary-light">Vite tokens</span> to this address. <br />
          Other assets will be permanently lost.
        </p>
      </footer>
    </div>
  );
};

export default ReceiveScreen;
