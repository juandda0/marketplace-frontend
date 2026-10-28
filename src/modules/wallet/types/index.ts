export type TransactionType = 'recharge' | 'purchase' | 'bid' | 'raffle' | 'sale' | 'reward' | 'refund';

export interface WalletTransaction {
    id: string;
    userId: string;
    type: TransactionType;
    title: string;
    subtitle?: string;
    /** Monto en UNICOIN, positivo (ingreso) o negativo (gasto). */
    amount: number;
    createdAt: number;
}

export interface Wallet {
    balance: number;
    transactions: WalletTransaction[];
}

export type RechargeMethod = 'nequi' | 'daviplata' | 'pse' | 'efectivo';
