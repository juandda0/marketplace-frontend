import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiGavel, PiHandCoins, PiShieldCheck, PiTimer } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { getAuctions } from '../services/auctionService';
import AuctionCard, { AuctionTimePill, LiveDot } from '../components/AuctionCard';
import ProductVisual from '../../../core/ui/ProductVisual';
import { CoinAmount } from '../../../core/ui/Unicoin';
import EmptyState from '../../../core/ui/EmptyState';
import { ListSkeleton, Skeleton } from '../../../core/ui/Skeleton';

type Filter = 'live' | 'today' | 'ended';

const filters: { value: Filter; label: string }[] = [
    { value: 'live', label: 'En vivo' },
    { value: 'today', label: 'Terminan hoy' },
    { value: 'ended', label: 'Finalizadas' },
];

const DAY = 24 * 3_600_000;

const AuctionsPage = () => {
    const { data: auctions, loading } = useAsync(getAuctions, []);
    const [filter, setFilter] = useState<Filter>('live');

    const live = auctions?.filter((a) => a.status !== 'ended') ?? [];
    const featured = live[0];
    const list =
        auctions?.filter((a) => {
            if (filter === 'ended') return a.status === 'ended';
            if (filter === 'today') return a.status !== 'ended' && a.endsAt - Date.now() < DAY;
            return a.status !== 'ended';
        }) ?? [];

    return (
        <div>
            <div className="mb-5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-auction">
                    <LiveDot /> {live.length} subastas activas
                </p>
                <h1 className="mt-1 text-[26px] font-bold tracking-tight md:text-3xl">Subastas</h1>
                <p className="mt-0.5 text-[13px] text-muted">Puja con UNICOIN. Solo pagas si ganas cuando termina el tiempo.</p>
            </div>

            {/* Destacada */}
            {loading && !auctions ? (
                <Skeleton className="mb-6 h-[260px] w-full rounded-3xl" />
            ) : (
                featured && (
                    <Link
                        to={`/subastas/${featured.id}`}
                        className="group relative mb-6 block overflow-hidden rounded-3xl border border-auction/25"
                    >
                        <ProductVisual visual={featured.visual} variant={1} iconScale="sm" iconPosition="top" alt={featured.title} className="aspect-[4/3] w-full md:aspect-[21/8]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <AuctionTimePill endsAt={featured.endsAt} className="absolute left-3 top-3" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">Termina pronto</p>
                            <h2 className="mt-1 text-xl font-bold leading-tight">{featured.title}</h2>
                            <div className="mt-3 flex items-end justify-between">
                                <div>
                                    <p className="text-[11px] text-white/65">Puja actual · {featured.bids.length} pujas</p>
                                    <CoinAmount amount={featured.currentBid} suffix className="text-2xl font-bold text-[#FFD66B]" />
                                </div>
                                <span className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#1a0a03] transition group-hover:bg-[#FFE7DF]">
                                    <PiGavel aria-hidden /> Pujar
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            )}

            {/* Cómo funciona */}
            <div className="mb-6 grid grid-cols-3 gap-2 text-center">
                {[
                    { icon: PiHandCoins, text: 'Puja con tu saldo UNICOIN' },
                    { icon: PiTimer, text: 'Gana la oferta más alta al final' },
                    { icon: PiShieldCheck, text: 'Si te superan, no pierdes nada' },
                ].map(({ icon: Icon, text }) => (
                    <div key={text} className="rounded-2xl border border-line/70 bg-surface px-2 py-3">
                        <Icon className="mx-auto h-5 w-5 text-auction" aria-hidden />
                        <p className="mt-1.5 text-[11px] leading-tight text-muted">{text}</p>
                    </div>
                ))}
            </div>

            <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0" role="tablist">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        type="button"
                        role="tab"
                        aria-selected={filter === f.value}
                        onClick={() => setFilter(f.value)}
                        className={`chip ${filter === f.value ? 'chip-active' : ''}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading && !auctions ? (
                <ListSkeleton />
            ) : list.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                    {list.map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
            ) : (
                <EmptyState icon={<PiGavel aria-hidden />} title="Nada por aquí" description="No hay subastas en esta categoría ahora mismo." />
            )}
        </div>
    );
};

export default AuctionsPage;
