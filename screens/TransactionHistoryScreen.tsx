import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppScreen, Transaction } from '../types';
import { useWallet } from '../WalletContext';
import { useToast } from '../components/Toast';

interface TransactionHistoryScreenProps {
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
}

type FilterType = 'all' | 'sent' | 'received';
type DateFilter = 'all' | 'today' | 'week' | 'month' | 'year';

const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({ onBack, onNavigate }) => {
  const { transactions, prices } = useWallet();
  const { showToast } = useToast();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Parse date string to Date object (handles various formats)
  const parseDate = (dateStr: string): Date => {
    const now = new Date();
    const lower = dateStr.toLowerCase();
    
    if (lower.includes('today')) {
      return now;
    } else if (lower.includes('yesterday')) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    } else if (lower.includes('days ago')) {
      const daysMatch = lower.match(/(\d+)\s*days?\s*ago/);
      if (daysMatch) {
        const days = parseInt(daysMatch[1]);
        const date = new Date(now);
        date.setDate(date.getDate() - days);
        return date;
      }
    }
    
    // Try parsing as a standard date
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? now : parsed;
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.recipient.toLowerCase().includes(query) ||
        tx.amount.toLowerCase().includes(query) ||
        tx.currency.toLowerCase().includes(query) ||
        tx.id.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(tx => {
        const txDate = parseDate(tx.date);
        
        switch (dateFilter) {
          case 'today':
            return txDate >= startOfToday;
          case 'week': {
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return txDate >= weekAgo;
          }
          case 'month': {
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return txDate >= monthAgo;
          }
          case 'year': {
            const yearAgo = new Date(now);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            return txDate >= yearAgo;
          }
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [transactions, searchQuery, typeFilter, dateFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const sent = filteredTransactions.filter(tx => tx.type === 'sent');
    const received = filteredTransactions.filter(tx => tx.type === 'received');
    
    const totalSent = sent.reduce((acc, tx) => {
      const amount = parseFloat(tx.amount.replace(/,/g, ''));
      const rate = prices[tx.currency] || 1;
      return acc + (amount * rate);
    }, 0);
    
    const totalReceived = received.reduce((acc, tx) => {
      const amount = parseFloat(tx.amount.replace(/,/g, ''));
      const rate = prices[tx.currency] || 1;
      return acc + (amount * rate);
    }, 0);

    return {
      totalTransactions: filteredTransactions.length,
      sentCount: sent.length,
      receivedCount: received.length,
      totalSent,
      totalReceived,
      netFlow: totalReceived - totalSent
    };
  }, [filteredTransactions, prices]);

  // Export functions
  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Amount', 'Currency', 'Recipient', 'Date'];
    const rows = filteredTransactions.map(tx => [
      tx.id,
      tx.type,
      tx.amount,
      tx.currency,
      tx.recipient,
      tx.date
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hashpay_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Transactions exported to CSV', 'success');
    setShowExportMenu(false);
  };

  const exportToPDF = async () => {
    // Using html2canvas which is already in the project dependencies
    const { default: html2canvas } = await import('html2canvas');
    
    const element = document.getElementById('transaction-list');
    if (!element) {
      showToast('Failed to generate PDF', 'error');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#0d121b',
        scale: 2,
      });
      
      // Create a simple PDF-like image download (for demo purposes)
      // In production, you'd use a proper PDF library like jsPDF
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `hashpay_transactions_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('Transactions exported as image', 'success');
    } catch (error) {
      showToast('Export failed', 'error');
    }
    setShowExportMenu(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setDateFilter('all');
    showToast('Filters cleared', 'info');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-background-dark text-white font-display min-h-screen flex flex-col overflow-x-hidden animate-fade-in pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 shadow-lg"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-primary-light">History</h1>
          <span className="text-[8px] font-black text-text-tertiary uppercase tracking-[0.2em]">
            {stats.totalTransactions} Transactions
          </span>
        </div>
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 text-primary shadow-lg relative"
        >
          <span className="material-symbols-outlined text-2xl">download</span>
        </button>
      </header>

      {/* Export Menu Dropdown */}
      <AnimatePresence>
        {showExportMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-6 z-50 bg-surface-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={exportToCSV}
              className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-all w-full"
            >
              <span className="material-symbols-outlined text-green-400">table_chart</span>
              <span className="text-sm font-bold">Export as CSV</span>
            </button>
            <div className="h-px bg-white/5" />
            <button
              onClick={exportToPDF}
              className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-all w-full"
            >
              <span className="material-symbols-outlined text-red-400">picture_as_pdf</span>
              <span className="text-sm font-bold">Export as Image</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col p-6 gap-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            search
          </span>
          <input
            type="text"
            placeholder="Search by recipient, amount, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-14 rounded-2xl bg-surface-dark/50 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold text-white placeholder:text-gray-600 outline-none transition-all shadow-xl"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${showFilters ? 'bg-primary text-white' : 'text-gray-500 hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-5 space-y-5">
                {/* Type Filter */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">
                    Transaction Type
                  </label>
                  <div className="flex gap-2">
                    {(['all', 'sent', 'received'] as FilterType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          typeFilter === type
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-white/5 text-gray-500 hover:text-white'
                        }`}
                      >
                        {type === 'all' ? 'All' : type === 'sent' ? '↑ Sent' : '↓ Received'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">
                    Date Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { key: 'all', label: 'All Time' },
                      { key: 'today', label: 'Today' },
                      { key: 'week', label: '7 Days' },
                      { key: 'month', label: '30 Days' },
                      { key: 'year', label: '1 Year' }
                    ] as { key: DateFilter; label: string }[]).map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setDateFilter(key)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          dateFilter === key
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-white/5 text-gray-500 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Sent</p>
            <p className="text-lg font-black text-error">{stats.sentCount}</p>
            <p className="text-[9px] font-bold text-gray-600">${stats.totalSent.toFixed(2)}</p>
          </div>
          <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Received</p>
            <p className="text-lg font-black text-success">{stats.receivedCount}</p>
            <p className="text-[9px] font-bold text-gray-600">${stats.totalReceived.toFixed(2)}</p>
          </div>
          <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Net Flow</p>
            <p className={`text-lg font-black ${stats.netFlow >= 0 ? 'text-success' : 'text-error'}`}>
              {stats.netFlow >= 0 ? '+' : ''}{stats.netFlow.toFixed(2)}
            </p>
            <p className="text-[9px] font-bold text-gray-600">USD</p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="flex-1" id="transaction-list">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              {filteredTransactions.length > 0 ? 'All Transactions' : 'No Results'}
            </h3>
            {searchQuery || typeFilter !== 'all' || dateFilter !== 'all' ? (
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                Filtered
              </span>
            ) : null}
          </div>

          {filteredTransactions.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {filteredTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  variants={itemVariants}
                  onClick={() => setSelectedTx(tx)}
                  className="flex items-center justify-between p-5 bg-surface-dark/30 rounded-2xl border border-white/5 hover:bg-surface-dark/50 hover:border-white/10 transition-all cursor-pointer active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center ${
                      tx.type === 'sent' 
                        ? 'bg-error/10 text-error border border-error/20' 
                        : 'bg-success/10 text-success border border-success/20'
                    }`}>
                      <span className="material-symbols-outlined text-xl">
                        {tx.type === 'sent' ? 'north_east' : 'south_west'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white group-hover:text-primary transition-colors">
                        {tx.recipient}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                          {tx.date}
                        </span>
                        <span className="text-[8px] font-bold text-gray-700">•</span>
                        <span className="text-[10px] font-bold text-gray-700 uppercase">
                          {tx.id.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-black ${tx.type === 'sent' ? 'text-error' : 'text-success'}`}>
                      {tx.type === 'sent' ? '-' : '+'}{tx.amount}
                    </p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase">{tx.currency}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-20 rounded-3xl bg-surface-dark/50 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-gray-600">receipt_long</span>
              </div>
              <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-2">No Transactions Found</p>
              <p className="text-xs text-gray-700 text-center max-w-xs">
                {searchQuery || typeFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters or search query'
                  : 'Your transaction history will appear here'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setSelectedTx(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-surface-dark border-t border-white/10 rounded-t-[2.5rem] p-8"
            >
              {/* Handle */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8" />

              {/* Transaction Icon */}
              <div className="flex justify-center mb-6">
                <div className={`size-20 rounded-3xl flex items-center justify-center ${
                  selectedTx.type === 'sent' 
                    ? 'bg-error/10 text-error border border-error/20' 
                    : 'bg-success/10 text-success border border-success/20'
                }`}>
                  <span className="material-symbols-outlined text-4xl">
                    {selectedTx.type === 'sent' ? 'north_east' : 'south_west'}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center mb-8">
                <p className={`text-4xl font-black ${selectedTx.type === 'sent' ? 'text-error' : 'text-success'}`}>
                  {selectedTx.type === 'sent' ? '-' : '+'}{selectedTx.amount} {selectedTx.currency}
                </p>
                <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">
                  {selectedTx.type === 'sent' ? 'Sent to' : 'Received from'} {selectedTx.recipient}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Transaction ID</span>
                  <span className="text-xs font-bold text-white font-mono">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date & Time</span>
                  <span className="text-xs font-bold text-white">{selectedTx.date}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</span>
                  <span className="text-xs font-black text-success uppercase tracking-widest flex items-center gap-2">
                    <span className="size-2 bg-success rounded-full" />
                    Completed
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Fee</span>
                  <span className="text-xs font-bold text-white">~0.001 SUI</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedTx.id);
                    showToast('Transaction ID copied', 'success');
                  }}
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">content_copy</span>
                  Copy ID
                </button>
                <button
                  onClick={() => {
                    showToast('Opening block explorer...', 'info');
                    // In production, open actual block explorer
                  }}
                  className="flex-1 py-4 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                  View on Explorer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionHistoryScreen;
