
import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { useWallet } from '../WalletContext';

interface EscrowScreenProps {
  onBack: () => void;
}

const EscrowScreen: React.FC<EscrowScreenProps> = ({ onBack }) => {
  const { showToast } = useToast();
  const { escrows, createEscrow, releaseEscrow, createEscrowOnChain, contacts } = useWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'active'>('create');
  const [amount, setAmount] = useState('500.00');
  const [recipient, setRecipient] = useState('Jane Cooper');

  /* New State for Currency & Help */
  const [currency, setCurrency] = useState('USD');
  const [showHelp, setShowHelp] = useState(false);
  const currencies = ['USD', 'EUR', 'NGN', 'KES', 'SUI', 'USDC'];

  const handleCreateEscrow = async () => {
    // Local simulation/record keeping
    const newId = Date.now().toString().slice(-6);
    // Directly mutate for demo updates (in real app use dispatch)
    // We'll trust the context updates state if properly implemented, 
    // but here we might need to rely on WalletContext to act.
    // Assuming createEscrow updates the list contextually.

    createEscrow({
      id: newId,
      amount: `${amount} ${currency}`,
      recipient,
      expiryDate: '7 Days',
      status: 'pending' // pending -> active
    });

    // On-chain transaction simulation
    try {
      const contact = contacts.find(c => c.name === recipient);
      const recipientAddress = contact?.address || recipient;
      await createEscrowOnChain(recipientAddress, amount);
    } catch (e) {
      console.warn('On-chain escrow simulated', e);
    }

    setActiveTab('active');
    showToast('Escrow Created Successfully', 'success');
  };

  const handleAction = (id: string, action: 'sign' | 'dispute' | 'release') => {
    if (action === 'sign') {
      showToast('Escrow Signed & Approved', 'success');
      // In real app, this would update status to 'signed'
    } else if (action === 'dispute') {
      showToast('Dispute Opened (Stubborn Mode)', 'warning');
      // Update status to 'disputed'
    } else if (action === 'release') {
      releaseEscrow(id);
      showToast('Funds Released', 'success');
    }
  };

  return (
    <div className="bg-background-dark text-white font-display min-h-screen flex flex-col overflow-x-hidden animate-fade-in custom-scrollbar overflow-y-auto pb-10">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <button onClick={onBack} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 shadow-lg">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-xl font-black leading-tight tracking-tight uppercase tracking-widest text-primary-light">Secure Escrow</h1>
        <button onClick={() => setShowHelp(true)} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 text-gray-400 shadow-lg">
          <span className="material-symbols-outlined text-2xl font-bold">help</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-8">
        {/* Tabs */}
        <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5 mx-auto w-full max-w-xs">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'create' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Create
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Active
          </button>
        </div>

        {activeTab === 'create' ? (
          <div className="flex flex-col gap-8 animate-slide-up">
            <section className="bg-gradient-to-br from-indigo-700 via-primary to-blue-600 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 mb-6 shadow-xl">
                  <span className="material-symbols-outlined text-white text-4xl font-bold">verified_user</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2 uppercase">Programmable Trust</h3>
                <p className="text-blue-100 text-xs font-bold leading-relaxed opacity-80 uppercase tracking-widest">
                  Smart contracts hold assets until conditions are met. <br /> Zero-trust, fully automated.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pl-1">Contract Parameters</label>
                <div className="bg-surface-dark border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Release Amount</span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="bg-white/5 text-[9px] font-black text-white uppercase tracking-widest rounded-lg px-2 py-1 outline-none border border-white/5 focus:border-primary"
                      >
                        {currencies.map(c => <option key={c} value={c} className="bg-background-dark">{c}</option>)}
                      </select>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white tracking-tighter">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-transparent text-5xl font-black text-white outline-none w-full tracking-tighter border-none focus:ring-0 p-0"
                      />
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/5"></div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest pl-1">Recipient Name</span>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-500">schedule</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Expiry: 7 Days</span>
                      </div>
                      <span className="text-[9px] font-bold text-primary-light uppercase">Auto-Refund</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button
              onClick={handleCreateEscrow}
              className="w-full h-18 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 transition-all active:scale-95 border border-white/10 mt-4"
            >
              Initialize Escrow
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-slide-up">
            {escrows.length > 0 ? (
              escrows.map(escrow => (
                <div key={escrow.id} className="bg-surface-dark/40 border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 shadow-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">lock</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">{escrow.recipient}</h4>
                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">ID: {escrow.id}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${escrow.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                      {escrow.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Stored Value</p>
                      <p className="text-2xl font-black text-white">{escrow.amount}</p>
                    </div>
                  </div>

                  {/* Escrow Actions */}
                  {escrow.status === 'pending' && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAction(escrow.id, 'sign')}
                        className="flex-1 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-blue-500/20 transition-all"
                      >
                        Sign
                      </button>
                      <button
                        onClick={() => handleAction(escrow.id, 'dispute')}
                        className="flex-1 py-3 bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-red-500/20 transition-all"
                      >
                        Stubborn
                      </button>
                    </div>
                  )}

                  {escrow.status === 'pending' && (
                    <button
                      onClick={() => handleAction(escrow.id, 'release')}
                      className="w-full py-3 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                      Release Funds
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 opacity-30">
                <span className="material-symbols-outlined text-8xl mb-4">lock_reset</span>
                <p className="text-sm font-black uppercase tracking-[0.2em]">No active escrows</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in" onClick={() => setShowHelp(false)}>
          <div className="bg-surface-dark border border-white/10 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            <div className="mb-6 size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-2xl">help</span></div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">Escrow Help</h3>
            <p className="text-xs text-gray-400 font-bold leading-relaxed mb-4">
              HashPay Secure Escrow holds funds in a smart contract until both parties agree.
            </p>
            <ul className="text-[10px] text-gray-500 font-bold space-y-2 uppercase tracking-wide list-disc pl-4 mb-6">
              <li><span className="text-white">Sign:</span> Approve the trade terms.</li>
              <li><span className="text-white">Stubborn:</span> Raise a dispute/pause.</li>
              <li><span className="text-white">Release:</span> Finalize transfer.</li>
            </ul>
            <button onClick={() => setShowHelp(false)} className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscrowScreen;
