import type { User } from '../modules/auth/types';
import type { Bid } from '../modules/auctions/types';
import type { RaffleTicket } from '../modules/raffles/types';
import type { WalletTransaction } from '../modules/wallet/types';
import type { Order } from '../modules/cart/types';
import { demoUser } from '../mocks/users';

/**
 * "Base de datos" local del modo demo.
 *
 * Solo se persisten los datos que genera el usuario (registros, pujas, boletos,
 * movimientos y pedidos). Los catálogos se reconstruyen desde `src/mocks` en cada
 * carga para que las fechas de subastas y rifas siempre estén vigentes.
 */
export interface DbState {
    users: User[];
    transactions: WalletTransaction[];
    bids: Bid[];
    tickets: RaffleTicket[];
    orders: Order[];
    follows: { userId: string; storeId: string }[];
}

const DB_KEY = 'unimarket:db:v1';

const emptyDb = (): DbState => ({
    users: [demoUser],
    transactions: [],
    bids: [],
    tickets: [],
    orders: [],
    follows: [],
});

const load = (): DbState => {
    try {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return emptyDb();
        const parsed = JSON.parse(raw) as Partial<DbState>;
        const base = emptyDb();
        const users = parsed.users?.length ? parsed.users : base.users;
        return {
            ...base,
            ...parsed,
            // La cuenta demo siempre existe aunque se haya borrado el almacenamiento parcial.
            users: users.some((u) => u.id === demoUser.id) ? users : [demoUser, ...users],
        };
    } catch {
        return emptyDb();
    }
};

let state: DbState = load();
const listeners = new Set<() => void>();

export const readDb = (): DbState => state;

export const updateDb = (mutate: (draft: DbState) => DbState): DbState => {
    state = mutate(state);
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(state));
    } catch {
        // Almacenamiento lleno o bloqueado: la sesión sigue funcionando en memoria.
    }
    listeners.forEach((listener) => listener());
    return state;
};

export const subscribeDb = (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

/** Borra todo lo generado en este navegador (pujas, pedidos, recargas, carrito) y recarga la app. */
export const resetDemoData = () => {
    try {
        localStorage.removeItem(DB_KEY);
        localStorage.removeItem('unimarket:cart');
    } catch {
        // ignorado
    }
    window.location.reload();
};

/** Simula la latencia de red de una API real. */
export const delay = <T>(value: T, ms = 320): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(value), ms + Math.round(Math.random() * 180)));

export const uid = (prefix = 'id'): string =>
    `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/** Error de negocio con mensaje listo para mostrar al usuario. */
export class MockApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MockApiError';
    }
}

export const errorMessage = (error: unknown, fallback = 'Algo salió mal. Inténtalo de nuevo.'): string =>
    error instanceof Error && error.message ? error.message : fallback;
