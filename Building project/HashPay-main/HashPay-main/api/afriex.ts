
const AFRIEX_BASE_URL = import.meta.env.VITE_AFRIEX_BASE_URL || 'https://api.afriex.co/v1';
const AFRIEX_SECRET_KEY = import.meta.env.VITE_AFRIEX_SECRET_KEY || '';

/** Currency metadata for display purposes */
const CURRENCY_META: Record<string, { symbol: string; name: string }> = {
    NGN: { symbol: '₦', name: 'Nigerian Naira' },
    USD: { symbol: '$', name: 'US Dollar' },
    GBP: { symbol: '£', name: 'British Pound' },
    EUR: { symbol: '€', name: 'Euro' },
    GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi' },
    KES: { symbol: 'KSh', name: 'Kenyan Shilling' },
};

/** Shared authenticated fetch helper */
async function afriexFetch(path: string, options: RequestInit = {}): Promise<any> {
    const res = await fetch(`${AFRIEX_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AFRIEX_SECRET_KEY}`,
            ...(options.headers || {}),
        },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(json?.message || json?.error || `Afriex API error: ${res.status}`);
    }
    return json;
}

export const afriexClient = {

    /** Initiate a local or international transfer */
    initiateTransfer: async (data: {
        amount: number;
        currency: string;
        recipient_address: string;
        recipient_name: string;
        recipient_bank?: string;
        swift_code?: string;
        iban?: string;
        description?: string;
        transfer_type?: 'local' | 'international';
    }) => {
        try {
            return await afriexFetch('/payments/initiate', {
                method: 'POST',
                body: JSON.stringify({
                    amount: data.amount,
                    currency: data.currency,
                    recipient_address: data.recipient_address,
                    recipient_name: data.recipient_name,
                    recipient_bank: data.recipient_bank,
                    swift_code: data.swift_code,
                    iban: data.iban,
                    description: data.description || 'HashPay Transfer',
                    payment_method: data.transfer_type === 'international' ? 'swift_wire' : 'bank_transfer',
                }),
            });
        } catch (error) {
            console.error('Afriex Transfer Error:', error);
            throw error;
        }
    },

    /** Get the status of a previously initiated transfer */
    getTransferStatus: async (transactionId: string) => {
        try {
            return await afriexFetch(`/payments/${transactionId}`);
        } catch (error) {
            console.error('Afriex Status Error:', error);
            throw error;
        }
    },

    /** Fetch live wallet balance for a given currency */
    getFiatBalance: async (currency: string = 'NGN') => {
        try {
            const data = await afriexFetch(`/wallet/balance?currency=${currency}`);
            const meta = CURRENCY_META[currency] || { symbol: currency, name: currency };
            return {
                total_balance: data.total_balance ?? data.balance ?? 0,
                checking: data.checking ?? data.available ?? data.balance ?? 0,
                savings: data.savings ?? 0,
                symbol: meta.symbol,
                currency,
                last_updated: data.last_updated || 'just now',
            };
        } catch (error) {
            console.error('Afriex Balance Error:', error);
            // Graceful fallback so the UI doesn't break on API error
            const meta = CURRENCY_META[currency] || { symbol: currency };
            return { total_balance: 0, checking: 0, savings: 0, symbol: meta.symbol, currency, last_updated: 'unavailable' };
        }
    },

    /** Fetch real-time account performance metrics */
    getAccountMetrics: async () => {
        try {
            const data = await afriexFetch('/wallet/metrics');
            return {
                trend: data.trend || [20, 45, 28, 80, 40, 55, 70],
                percentage_change: data.percentage_change || '+0.0%',
            };
        } catch (error) {
            console.error('Afriex Metrics Error:', error);
            return { trend: [20, 45, 28, 80, 40, 55, 70], percentage_change: '+0.0%' };
        }
    },

    /** Fetch live transaction history */
    getTransactions: async (accountId: string) => {
        try {
            const data = await afriexFetch(`/transactions?account=${accountId}&limit=20`);
            const items: any[] = data.transactions || data.data || data || [];
            return items.map((tx: any) => ({
                id: tx.id || tx.transaction_id,
                type: tx.type || (tx.debit ? 'debit' : 'credit'),
                amount: parseFloat(tx.amount || tx.value || '0'),
                recipient: tx.recipient || tx.description || tx.narration || 'Transfer',
                date: tx.date || tx.created_at || 'Recently',
                icon: tx.icon || (tx.type === 'debit' ? 'send' : 'call_received'),
                currency: tx.currency || 'NGN',
            }));
        } catch (error) {
            console.error('Afriex Transactions Error:', error);
            return [];
        }
    },

    /** Fund the account via a payment method */
    fundAccount: async (details: { amount: number; currency: string; method: string }) => {
        try {
            const data = await afriexFetch('/wallet/fund', {
                method: 'POST',
                body: JSON.stringify({
                    amount: details.amount,
                    currency: details.currency,
                    payment_method: details.method,
                }),
            });
            return {
                success: true,
                message: data.message || `Funding of ${details.amount} ${details.currency} initiated`,
                reference: data.reference || data.transaction_id,
                checkout_url: data.checkout_url || data.payment_url || null,
            };
        } catch (error) {
            console.error('Afriex Fund Error:', error);
            throw error;
        }
    },

    /** Withdraw funds to a bank account or mobile money */
    withdrawFunds: async (details: { amount: number; currency: string; method: string; destination: string }) => {
        try {
            const data = await afriexFetch('/wallet/withdraw', {
                method: 'POST',
                body: JSON.stringify({
                    amount: details.amount,
                    currency: details.currency,
                    withdrawal_method: details.method,
                    destination: details.destination,
                }),
            });
            return {
                success: true,
                message: data.message || `Withdrawal of ${details.amount} ${details.currency} initiated`,
                reference: data.reference || data.transaction_id,
            };
        } catch (error) {
            console.error('Afriex Withdrawal Error:', error);
            throw error;
        }
    },

    /** Fetch savings goals (local storage fallback — Afriex may not have this endpoint) */
    getSavingsGoals: async () => {
        try {
            const data = await afriexFetch('/savings/goals');
            return data.goals || data || [];
        } catch {
            // Return demo data if endpoint not supported
            return [
                { id: 'goal1', name: 'New Laptop', current: 450000, target: 800000, color: '#2176ff' },
                { id: 'goal2', name: 'Holiday Fund', current: 120000, target: 200000, color: '#22c55e' },
                { id: 'goal3', name: 'Emergency Fund', current: 50000, target: 500000, color: '#f59e0b' },
            ];
        }
    },

    /** Fetch virtual cards */
    getVirtualCards: async () => {
        try {
            const data = await afriexFetch('/cards/virtual');
            const cards = data.cards || data || [];
            return cards.map((c: any) => ({
                id: c.id,
                type: c.type || 'Virtual Platinum',
                balance: c.balance || 0,
                limit: c.limit || 10000,
                status: c.status || 'Active',
                number: c.masked_pan || c.number || '**** **** **** ****',
                expiry: c.expiry_date || c.expiry || '--/--',
                cvv: '***',
            }));
        } catch {
            return [
                { id: 'card1', type: 'Virtual Platinum', balance: 0, limit: 10000, status: 'Active', number: '5432 12** **** 1234', expiry: '12/26', cvv: '***' }
            ];
        }
    },

    /** Create a new bank sub-account */
    addAccount: async (details: any) => {
        try {
            const data = await afriexFetch('/accounts', { method: 'POST', body: JSON.stringify(details) });
            return { success: true, message: data.message || 'Account created', accountId: data.account_id };
        } catch (error) {
            console.error('Add Account Error:', error);
            throw error;
        }
    },

    /** Create a savings goal */
    createSavingsGoal: async (goal: any) => {
        try {
            const data = await afriexFetch('/savings/goals', { method: 'POST', body: JSON.stringify(goal) });
            return { success: true, message: data.message || 'Goal created', goalId: data.goal_id };
        } catch (error) {
            console.error('Savings Goal Error:', error);
            throw error;
        }
    },

    /** Issue a virtual card */
    issueVirtualCard: async (details: any) => {
        try {
            const data = await afriexFetch('/cards/virtual', { method: 'POST', body: JSON.stringify(details) });
            return {
                success: true,
                message: data.message || 'Card issued',
                card: {
                    id: data.card_id || 'card_' + Date.now(),
                    type: details.type || 'Virtual Standard',
                    balance: 0,
                    limit: details.limit || 5000,
                    status: 'Active',
                    number: data.masked_pan || '4321 **** **** ' + Math.floor(1000 + Math.random() * 9000),
                    expiry: data.expiry_date || '12/28',
                    cvv: '***',
                },
            };
        } catch (error) {
            console.error('Issue Card Error:', error);
            throw error;
        }
    },
};
