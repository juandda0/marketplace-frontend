import { useNow } from '../hooks/useNow';
import { formatTimeLeft, timeParts } from '../utils/format';

/** Texto compacto: "2 h 14 min". */
export const TimeLeft = ({ endsAt, className = '' }: { endsAt: number; className?: string }) => {
    const now = useNow(1000);
    return <span className={`tabular ${className}`}>{formatTimeLeft(endsAt - now)}</span>;
};

/** Cuenta regresiva grande en bloques: 02 : 14 : 09. */
export const CountdownBlocks = ({ endsAt, tone = 'auction' }: { endsAt: number; tone?: 'auction' | 'raffle' }) => {
    const now = useNow(1000);
    const { days, hours, minutes, seconds, total } = timeParts(endsAt - now);
    const blocks = [
        ...(days > 0 ? [{ label: 'días', value: days }] : []),
        { label: 'horas', value: hours },
        { label: 'min', value: minutes },
        { label: 'seg', value: seconds },
    ];
    const urgent = total > 0 && total < 3_600_000;
    return (
        <div className="flex items-center gap-1.5" role="timer" aria-live="off">
            {blocks.map((b, i) => (
                <div key={b.label} className="flex items-center gap-1.5">
                    <div
                        className={`flex min-w-[52px] flex-col items-center rounded-xl border px-2 py-1.5 ${
                            urgent
                                ? tone === 'auction'
                                    ? 'border-auction-line bg-auction-soft'
                                    : 'border-raffle-line bg-raffle-soft'
                                : 'border-line bg-surface-2'
                        }`}
                    >
                        <span className={`text-xl font-bold tabular leading-tight ${urgent ? (tone === 'auction' ? 'text-auction-ink' : 'text-raffle-ink') : 'text-fg'}`}>
                            {b.value.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-subtle">{b.label}</span>
                    </div>
                    {i < blocks.length - 1 && <span className="text-lg font-bold text-subtle">:</span>}
                </div>
            ))}
        </div>
    );
};
