import { useId } from 'react';
import { formatNumber } from '../utils/format';

/** Ícono de la moneda UNICOIN. */
export const UnicoinIcon = ({ className = 'h-4 w-4' }: { className?: string }) => {
    const id = useId();
    return (
        <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} role="img" aria-label="UNICOIN">
            <defs>
                <linearGradient id={`${id}-g`} x1="0.15" y1="0" x2="0.85" y2="1">
                    <stop offset="0" stopColor="#FFE08A" />
                    <stop offset="0.55" stopColor="#F6BC42" />
                    <stop offset="1" stopColor="#D98E12" />
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="11" fill={`url(#${id}-g)`} />
            <circle cx="12" cy="12" r="8.6" fill="none" stroke="#8A5300" strokeOpacity="0.35" strokeWidth="1" />
            <path d="M8.7 7.4v5.1a3.3 3.3 0 0 0 6.6 0V7.4" fill="none" stroke="#5C3700" strokeWidth="2.1" strokeLinecap="round" />
            <path d="M7.4 10.4h9.2" stroke="#5C3700" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M6.2 8.2a6.8 6.8 0 0 1 4-3.6" stroke="#FFF6D6" strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
    );
};

interface CoinAmountProps {
    amount: number;
    className?: string;
    iconClassName?: string;
    /** Muestra "UC" después del número. */
    suffix?: boolean;
    signed?: boolean;
}

/** Monto en UNICOIN con su ícono: ● 1.250 */
export const CoinAmount = ({ amount, className = '', iconClassName = 'h-[1.05em] w-[1.05em]', suffix, signed }: CoinAmountProps) => (
    <span className={`inline-flex items-center gap-1 tabular ${className}`}>
        <UnicoinIcon className={iconClassName} />
        <span>
            {signed && amount > 0 ? '+' : ''}
            {signed && amount < 0 ? '−' : ''}
            {formatNumber(Math.abs(amount))}
            {suffix && <span className="ml-0.5 text-[0.8em] font-medium opacity-70">UC</span>}
        </span>
    </span>
);
