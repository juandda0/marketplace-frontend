import { useId } from 'react';

export const LogoMark = ({ className = 'h-8 w-8' }: { className?: string }) => {
    const id = useId();
    return (
        <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden>
            <defs>
                <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5BE3A1" />
                    <stop offset="1" stopColor="#109E62" />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill={`url(#${id}-g)`} />
            <path d="M10.5 9.5v7a5.5 5.5 0 0 0 11 0v-7" fill="none" stroke="#03160D" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="25" cy="7" r="3.6" fill="#F6BC42" stroke="#03160D" strokeWidth="1.6" />
        </svg>
    );
};

const Logo = ({ className = '', compact = false }: { className?: string; compact?: boolean }) => (
    <span className={`inline-flex items-center gap-2 ${className}`}>
        <LogoMark />
        {!compact && (
            <span className="text-[19px] font-bold tracking-tight text-fg">
                uni<span className="text-primary">market</span>
            </span>
        )}
    </span>
);

export default Logo;
