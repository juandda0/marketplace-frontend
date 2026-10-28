import type { Visual } from '../../../core/ui/visualIcons';

export interface Raffle {
    id: number;
    title: string;
    prize: string;
    description: string;
    /** Para qué se recauda (viaje, semillero, etc.). */
    cause?: string;
    organizer: string;
    organizerStoreId?: string;
    visual: Visual;
    /** Precio del boleto en UNICOIN. */
    ticketPrice: number;
    totalTickets: number;
    prizeValue: number;
    drawAt: number;
    /** Números vendidos a otros estudiantes (datos de ejemplo). */
    soldNumbers: number[];
}

export interface RaffleView extends Raffle {
    /** Todos los números vendidos (incluye los del usuario). */
    taken: number[];
    myNumbers: number[];
}

export interface RaffleTicket {
    raffleId: number;
    number: number;
    userId: string;
    createdAt: number;
}
