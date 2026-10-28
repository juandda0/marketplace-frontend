import { Link } from 'react-router-dom';
import { PiClock, PiGavel } from 'react-icons/pi';
import type { AuctionView } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { TimeLeft } from '../../../core/ui/Countdown';
import { useNow } from '../../../core/hooks/useNow';
import { auctionStatus } from '../services/auctionService';

export const LiveDot = () => (
    <span className="relative inline-flex h-2 w-2 rounded-full bg-auction ring-2 ring-auction-line" aria-hidden />
);

export const AuctionTimePill = ({ endsAt, className = '', surface = false }: { endsAt: number; className?: string; surface?: boolean }) => {
    const neutral = surface ? 'bg-surface-3 text-fg' : 'bg-ink text-white';
    const endedTone = surface ? 'bg-surface-3 text-subtle' : 'bg-ink text-[#CBD5E1]';
    const now = useNow(1000);
    const status = auctionStatus(endsAt, now);
    if (status === 'ended') {
        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${endedTone} ${className}`}>
                Finalizada
            </span>
        );
    }
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold ${
                status === 'ending' ? 'bg-auction text-white' : neutral
            } ${className}`}
        >
            <PiClock className="h-3.5 w-3.5" aria-hidden />
            <TimeLeft endsAt={endsAt} />
        </span>
    );
};

interface AuctionCardProps {
    auction: AuctionView;
    layout?: 'rail' | 'row';
}

const AuctionCard = ({ auction, layout = 'row' }: AuctionCardProps) => {
    const ended = auction.status === 'ended';

    if (layout === 'rail') {
        return (
            <Link to={`/subastas/${auction.id}`} className="card group block w-[232px] shrink-0 overflow-hidden md:w-auto">
                <div className="relative">
                    <ProductVisual visual={auction.visual} imageUrl={auction.imageUrl} alt={auction.title} className="aspect-[16/10] w-full" />
                    <AuctionTimePill endsAt={auction.endsAt} className="absolute left-2.5 top-2.5" />
                </div>
                <div className="p-3">
                    <h3 className="line-clamp-1 text-[14px] font-semibold text-fg">{auction.title}</h3>
                    <div className="mt-2 flex items-end justify-between">
                        <div>
                            <p className="text-[11px] text-subtle">{ended ? 'Precio final' : 'Puja actual'}</p>
                            <CoinAmount amount={auction.currentBid} className="text-[17px] font-bold text-coin-ink" />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted">
                            <PiGavel className="h-3.5 w-3.5" aria-hidden />
                            {auction.bids.length}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            to={`/subastas/${auction.id}`}
            className={`card flex gap-3 p-2.5 transition-colors hover:border-primary-line ${ended ? 'bg-surface-2' : ''}`}
        >
            <ProductVisual visual={auction.visual} imageUrl={auction.imageUrl} alt={auction.title} className="h-[104px] w-[104px] shrink-0 rounded-xl" />
            <div className="flex min-w-0 flex-1 flex-col py-0.5">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-fg">{auction.title}</h3>
                </div>
                <p className="mt-0.5 truncate text-xs text-subtle">
                    {auction.storeName} · {auction.condition}
                </p>
                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                    <div>
                        <p className="text-[11px] text-subtle">{ended ? 'Precio final' : `${auction.bids.length} pujas`}</p>
                        <CoinAmount amount={auction.currentBid} className="text-base font-bold text-coin-ink" />
                    </div>
                    <AuctionTimePill endsAt={auction.endsAt} surface />
                </div>
            </div>
        </Link>
    );
};

export default AuctionCard;
