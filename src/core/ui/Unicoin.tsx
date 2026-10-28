import { formatNumber } from '../utils/format';

/** Ícono de la moneda UNICOIN (colores sólidos). */
export const UnicoinIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} role="img" aria-label="UNICOIN">
        <circle cx="12" cy="12" r="11" fill="#D97706" />
        <circle cx="12" cy="11.2" r="10.2" fill="#F59E0B" />
        <circle cx="12" cy="11.2" r="7.6" fill="none" stroke="#B45309" strokeWidth="1.1" />
        <path d="M8.9 6.8v4.9a3.1 3.1 0 0 0 6.2 0V6.8" fill="none" stroke="#78350F" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M7.7 9.7h8.6" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

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
            {suffix && <span className="ml-0.5 text-[0.75em] font-semibold">UC</span>}
        </span>
    </span>
);
