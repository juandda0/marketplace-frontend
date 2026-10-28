import type { ReactNode } from 'react';

type Tone = 'neutral' | 'primary' | 'coin' | 'auction' | 'raffle' | 'danger';

const tones: Record<Tone, string> = {
    neutral: 'bg-surface-3 text-muted',
    primary: 'bg-primary/15 text-primary',
    coin: 'bg-coin/15 text-coin',
    auction: 'bg-auction/15 text-auction',
    raffle: 'bg-raffle/15 text-raffle',
    danger: 'bg-danger/15 text-danger',
};

const Badge = ({ tone = 'neutral', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) => (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]} ${className}`}>
        {children}
    </span>
);

export default Badge;
