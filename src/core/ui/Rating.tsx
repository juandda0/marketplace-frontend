import { PiStarFill } from 'react-icons/pi';
import { formatNumber } from '../utils/format';

interface RatingProps {
    value: number;
    count?: number;
    className?: string;
}

/** ★ 4,8 (128) */
export const Rating = ({ value, count, className = '' }: RatingProps) => (
    <span className={`inline-flex items-center gap-1 text-[13px] ${className}`}>
        <PiStarFill className="h-3.5 w-3.5 text-coin" aria-hidden />
        <span className="font-semibold text-fg">{value.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
        {count !== undefined && <span className="text-subtle">({formatNumber(count)})</span>}
    </span>
);

export const Stars = ({ value, className = '' }: { value: number; className?: string }) => (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} de 5 estrellas`}>
        {[1, 2, 3, 4, 5].map((i) => (
            <PiStarFill key={i} className={`h-3.5 w-3.5 ${i <= Math.round(value) ? 'text-coin' : 'text-surface-3'}`} aria-hidden />
        ))}
    </span>
);
