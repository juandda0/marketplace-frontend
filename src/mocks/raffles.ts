import type { Raffle } from '../modules/raffles/types';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const now = Date.now();

/** Genera un conjunto determinista de números vendidos para que la grilla sea estable entre recargas. */
const soldSet = (total: number, count: number, seed: number): number[] => {
    const taken = new Set<number>();
    let x = seed;
    while (taken.size < count) {
        x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
        taken.add((x >>> 8) % total);
    }
    return [...taken].sort((a, b) => a - b);
};

/** Próximo día de la semana a una hora fija (para fechas de sorteo realistas). */
const next = (daysAhead: number, hour: number): number => {
    const d = new Date(now + daysAhead * DAY);
    d.setHours(hour, 0, 0, 0);
    return d.getTime();
};

export const raffles: Raffle[] = [
    {
        id: 1,
        title: 'Combo gamer: teclado + mouse RGB',
        prize: 'Teclado mecánico, mouse gamer y pad XL',
        description:
            'Rifa organizada por el Semillero de Robótica para financiar el viaje a la competencia nacional en Medellín. El sorteo se transmite en vivo por Instagram.',
        cause: 'Viaje del semillero a la competencia nacional de robótica',
        organizer: 'Semillero de Robótica',
        visual: { icon: 'gamepad', from: '#A78BFA', to: '#3B0764' },
        ticketPrice: 20,
        totalTickets: 100,
        prizeValue: 320000,
        drawAt: next(3, 18),
        soldNumbers: soldSet(100, 64, 7),
    },
    {
        id: 2,
        title: 'Bono de $100.000 en El Arepazo',
        prize: 'Bono de consumo de $100.000',
        description:
            'Gana un mes de desayunos y almuerzos rápidos en El Arepazo. El bono se carga a tu cuenta de Unimarket y lo usas cuando quieras.',
        organizer: 'El Arepazo',
        organizerStoreId: 'el-arepazo',
        visual: { icon: 'hamburger', from: '#FB923C', to: '#7C2D12' },
        ticketPrice: 10,
        totalTickets: 100,
        prizeValue: 100000,
        drawAt: next(1, 17),
        soldNumbers: soldSet(100, 81, 21),
    },
    {
        id: 3,
        title: 'Tablet de 11" con lápiz digital',
        prize: 'Tablet 11" 128 GB + lápiz + funda',
        description:
            'Para tomar apuntes, leer PDFs y dibujar. Rifa del Consejo Estudiantil de Ingenierías para la semana cultural.',
        cause: 'Semana cultural de la Facultad de Ingenierías',
        organizer: 'Consejo Estudiantil de Ingenierías',
        visual: { icon: 'tablet', from: '#38BDF8', to: '#0C4A6E' },
        ticketPrice: 50,
        totalTickets: 100,
        prizeValue: 1150000,
        drawAt: next(9, 16),
        soldNumbers: soldSet(100, 37, 99),
    },
    {
        id: 4,
        title: 'Kit fin de semestre',
        prize: 'Termo, cuadernos, resaltadores y snacks',
        description: 'Todo lo que necesitas para sobrevivir a los finales. Organiza La Cucharita junto a Otaku Corner.',
        organizer: 'La Cucharita',
        organizerStoreId: 'la-cucharita',
        visual: { icon: 'backpack', from: '#F472B6', to: '#831843' },
        ticketPrice: 5,
        totalTickets: 50,
        prizeValue: 85000,
        drawAt: next(5, 15),
        soldNumbers: soldSet(50, 19, 3),
    },
];

/** Boletos que la cuenta demo ya compró (coinciden con su historial de UNICOIN). */
export const demoRaffleTickets: { raffleId: number; numbers: number[] }[] = [{ raffleId: 1, numbers: [7, 23] }];
