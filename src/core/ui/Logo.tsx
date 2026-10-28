export const LogoMark = ({ className = 'h-8 w-8' }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden>
        <rect width="32" height="32" rx="9" fill="#2563EB" />
        <path d="M10.5 9.5v7a5.5 5.5 0 0 0 11 0v-7" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="25" cy="7" r="3.6" fill="#F59E0B" stroke="#2563EB" strokeWidth="1.6" />
    </svg>
);

const Logo = ({ className = '', compact = false, inverted = false }: { className?: string; compact?: boolean; inverted?: boolean }) => (
    <span className={`inline-flex items-center gap-2 ${className}`}>
        <LogoMark />
        {!compact && (
            <span className={`text-[19px] font-bold tracking-tight ${inverted ? 'text-white' : 'text-fg'}`}>
                uni<span className={inverted ? 'text-[#BFDBFE]' : 'text-primary-ink'}>market</span>
            </span>
        )}
    </span>
);

export default Logo;
