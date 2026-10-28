import type { ReactNode } from 'react';

type Tone = 'neutral' | 'primary' | 'coin' | 'auction' | 'raffle' | 'danger';

const tones: Record<Tone, string> = {
    neutral: 'bg-surface-3 text-muted',
    primary: 'bg-primary-soft text-primary-ink',
    coin: 'bg-coin-soft text-coin-ink',
    auction: 'bg-auction-soft text-auction-ink',
    raffle: 'bg-raffle-soft text-raffle-ink',
    danger: 'bg-danger-soft text-danger-ink',
};

const Badge = ({ tone = 'neutral', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) => (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]} ${className}`}>
        {children}
    </span>
);

export default Badge;
