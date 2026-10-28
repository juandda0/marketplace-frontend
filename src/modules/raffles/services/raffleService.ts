import type { Raffle, RaffleTicket, RaffleView } from '../types';
import { demoRaffleTickets, raffles } from '../../../mocks/raffles';
import { DEMO_USER_ID } from '../../../mocks/users';
import { delay, MockApiError, readDb, updateDb } from '../../../lib/mockDb';
import { addMovement } from '../../wallet/services/walletService';
import { padTicket } from '../../../core/utils/format';

const seededTicketsFor = (raffleId: number, userId?: string): number[] =>
    userId === DEMO_USER_ID ? (demoRaffleTickets.find((t) => t.raffleId === raffleId)?.numbers ?? []) : [];

const toView = (raffle: Raffle, userId?: string): RaffleView => {
    const local = readDb().tickets.filter((t) => t.raffleId === raffle.id);
    const myNumbers = [
        ...seededTicketsFor(raffle.id, userId),
        ...local.filter((t) => t.userId === userId).map((t) => t.number),
    ].sort((a, b) => a - b);
    const taken = new Set<number>([...raffle.soldNumbers, ...local.map((t) => t.number), ...seededTicketsFor(raffle.id, DEMO_USER_ID)]);
    return { ...raffle, taken: [...taken].sort((a, b) => a - b), myNumbers };
};

export const getRaffles = (userId?: string): Promise<RaffleView[]> =>
    delay(raffles.map((r) => toView(r, userId)).sort((a, b) => a.drawAt - b.drawAt));

export const getRaffleById = (id: number, userId?: string): Promise<RaffleView | undefined> => {
    const found = raffles.find((r) => r.id === id);
    return delay(found ? toView(found, userId) : undefined);
};

export const buyTickets = async (raffleId: number, numbers: number[], userId: string): Promise<RaffleView> => {
    await delay(null, 700);
    const base = raffles.find((r) => r.id === raffleId);
    if (!base) throw new MockApiError('La rifa no existe.');
    if (!numbers.length) throw new MockApiError('Elige al menos un número.');
    if (base.drawAt <= Date.now()) throw new MockApiError('Esta rifa ya se sorteó.');
    const view = toView(base, userId);
    const conflict = numbers.find((n) => view.taken.includes(n));
    if (conflict !== undefined) {
        throw new MockApiError(`El número ${padTicket(conflict, base.totalTickets)} acaba de ser comprado. Elige otro.`);
    }
    addMovement(userId, {
        type: 'raffle',
        title: 'Boletos de rifa',
        subtitle: `${base.title} · ${numbers.length} ${numbers.length === 1 ? 'boleto' : 'boletos'}`,
        amount: -numbers.length * base.ticketPrice,
    });
    const createdAt = Date.now();
    const tickets: RaffleTicket[] = numbers.map((number) => ({ raffleId, number, userId, createdAt }));
    updateDb((db) => ({ ...db, tickets: [...db.tickets, ...tickets] }));
    return toView(base, userId);
};

export const getUserTickets = (userId: string): Promise<RaffleView[]> =>
    delay(raffles.map((r) => toView(r, userId)).filter((r) => r.myNumbers.length > 0));
