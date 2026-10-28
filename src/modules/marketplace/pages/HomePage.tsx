import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiArrowRight, PiFireFill, PiMagnifyingGlass, PiSparkleFill, PiStorefront, PiTicketFill } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { useAuth } from '../../auth/hooks/useAuth';
import { useWallet } from '../../wallet/context/useWallet';
import { getCategories, getFeaturedProducts } from '../services/productService';
import { getStores } from '../services/storeService';
import { getAuctions } from '../../auctions/services/auctionService';
import { getRaffles } from '../../raffles/services/raffleService';
import HeroSection from '../components/HeroSection';
import CategoryRail from '../components/CategoryRail';
import ProductGrid from '../components/ProductGrid';
import StoreCard from '../components/StoreCard';
import AuctionCard, { LiveDot } from '../../auctions/components/AuctionCard';
import RaffleCard from '../../raffles/components/RaffleCard';
import SectionHeader from '../../../core/ui/SectionHeader';
import { ProductGridSkeleton, Skeleton } from '../../../core/ui/Skeleton';
import { UnicoinIcon } from '../../../core/ui/Unicoin';
import { formatCOP, formatNumber, unicoinToCop } from '../../../core/utils/format';

const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
};

const RailSkeleton = ({ width = 'w-[232px]', height = 'h-[190px]' }: { width?: string; height?: string }) => (
    <div className="flex gap-3 overflow-hidden">
        {[0, 1, 2].map((i) => (
            <Skeleton key={i} className={`${width} ${height} shrink-0 rounded-2xl`} />
        ))}
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { balance } = useWallet();
    const [query, setQuery] = useState('');

    const categories = useAsync(getCategories, []);
    const featured = useAsync(getFeaturedProducts, []);
    const auctions = useAsync(getAuctions, []);
    const raffles = useAsync(() => getRaffles(user?.id), [user?.id]);
    const stores = useAsync(getStores, []);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/catalogo${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
    };

    const liveAuctions = auctions.data?.filter((a) => a.status !== 'ended') ?? [];

    return (
        <div className="space-y-8 md:space-y-12">
            {/* Saludo + búsqueda */}
            <section>
                <p className="text-[13px] text-muted">
                    {greeting()}, <span className="font-medium text-fg">{user?.name}</span>
                </p>
                <h1 className="mt-0.5 text-[26px] font-bold leading-tight tracking-tight md:text-4xl">¿Qué necesitas hoy?</h1>
                <form onSubmit={submit} role="search" className="relative mt-4">
                    <PiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" aria-hidden />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Arepas, apuntes de cálculo, audífonos…"
                        aria-label="Buscar productos"
                        className="input h-[52px] rounded-2xl pl-12 text-[15px]"
                    />
                </form>
            </section>

            <HeroSection />

            {/* Categorías */}
            <section>
                <SectionHeader title="Categorías" to="/catalogo" />
                {categories.data ? <CategoryRail categories={categories.data} /> : <RailSkeleton width="w-16" height="h-20" />}
            </section>

            {/* Subastas */}
            <section>
                <SectionHeader
                    title="Subastas en vivo"
                    subtitle="Puja con UNICOIN antes de que se acabe el tiempo"
                    to="/subastas"
                    icon={<LiveDot />}
                />
                {auctions.loading ? (
                    <RailSkeleton />
                ) : (
                    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-4">
                            {liveAuctions.slice(0, 4).map((auction) => (
                                <AuctionCard key={auction.id} auction={auction} layout="rail" />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Destacados */}
            <section>
                <SectionHeader
                    title="Destacados en el campus"
                    subtitle="Lo más pedido esta semana"
                    to="/catalogo"
                    icon={<PiFireFill className="h-5 w-5 text-auction" aria-hidden />}
                />
                {featured.data ? <ProductGrid products={featured.data.slice(0, 8)} /> : <ProductGridSkeleton count={4} />}
            </section>

            {/* Rifas */}
            <section>
                <SectionHeader
                    title="Rifas activas"
                    subtitle="Apoya causas estudiantiles y gana premios"
                    to="/rifas"
                    icon={<PiTicketFill className="h-5 w-5 text-raffle" aria-hidden />}
                />
                {raffles.loading ? (
                    <RailSkeleton width="w-[260px]" height="h-[230px]" />
                ) : (
                    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-4">
                            {raffles.data?.map((raffle) => (
                                <RaffleCard key={raffle.id} raffle={raffle} layout="rail" />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* UNICOIN */}
            <section>
                <Link
                    to="/billetera"
                    className="relative isolate flex items-center gap-4 overflow-hidden rounded-3xl border border-coin/25 p-5 transition hover:border-coin/40"
                >
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                'radial-gradient(100% 140% at 100% 0%, rgb(var(--coin) / 0.28), transparent 60%), linear-gradient(135deg, rgb(var(--surface-2)), rgb(var(--surface)))',
                        }}
                    />
                    <UnicoinIcon className="h-14 w-14 drop-shadow-[0_10px_20px_rgba(246,188,66,0.35)]" />
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] text-muted">Tu saldo UNICOIN</p>
                        <p className="text-2xl font-bold tracking-tight text-fg tabular">
                            {formatNumber(balance)} <span className="text-sm font-semibold text-coin">UC</span>
                        </p>
                        <p className="text-xs text-subtle">≈ {formatCOP(unicoinToCop(balance))} COP · úsalo en subastas, rifas y tiendas</p>
                    </div>
                    <PiArrowRight className="h-5 w-5 shrink-0 text-coin" aria-hidden />
                </Link>
            </section>

            {/* Tiendas */}
            <section>
                <SectionHeader
                    title="Tiendas de la U"
                    subtitle="Emprendimientos de estudiantes verificados"
                    icon={<PiStorefront className="h-5 w-5 text-primary" aria-hidden />}
                />
                {stores.loading ? (
                    <RailSkeleton width="w-[248px]" height="h-[110px]" />
                ) : (
                    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-4">
                            {stores.data?.map((store) => (
                                <StoreCard key={store.id} store={store} />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-xs text-subtle">
                <PiSparkleFill className="h-3.5 w-3.5 text-primary" aria-hidden />
                Hecho por y para estudiantes de la Universidad de Córdoba
            </p>
        </div>
    );
};

export default HomePage;
