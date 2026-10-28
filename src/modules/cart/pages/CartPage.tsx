import { Link } from 'react-router-dom';
import { PiStorefront, PiTrash } from 'react-icons/pi';
import { useCart } from '../context/useCart';
import ProductVisual from '../../../core/ui/ProductVisual';
import QuantityStepper from '../../../core/ui/QuantityStepper';
import { ButtonLink } from '../../../core/ui/Button';
import EmptyState from '../../../core/ui/EmptyState';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { copToUnicoin, formatCOP, pluralize } from '../../../core/utils/format';
import type { CartItem } from '../types';
import Emoji from '../../../core/ui/Emoji';

const CartPage = () => {
    const { items, count, subtotal, updateQuantity, removeItem } = useCart();

    if (!items.length) {
        return (
            <EmptyState
                className="pt-20"
                icon={<Emoji name="shopping-cart" />}
                title="Tu carrito está vacío"
                description="Explora lo que venden los emprendedores de la U y agrega tus favoritos."
                action={<ButtonLink to="/catalogo">Explorar productos</ButtonLink>}
            />
        );
    }

    const byStore = items.reduce<Record<string, CartItem[]>>((groups, item) => {
        (groups[item.storeId] ??= []).push(item);
        return groups;
    }, {});

    return (
        <div className="md:grid md:grid-cols-[1fr_340px] md:items-start md:gap-8">
            <div>
                <h1 className="mb-1 hidden text-3xl font-bold tracking-tight md:block">Tu carrito</h1>
                <p className="mb-4 text-[13px] text-muted">{pluralize(count, 'producto')} de {pluralize(Object.keys(byStore).length, 'tienda')}</p>

                <div className="space-y-4">
                    {Object.entries(byStore).map(([storeId, storeItems]) => (
                        <section key={storeId} className="card overflow-hidden">
                            <Link
                                to={`/tiendas/${storeId}`}
                                className="flex items-center gap-2 border-b border-line px-4 py-3 text-[13px] font-semibold hover:text-primary-ink"
                            >
                                <PiStorefront className="h-4 w-4 text-primary-ink" aria-hidden />
                                {storeItems[0].storeName}
                            </Link>
                            <ul className="divide-y divide-line">
                                {storeItems.map((item) => (
                                    <li key={item.productId} className="flex gap-3 p-3.5">
                                        <Link to={`/productos/${item.productId}`} className="shrink-0">
                                            <ProductVisual
                                                visual={item.visual}
                                                imageUrl={item.imageUrl}
                                                imageFit={item.imageFit}
                                                alt={item.name}
                                                className="h-20 w-20 rounded-xl"
                                            />
                                        </Link>
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex items-start gap-2">
                                                <Link to={`/productos/${item.productId}`} className="line-clamp-2 flex-1 text-[14px] font-medium leading-snug">
                                                    {item.name}
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.productId)}
                                                    className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-subtle transition hover:bg-danger-soft hover:text-danger-ink"
                                                    aria-label={`Quitar ${item.name}`}
                                                >
                                                    <PiTrash className="h-4 w-4" aria-hidden />
                                                </button>
                                            </div>
                                            <div className="mt-auto flex items-end justify-between pt-2">
                                                <span className="text-[15px] font-bold tabular">{formatCOP(item.price * item.quantity)}</span>
                                                <QuantityStepper
                                                    size="sm"
                                                    value={item.quantity}
                                                    min={1}
                                                    max={Math.min(item.stock, 10)}
                                                    onChange={(q) => updateQuantity(item.productId, q)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>

            <aside className="mt-6 md:sticky md:top-24 md:mt-12">
                <div className="card divide-y divide-line text-[14px]">
                    <div className="flex justify-between p-4">
                        <span className="text-muted">Subtotal</span>
                        <span className="font-semibold tabular">{formatCOP(subtotal)}</span>
                    </div>
                    <div className="flex justify-between p-4">
                        <span className="text-muted">Entrega</span>
                        <span className="text-muted">Se calcula al finalizar</span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <span className="text-muted">Con UNICOIN</span>
                        <CoinAmount amount={copToUnicoin(subtotal)} suffix className="font-semibold text-coin-ink" />
                    </div>
                </div>
                <StickyActionBar>
                    <div className="min-w-0 flex-1 md:hidden">
                        <p className="text-xs text-subtle">Subtotal</p>
                        <p className="text-lg font-bold tabular">{formatCOP(subtotal)}</p>
                    </div>
                    <ButtonLink to="/checkout" size="lg" className="md:w-full">
                        Continuar compra
                    </ButtonLink>
                </StickyActionBar>
            </aside>
        </div>
    );
};

export default CartPage;
