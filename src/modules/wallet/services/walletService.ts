import { delay, MockApiError, readDb, uid, updateDb } from '../../../lib/mockDb';
import { demoTransactions, DEMO_USER_ID } from '../../../mocks/users';
import { COP_PER_UNICOIN } from '../../../lib/config';
import { formatCOP } from '../../../core/utils/format';
import type { RechargeMethod, TransactionType, Wallet, WalletTransaction } from '../types';

export const rechargeMethodLabels: Record<RechargeMethod, string> = {
    nequi: 'Nequi',
    daviplata: 'Daviplata',
    pse: 'PSE',
    efectivo: 'Efectivo en punto Unimarket',
};

/** Paquetes de recarga sugeridos (UNICOIN). Desde 1.000 UC se regala un 5 % extra. */
export const rechargePackages = [100, 250, 500, 1000, 2000, 5000];
export const RECHARGE_BONUS_FROM = 1000;
export const rechargeBonus = (amount: number) => (amount >= RECHARGE_BONUS_FROM ? Math.round(amount * 0.05) : 0);

const localTransactions = (userId: string) => readDb().transactions.filter((t) => t.userId === userId);

/** Saldo actual: saldo inicial de la cuenta + movimientos hechos en este navegador. */
export const getBalanceSync = (userId: string): number => {
    const user = readDb().users.find((u) => u.id === userId);
    const base = user?.initialBalance ?? 0;
    return base + localTransactions(userId).reduce((sum, t) => sum + t.amount, 0);
};

export const getWallet = (userId: string): Promise<Wallet> => {
    const history = userId === DEMO_USER_ID ? demoTransactions : [];
    const transactions = [...localTransactions(userId), ...history].sort((a, b) => b.createdAt - a.createdAt);
    return delay({ balance: getBalanceSync(userId), transactions }, 260);
};

interface MovementInput {
    type: TransactionType;
    title: string;
    subtitle?: string;
    amount: number;
}

/** Registra un movimiento. Los montos negativos validan saldo suficiente. */
export const addMovement = (userId: string, movement: MovementInput): WalletTransaction => {
    if (movement.amount < 0 && getBalanceSync(userId) + movement.amount < 0) {
        throw new MockApiError('No tienes suficientes UNICOIN. Recarga tu billetera para continuar.');
    }
    const tx: WalletTransaction = { id: uid('tx'), userId, createdAt: Date.now(), ...movement };
    updateDb((db) => ({ ...db, transactions: [tx, ...db.transactions] }));
    return tx;
};

export const recharge = async (
    userId: string,
    amount: number,
    method: RechargeMethod,
): Promise<{ transaction: WalletTransaction; bonus: number; balance: number }> => {
    if (!Number.isFinite(amount) || amount < 50) throw new MockApiError('La recarga mínima es de 50 UNICOIN.');
    if (amount > 20000) throw new MockApiError('La recarga máxima por transacción es de 20.000 UNICOIN.');
    await delay(null, 1100);
    const transaction = addMovement(userId, {
        type: 'recharge',
        title: `Recarga con ${rechargeMethodLabels[method]}`,
        subtitle: `${formatCOP(amount * COP_PER_UNICOIN)} COP`,
        amount,
    });
    const bonus = rechargeBonus(amount);
    if (bonus > 0) {
        addMovement(userId, { type: 'reward', title: 'Bono de recarga', subtitle: '5 % extra por recargar 1.000 UC o más', amount: bonus });
    }
    return { transaction, bonus, balance: getBalanceSync(userId) };
};
