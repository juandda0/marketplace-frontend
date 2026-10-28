import { useParams } from 'react-router-dom';
import { PiCheckBold, PiCheckCircleFill, PiMapPin } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { useNow } from '../../../core/hooks/useNow';
import { getOrderById } from '../services/orderService';
import type { Order, OrderStatus } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import { ButtonLink } from '../../../core/ui/Button';
import EmptyState from '../../../core/ui/EmptyState';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { Skeleton } from '../../../core/ui/Skeleton';
import { formatCOP, formatDateTime } from '../../../core/utils/format';
import Emoji from '../../../core/ui/Emoji';

const steps: { status: OrderStatus; label: string; detail: string }[] = [
    { status: 'confirmado', label: 'Pedido confirmado', detail: 'La tienda recibió tu pedido' },
    { status: 'preparando', label: 'En preparación', detail: 'Están alistando tus productos' },
    { status: 'listo', label: 'Listo para entregar', detail: 'Muestra tu código al recoger' },
    { status: 'entregado', label: 'Entregado', detail: '¡Disfrútalo!' },
];

/** En el modo demo el estado avanza solo con el tiempo para simular el seguimiento. */
const liveStatus = (order: Order, now: number): OrderStatus => {
    if (order.status === 'entregado') return 'entregado';
    const elapsed = now - order.createdAt;
    if (elapsed < 20_000) return 'confirmado';
    if (elapsed < 120_000) return 'preparando';
    return 'listo';
};

const paymentLabels: Record<Order['paymentMethod'], string> = {
    unicoin: 'UNICOIN',
    nequi: 'Nequi',
    efectivo: 'Efectivo al recibir',
};

const OrderPage = () => {
    const { orderId = '' } = useParams<{ orderId: string }>();
    const now = useNow(5000);
    const { data: order, loading } = useAsync(() => getOrderById(orderId), [orderId]);

    if (loading && !order) {
        return (
            <div className="mx-auto max-w-xl space-y-4">
                <Skeleton className="mx-auto h-20 w-20 rounded-full" />
                <Skeleton className="mx-auto h-6 w-1/2" />
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
        );
    }
    if (!order) {
        return <EmptyState icon={<Emoji name="receipt" />} title="Pedido no encontrado" action={<ButtonLink to="/perfil">Ver mis pedidos</ButtonLink>} />;
    }

    const status = liveStatus(order, now);
    const currentIndex = steps.findIndex((s) => s.status === status);
    const isNew = now - order.createdAt < 10 * 60_000 && order.status !== 'entregado';

    return (
        <div className="mx-auto max-w-xl">
            <div className="flex flex-col items-center text-center">
                <span className={`flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft ${isNew ? 'animate-pop' : ''}`}>
                    <PiCheckCircleFill className="h-12 w-12 text-primary-ink" aria-hidden />
                </span>
                <h1 className="mt-4 text-2xl font-bold tracking-tight">{isNew ? '¡Pedido confirmado!' : `Pedido ${order.id}`}</h1>
                <p className="mt-1 text-[13px] text-muted">
                    {order.id} · {formatDateTime(order.createdAt)}
                </p>
            </div>

            {/* Código de entrega */}
            {status !== 'entregado' && (
                <section className="mt-6 rounded-3xl border border-dashed border-primary-line bg-primary-soft p-5 text-center">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-ink">Código de entrega</p>
                    <p className="mt-1 font-mono text-[40px] font-bold tracking-[0.3em] text-fg">{order.pickupCode}</p>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-[13px] text-muted">
                        <PiMapPin className="h-4 w-4 text-primary-ink" aria-hidden />
                        {order.deliveryMethod === 'campus' ? `Te lo llevamos a: ${order.deliveryPoint}` : order.deliveryPoint}
                    </p>
                </section>
            )}

            {/* Seguimiento */}
            <section className="card mt-5 p-4">
                <h2 className="mb-4 text-[15px] font-semibold">Seguimiento</h2>
                <ol>
                    {steps.map((step, i) => {
                        const done = i <= currentIndex;
                        const current = i === currentIndex;
                        return (
                            <li key={step.status} className="relative flex gap-3 pb-5 last:pb-0">
                                {i < steps.length - 1 && (
                                    <span className={`absolute left-[11px] top-6 h-[calc(100%-16px)] w-0.5 ${i < currentIndex ? 'bg-primary' : 'bg-line'}`} aria-hidden />
                                )}
                                <span
                                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                        done ? 'bg-primary text-primary-fg' : 'border-2 border-line bg-surface'
                                    } ${current ? 'ring-4 ring-primary-line' : ''}`}
                                >
                                    {done && <PiCheckBold className="h-3 w-3" aria-hidden />}
                                </span>
                                <div className="-mt-0.5">
                                    <p className={`text-[14px] font-semibold ${done ? 'text-fg' : 'text-subtle'}`}>{step.label}</p>
                                    <p className="text-xs text-subtle">{step.detail}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </section>

            {/* Productos */}
            <section className="card mt-5 divide-y divide-line">
                {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 p-3.5">
                        <ProductVisual visual={item.visual} imageUrl={item.imageUrl} imageFit={item.imageFit} alt={item.name} className="h-12 w-12 shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium">{item.name}</p>
                            <p className="text-xs text-subtle">
                                {item.quantity} × {formatCOP(item.price)} · {item.storeName}
                            </p>
                        </div>
                        <span className="text-[14px] font-semibold tabular">{formatCOP(item.price * item.quantity)}</span>
                    </div>
                ))}
                <div className="space-y-1.5 p-4 text-[14px]">
                    <div className="flex justify-between text-muted">
                        <span>Entrega</span>
                        <span className="tabular">{order.deliveryFee ? formatCOP(order.deliveryFee) : 'Gratis'}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                        <span>Pago</span>
                        <span>{paymentLabels[order.paymentMethod]}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 font-semibold">
                        <span>Total</span>
                        {order.totalUnicoin ? (
                            <CoinAmount amount={order.totalUnicoin} suffix className="text-lg font-bold text-coin-ink" />
                        ) : (
                            <span className="text-lg font-bold tabular">{formatCOP(order.total)}</span>
                        )}
                    </div>
                </div>
            </section>

            {order.note && (
                <p className="mt-4 rounded-2xl bg-surface-2 p-3.5 text-[13px] text-muted">
                    <span className="font-semibold text-fg">Tu nota: </span>
                    {order.note}
                </p>
            )}

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <ButtonLink to="/catalogo" size="lg" block>
                    Seguir comprando
                </ButtonLink>
                <ButtonLink to="/perfil#pedidos" variant="secondary" size="lg" block>
                    Mis pedidos
                </ButtonLink>
            </div>
        </div>
    );
};

export default OrderPage;
