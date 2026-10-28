import { COP_PER_UNICOIN } from '../../lib/config';

const copFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat('es-CO');

/** $12.000 */
export const formatCOP = (value: number): string => copFormatter.format(value).replace(/\s/g, '');

/** 12.500 */
export const formatNumber = (value: number): string => numberFormatter.format(value);

/** 1,2 mil */
export const formatCompact = (value: number): string =>
    new Intl.NumberFormat('es-CO', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export const copToUnicoin = (cop: number): number => Math.ceil(cop / COP_PER_UNICOIN);
export const unicoinToCop = (uc: number): number => uc * COP_PER_UNICOIN;

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const formatRelative = (timestamp: number, now = Date.now()): string => {
    const diff = now - timestamp;
    if (diff < MIN) return 'justo ahora';
    if (diff < HOUR) return `hace ${Math.floor(diff / MIN)} min`;
    if (diff < DAY) return `hace ${Math.floor(diff / HOUR)} h`;
    if (diff < 2 * DAY) return 'ayer';
    if (diff < 7 * DAY) return `hace ${Math.floor(diff / DAY)} días`;
    return new Date(timestamp).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
};

/** vie, 31 oct · 6:00 p. m. */
export const formatDateTime = (timestamp: number): string => {
    const d = new Date(timestamp);
    const date = d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
    const time = d.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
    return `${date} · ${time}`;
};

export interface TimeParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

export const timeParts = (ms: number): TimeParts => {
    const total = Math.max(0, ms);
    return {
        days: Math.floor(total / DAY),
        hours: Math.floor((total % DAY) / HOUR),
        minutes: Math.floor((total % HOUR) / MIN),
        seconds: Math.floor((total % MIN) / 1000),
        total,
    };
};

const pad = (n: number) => n.toString().padStart(2, '0');

/** 2 d 05:12:33 · 02:14:09 */
export const formatCountdown = (ms: number): string => {
    const { days, hours, minutes, seconds } = timeParts(ms);
    const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    return days > 0 ? `${days} d ${clock}` : clock;
};

/** 2 h 14 min · 1 d 5 h · 38 min */
export const formatTimeLeft = (ms: number): string => {
    if (ms <= 0) return 'Finalizada';
    const { days, hours, minutes, seconds } = timeParts(ms);
    if (days > 0) return `${days} d ${hours} h`;
    if (hours > 0) return `${hours} h ${minutes} min`;
    if (minutes > 0) return `${minutes} min ${pad(seconds)} s`;
    return `${seconds} s`;
};

export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
    `${formatNumber(count)} ${count === 1 ? singular : plural}`;

export const padTicket = (n: number, total: number): string => n.toString().padStart(total > 100 ? 3 : 2, '0');

export const initials = (name: string): string =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
