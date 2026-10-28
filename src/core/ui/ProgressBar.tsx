interface ProgressBarProps {
    value: number;
    max: number;
    tone?: 'primary' | 'raffle' | 'coin' | 'auction';
    className?: string;
}

const tones = {
    primary: 'from-primary/70 to-primary',
    raffle: 'from-raffle/70 to-raffle',
    coin: 'from-coin/70 to-coin',
    auction: 'from-auction/70 to-auction',
};

const ProgressBar = ({ value, max, tone = 'primary', className = '' }: ProgressBarProps) => {
    const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
    return (
        <div
            className={`h-2 overflow-hidden rounded-full bg-surface-3 ${className}`}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
        >
            <div className={`h-full rounded-full bg-gradient-to-r ${tones[tone]} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
        </div>
    );
};

export default ProgressBar;
