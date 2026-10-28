import { useContext } from 'react';
import { WalletContext } from './WalletContext';

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error('useWallet debe usarse dentro de <WalletProvider>');
    return context;
};
