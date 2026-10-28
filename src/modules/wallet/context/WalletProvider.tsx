import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { WalletContext } from './WalletContext';
import { getWallet } from '../services/walletService';
import { subscribeDb } from '../../../lib/mockDb';
import { useAuth } from '../../auth/hooks/useAuth';
import type { Wallet } from '../types';

/** Mantiene el saldo de UNICOIN sincronizado con cualquier movimiento (compras, pujas, rifas, recargas). */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const userId = user?.id ?? null;
    const [wallet, setWallet] = useState<Wallet>({ balance: 0, transactions: [] });
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(() => {
        if (!userId) return;
        getWallet(userId).then((data) => {
            setWallet(data);
            setLoading(false);
        });
    }, [userId]);

    useEffect(() => {
        if (!userId) return;
        refresh();
        return subscribeDb(refresh);
    }, [userId, refresh]);

    const value = useMemo(
        () => ({ balance: wallet.balance, transactions: wallet.transactions, loading: loading && !!userId, refresh }),
        [wallet, loading, userId, refresh],
    );

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
