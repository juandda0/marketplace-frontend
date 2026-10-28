import { createContext } from 'react';
import type { WalletTransaction } from '../types';

export interface WalletContextType {
    balance: number;
    transactions: WalletTransaction[];
    loading: boolean;
    refresh: () => void;
}

export const WalletContext = createContext<WalletContextType | null>(null);
