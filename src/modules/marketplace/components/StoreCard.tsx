import { Link } from 'react-router-dom';
import { PiSealCheckFill } from 'react-icons/pi';
import type { Store } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import { Rating } from '../../../core/ui/Rating';
import { formatCompact } from '../../../core/utils/format';

export const StoreLogo = ({ store, className = 'h-12 w-12 rounded-xl' }: { store: Store; className?: string }) => (
    <ProductVisual visual={store.visual} alt={`Logo de ${store.name}`} iconScale="lg" className={`shrink-0 ${className}`} />
);

const StoreCard = ({ store }: { store: Store }) => (
    <Link
        to={`/tiendas/${store.id}`}
        className="card flex w-[248px] shrink-0 flex-col gap-3 p-3.5 transition hover:border-line md:w-auto"
    >
        <div className="flex items-center gap-3">
            <StoreLogo store={store} />
            <div className="min-w-0">
                <p className="flex items-center gap-1 truncate text-[14px] font-semibold text-fg">
                    <span className="truncate">{store.name}</span>
                    {store.verified && <PiSealCheckFill className="h-4 w-4 shrink-0 text-primary" aria-label="Tienda verificada" />}
                </p>
                <p className="truncate text-xs text-subtle">{store.tagline}</p>
            </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
            <Rating value={store.rating} count={store.reviewCount} />
            <span>{formatCompact(store.sales)} ventas</span>
        </div>
    </Link>
);

export default StoreCard;
