import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    PiCaretRight,
    PiClock,
    PiMapPin,
    PiPackage,
    PiSealCheckFill,
    PiShieldCheck,
    PiShoppingBagOpen,
    PiStorefront,
} from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { getProductById, getRelatedProducts } from '../services/productService';
import { getStoreById } from '../services/storeService';
import { categoryBySlug } from '../../../mocks/catalog';
import { useCart } from '../../cart/context/useCart';
import { useToast } from '../../../core/toast/useToast';
import ImageGallery from '../components/ImageGallery';
import ProductCard from '../components/ProductCard';
import { StoreLogo } from '../components/StoreCard';
import Avatar from '../../../core/ui/Avatar';
import Badge from '../../../core/ui/Badge';
import Button, { ButtonLink } from '../../../core/ui/Button';
import EmptyState from '../../../core/ui/EmptyState';
import QuantityStepper from '../../../core/ui/QuantityStepper';
import SectionHeader from '../../../core/ui/SectionHeader';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { Rating, Stars } from '../../../core/ui/Rating';
import { DetailSkeleton } from '../../../core/ui/Skeleton';
import { copToUnicoin, formatCOP, formatCompact } from '../../../core/utils/format';
import { CAMPUS_DELIVERY_FEE } from '../../../lib/config';
import Emoji from '../../../core/ui/Emoji';

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const id = Number(productId);
    const navigate = useNavigate();
    const { addItem } = useCart();
    const toast = useToast();
    const [quantity, setQuantity] = useState(1);

    const { data: product, loading } = useAsync(() => getProductById(id), [id]);
    const { data: store } = useAsync(
        () => (product ? getStoreById(product.storeId) : Promise.resolve(undefined)),
        [product?.storeId],
    );
    const { data: related } = useAsync(
        () => (product ? getRelatedProducts(product) : Promise.resolve([])),
        [product?.id],
    );

    if (loading && !product) return <DetailSkeleton />;

    if (!product) {
        return (
            <EmptyState
                icon={<Emoji name="package" />}
                title="Producto no encontrado"
                description="Puede que el vendedor lo haya retirado del catálogo."
                action={<ButtonLink to="/catalogo">Ver catálogo</ButtonLink>}
            />
        );
    }

    const category = categoryBySlug(product.category);
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const maxQty = Math.min(product.stock, 10);

    const add = () => {
        addItem(product, quantity);
        toast({ title: 'Agregado al carrito', description: `${quantity} × ${product.name}` });
    };

    const buyNow = () => {
        addItem(product, quantity);
        navigate('/checkout');
    };

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <ImageGallery
                    images={product.images ?? []}
                    visual={product.visual}
                    imageFit={product.imageFit}
                    productName={product.name}
                />

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link to={`/catalogo?categoria=${category.slug}`}>
                            <Badge tone="primary">{category.name}</Badge>
                        </Link>
                        {product.condition && <Badge>{product.condition}</Badge>}
                        {product.stock <= 3 && <Badge tone="auction">¡Últimas {product.stock}!</Badge>}
                    </div>
                    <h1 className="mt-2.5 text-balance text-[22px] font-bold leading-tight tracking-tight md:text-3xl">{product.name}</h1>
                    <div className="mt-2 flex items-center gap-3 text-[13px] text-muted">
                        <Rating value={product.rating} count={product.reviewCount} />
                        <span aria-hidden>·</span>
                        <span>{formatCompact(product.reviewCount * 4 + 12)} vendidos</span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                        <span className="text-[32px] font-bold leading-none tracking-tight tabular">{formatCOP(product.price)}</span>
                        {product.originalPrice && (
                            <>
                                <span className="text-base text-subtle line-through tabular">{formatCOP(product.originalPrice)}</span>
                                <span className="text-sm font-semibold text-primary-ink">−{discount}%</span>
                            </>
                        )}
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
                        o paga con
                        <CoinAmount amount={copToUnicoin(product.price)} suffix className="font-semibold text-coin-ink" />
                        {product.unit && <span className="text-subtle">· por {product.unit}</span>}
                    </p>

                    {/* Entrega */}
                    <div className="card mt-5 divide-y divide-line">
                        <div className="flex items-start gap-3 p-3.5">
                            <PiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink" aria-hidden />
                            <div className="text-[13px]">
                                <p className="font-medium text-fg">Recoge gratis en el punto del vendedor</p>
                                <p className="text-muted">{store?.location ?? 'Campus Central, Montería'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3.5">
                            <PiPackage className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
                            <div className="text-[13px]">
                                <p className="font-medium text-fg">Entrega en el campus por {formatCOP(CAMPUS_DELIVERY_FEE)}</p>
                                <p className="text-muted">Biblioteca, cafetería central o tu facultad</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3.5">
                            <PiClock className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
                            <div className="text-[13px]">
                                <p className="font-medium text-fg">{product.readyIn}</p>
                                <p className="text-muted">
                                    {product.stock > 50 ? 'Disponible' : `${product.stock} disponibles`}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 hidden items-center gap-3 md:flex">
                        <QuantityStepper value={quantity} max={maxQty} onChange={setQuantity} />
                        <Button size="lg" variant="secondary" onClick={add} icon={<PiShoppingBagOpen className="h-5 w-5" />} className="flex-1">
                            Agregar
                        </Button>
                        <Button size="lg" onClick={buyNow} className="flex-1">
                            Comprar ahora
                        </Button>
                    </div>

                    {/* Descripción */}
                    <section className="mt-6">
                        <h2 className="text-[15px] font-semibold">Descripción</h2>
                        <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-muted">{product.description}</p>
                    </section>

                    {/* Tienda */}
                    {store && (
                        <Link to={`/tiendas/${store.id}`} className="card mt-6 flex items-center gap-3 p-3.5 transition-colors hover:border-primary-line">
                            <StoreLogo store={store} />
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-1 text-[14px] font-semibold">
                                    <span className="truncate">{store.name}</span>
                                    {store.verified && <PiSealCheckFill className="h-4 w-4 shrink-0 text-primary-ink" aria-label="Verificada" />}
                                </p>
                                <p className="truncate text-xs text-subtle">{store.ownerName} · {store.responseTime}</p>
                                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                                    <Rating value={store.rating} />
                                    <span aria-hidden>·</span>
                                    <span>{formatCompact(store.sales)} ventas</span>
                                </div>
                            </div>
                            <PiCaretRight className="h-5 w-5 shrink-0 text-subtle" aria-hidden />
                        </Link>
                    )}

                    <p className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
                        <PiShieldCheck className="h-4 w-4 text-primary-ink" aria-hidden />
                        Compra protegida: si no recibes tu pedido, te devolvemos el dinero.
                    </p>
                </div>
            </div>

            {/* Opiniones */}
            <section className="mt-10">
                <SectionHeader title="Opiniones" subtitle={`${product.reviewCount} calificaciones verificadas`} />
                <div className="card mb-3 flex items-center gap-4 p-4">
                    <span className="text-4xl font-bold tracking-tight tabular">
                        {product.rating.toLocaleString('es-CO', { minimumFractionDigits: 1 })}
                    </span>
                    <div>
                        <Stars value={product.rating} />
                        <p className="mt-1 text-xs text-muted">Promedio de {product.reviewCount} compradores</p>
                    </div>
                </div>
                <ul className="space-y-3">
                    {product.reviews.map((review) => (
                        <li key={review.id} className="card p-4">
                            <div className="flex items-center gap-3">
                                <Avatar name={review.author} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-semibold">{review.author}</p>
                                    <p className="text-xs text-subtle">{review.date}</p>
                                </div>
                                <Stars value={review.rating} />
                            </div>
                            <p className="mt-3 text-[14px] leading-relaxed text-muted">{review.comment}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Relacionados */}
            {related && related.length > 0 && (
                <section className="mt-10">
                    <SectionHeader
                        title={`Más de ${product.storeName}`}
                        to={`/tiendas/${product.storeId}`}
                        linkLabel="Ver tienda"
                        icon={<PiStorefront className="h-5 w-5 text-primary-ink" aria-hidden />}
                    />
                    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-4">
                            {related.slice(0, 4).map((p) => (
                                <ProductCard key={p.id} product={p} className="w-[44vw] max-w-[180px] shrink-0 md:w-auto md:max-w-none" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Barra de compra móvil */}
            <div className="md:hidden">
                <StickyActionBar>
                    <QuantityStepper value={quantity} max={maxQty} onChange={setQuantity} />
                    <Button variant="secondary" size="lg" onClick={add} aria-label="Agregar al carrito" className="w-[52px] shrink-0 !px-0">
                        <PiShoppingBagOpen className="h-5 w-5" aria-hidden />
                    </Button>
                    <Button size="lg" onClick={buyNow} className="flex-1">
                        Comprar
                    </Button>
                </StickyActionBar>
            </div>
        </div>
    );
};

export default ProductDetailPage;
