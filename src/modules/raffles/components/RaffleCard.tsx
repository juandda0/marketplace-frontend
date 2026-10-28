import { Link } from 'react-router-dom';
import { PiCalendarBlank, PiTicket } from 'react-icons/pi';
import type { RaffleView } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import ProgressBar from '../../../core/ui/ProgressBar';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { formatDateTime } from '../../../core/utils/format';

interface RaffleCardProps {
    raffle: RaffleView;
    layout?: 'rail' | 'full';
}

const RaffleCard = ({ raffle, layout = 'full' }: RaffleCardProps) => {
    const sold = raffle.taken.length;
    const pct = Math.round((sold / raffle.totalTickets) * 100);
    const rail = layout === 'rail';

    return (
        <Link
            to={`/rifas/${raffle.id}`}
            className={`card group block overflow-hidden transition hover:border-line ${rail ? 'w-[260px] shrink-0 md:w-auto' : ''}`}
        >
            <div className="relative">
                <ProductVisual visual={raffle.visual} alt={raffle.prize} className={rail ? 'aspect-[16/9] w-full' : 'aspect-[2/1] w-full'} />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[#0B0F0D]/75 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    <PiTicket className="h-3.5 w-3.5" aria-hidden />
                    <CoinAmount amount={raffle.ticketPrice} /> / boleto
                </span>
                {raffle.myNumbers.length > 0 && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-raffle px-2 py-1 text-[11px] font-bold text-white [[data-theme=dark]_&]:text-[#140b33]">
                        Tienes {raffle.myNumbers.length}
                    </span>
                )}
            </div>
            <div className="p-3.5">
                <h3 className="line-clamp-1 text-[15px] font-semibold text-fg">{raffle.title}</h3>
                <p className="mt-0.5 truncate text-xs text-subtle">Organiza {raffle.organizer}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-raffle">{pct}% vendido</span>
                    <span className="text-muted tabular">
                        {sold}/{raffle.totalTickets}
                    </span>
                </div>
                <ProgressBar value={sold} max={raffle.totalTickets} tone="raffle" className="mt-1.5" />
                {!rail && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                        <PiCalendarBlank className="h-4 w-4" aria-hidden />
                        Sorteo: <span className="font-medium text-fg">{formatDateTime(raffle.drawAt)}</span>
                    </p>
                )}
            </div>
        </Link>
    );
};

export default RaffleCard;
