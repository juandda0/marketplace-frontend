import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PiChatCircleDots, PiCheck, PiClock, PiMapPin, PiPlus, PiSealCheckFill, PiStorefront } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { getStoreById, isFollowingStore, toggleFollowStore } from '../services/storeService';
import { getProductsByStore } from '../services/productService';
import { categoryBySlug } from '../../../mocks/catalog';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import { useToast } from '../../../core/toast/useToast';
import ProductGrid from '../components/ProductGrid';
import ProductVisual from '../../../core/ui/ProductVisual';
import { StoreLogo } from '../components/StoreCard';
import Button, { ButtonLink } from '../../../core/ui/Button';
import Badge from '../../../core/ui/Badge';
import EmptyState from '../../../core/ui/EmptyState';
import { ProductGridSkeleton, Skeleton } from '../../../core/ui/Skeleton';
import { UnicoinIcon } from '../../../core/ui/Unicoin';
import { formatCompact, formatNumber } from '../../../core/utils/format';
import type { CategorySlug } from '../types';

const StorePage = () => {
    const { storeId = '' } = useParams<{ storeId: string }>();
    const user = useCurrentUser();
    const toast = useToast();
    const { data: store, loading } = useAsync(() => getStoreById(storeId), [storeId]);
    const { data: products } = useAsync(() => getProductsByStore(storeId), [storeId]);
    const [following, setFollowing] = useState(() => isFollowingStore(user.id, storeId));
    const [filter, setFilter] = useState<CategorySlug | null>(null);

    const visible = useMemo(() => (filter ? products?.filter((p) => p.category === filter) : products), [products, filter]);
    const isOwner = user.storeId === storeId;

    if (loading && !store) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-32 w-full rounded-3xl" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <ProductGridSkeleton count={4} />
            </div>
        );
    }

    if (!store) {
        return (
            <EmptyState
                icon={<PiStorefront aria-hidden />}
                title="Tienda no encontrada"
                description="Es posible que esta tienda ya no esté activa."
                action={<ButtonLink to="/">Volver al inicio</ButtonLink>}
            />
        );
    }

    const follow = async () => {
        const now = await toggleFollowStore(user.id, store.id);
        setFollowing(now);
        toast({ title: now ? `Sigues a ${store.name}` : `Dejaste de seguir a ${store.name}`, tone: now ? 'success' : 'info' });
    };

    const followers = store.followers + (following ? 1 : 0);

    return (
        <div>
            {/* Portada */}
            <div className="relative -mx-4 -mt-4 md:mx-0 md:mt-0">
                <ProductVisual visual={store.visual} variant={2} alt="" className="h-36 w-full md:h-48 md:rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent md:rounded-3xl" />
            </div>

            <div className="relative -mt-12 flex items-end gap-4 px-1">
                <StoreLogo store={store} className="h-20 w-20 rounded-2xl border-4 border-bg shadow-float" />
                <div className="ml-auto flex gap-2 pb-1">
                    {isOwner ? (
                        <Badge tone="primary" className="h-9 px-3 text-[12px]">Tu tienda</Badge>
                    ) : (
                        <Button size="sm" variant={following ? 'secondary' : 'primary'} onClick={follow} icon={following ? <PiCheck aria-hidden /> : <PiPlus aria-hidden />}>
                            {following ? 'Siguiendo' : 'Seguir'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="mt-3 px-1">
                <h1 className="flex items-center gap-1.5 text-[24px] font-bold tracking-tight">
                    {store.name}
                    {store.verified && <PiSealCheckFill className="h-6 w-6 text-primary" aria-label="Tienda verificada" />}
                </h1>
                <p className="mt-0.5 text-[14px] text-muted">{store.tagline}</p>
                <p className="mt-1 text-xs text-subtle">
                    Por {store.ownerName} · {store.ownerProgram}
                </p>

                {/* Métricas */}
                <dl className="card mt-4 grid grid-cols-3 divide-x divide-line/70 py-3 text-center">
                    <div>
                        <dt className="text-[11px] text-subtle">Calificación</dt>
                        <dd className="mt-0.5 text-[17px] font-bold tabular">
                            {store.rating.toLocaleString('es-CO', { minimumFractionDigits: 1 })}
                            <span className="text-coin"> ★</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[11px] text-subtle">Ventas</dt>
                        <dd className="mt-0.5 text-[17px] font-bold tabular">{formatNumber(store.sales)}</dd>
                    </div>
                    <div>
                        <dt className="text-[11px] text-subtle">Seguidores</dt>
                        <dd className="mt-0.5 text-[17px] font-bold tabular">{formatCompact(followers)}</dd>
                    </div>
                </dl>

                <p className="mt-4 text-[14px] leading-relaxed text-muted">{store.description}</p>

                <ul className="mt-4 space-y-2 text-[13px] text-muted">
                    <li className="flex items-center gap-2.5">
                        <PiMapPin className="h-[18px] w-[18px] text-primary" aria-hidden /> {store.location}
                    </li>
                    <li className="flex items-center gap-2.5">
                        <PiClock className="h-[18px] w-[18px] text-primary" aria-hidden /> {store.schedule}
                    </li>
                    <li className="flex items-center gap-2.5">
                        <PiChatCircleDots className="h-[18px] w-[18px] text-primary" aria-hidden /> {store.responseTime}
                    </li>
                    {store.acceptsUnicoin && (
                        <li className="flex items-center gap-2.5">
                            <UnicoinIcon className="h-[18px] w-[18px]" /> Acepta pagos con UNICOIN
                        </li>
                    )}
                </ul>
            </div>

            {/* Productos */}
            <section className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold tracking-tight">Productos</h2>
                    <span className="text-[13px] text-subtle">{products?.length ?? 0} publicados</span>
                </div>
                {store.categories.length > 1 && (
                    <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        <button type="button" onClick={() => setFilter(null)} className={`chip ${!filter ? 'chip-active' : ''}`}>
                            Todo
                        </button>
                        {store.categories.map((slug) => (
                            <button key={slug} type="button" onClick={() => setFilter(slug)} className={`chip ${filter === slug ? 'chip-active' : ''}`}>
                                {categoryBySlug(slug).name}
                            </button>
                        ))}
                    </div>
                )}
                {visible ? <ProductGrid products={visible} /> : <ProductGridSkeleton count={4} />}
            </section>
        </div>
    );
};

export default StorePage;
