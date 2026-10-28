import { useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PiCheckBold, PiDeviceMobile, PiMapPin, PiMoney, PiPackage, PiStorefront } from 'react-icons/pi';
import { useCart } from '../context/useCart';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import { useWallet } from '../../wallet/context/useWallet';
import { calculateTotals, createOrder } from '../services/orderService';
import type { DeliveryMethod, PaymentMethod } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import Button from '../../../core/ui/Button';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CoinAmount, UnicoinIcon } from '../../../core/ui/Unicoin';
import { errorMessage } from '../../../lib/mockDb';
import { formatCOP, formatNumber } from '../../../core/utils/format';
import { CAMPUS_DELIVERY_FEE } from '../../../lib/config';
import { storeById } from '../../../mocks/catalog';

const campusPoints = ['Biblioteca central', 'Cafetería central', 'Bloque de Ingenierías', 'Facultad de Ciencias de la Salud', 'Coliseo'];

interface OptionProps {
    active: boolean;
    onClick: () => void;
    icon: ReactNode;
    title: string;
    detail: ReactNode;
    trailing?: ReactNode;
    disabled?: boolean;
}

const Option = ({ active, onClick, icon, title, detail, trailing, disabled }: OptionProps) => (
    <button
        type="button"
        role="radio"
        aria-checked={active}
        disabled={disabled}
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition disabled:opacity-50 ${
            active ? 'border-primary/60 bg-primary/[0.07]' : 'border-line bg-surface hover:border-line'
        }`}
    >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-3 text-fg">{icon}</span>
        <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-fg">{title}</span>
            <span className="block text-xs text-subtle">{detail}</span>
        </span>
        {trailing}
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? 'border-primary bg-primary text-primary-fg' : 'border-line'}`}>
            {active && <PiCheckBold className="h-3 w-3" aria-hidden />}
        </span>
    </button>
);

const CheckoutPage = () => {
    const user = useCurrentUser();
    const { balance } = useWallet();
    const { items, subtotal, clear } = useCart();
    const [delivery, setDelivery] = useState<DeliveryMethod>('pickup');
    const [point, setPoint] = useState(campusPoints[0]);
    const [payment, setPayment] = useState<PaymentMethod>('unicoin');
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

    if (placedOrderId) return <Navigate to={`/pedidos/${placedOrderId}`} replace />;
    if (!items.length) return <Navigate to="/carrito" replace />;

    const totals = calculateTotals(subtotal, delivery);
    const canPayWithUnicoin = balance >= totals.totalUnicoin;
    const stores = [...new Set(items.map((i) => i.storeId))].map((id) => storeById(id));
    const pickupPoint = stores.length === 1 ? (stores[0]?.location ?? 'Punto del vendedor') : 'Punto de cada vendedor';

    const confirm = async () => {
        setError('');
        setSubmitting(true);
        try {
            const order = await createOrder({
                userId: user.id,
                items,
                paymentMethod: payment,
                deliveryMethod: delivery,
                deliveryPoint: delivery === 'campus' ? point : pickupPoint,
                note: note.trim() || undefined,
            });
            setPlacedOrderId(order.id);
            clear();
        } catch (e) {
            setError(errorMessage(e));
            setSubmitting(false);
        }
    };

    const effectivePayment = payment === 'unicoin' && !canPayWithUnicoin ? null : payment;

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="hidden text-3xl font-bold tracking-tight md:block">Finalizar compra</h1>

            {/* Resumen de productos */}
            <section>
                <h2 className="mb-2.5 text-[13px] font-semibold text-muted">Tu pedido</h2>
                <div className="card flex items-center gap-3 p-3.5">
                    <div className="flex -space-x-3">
                        {items.slice(0, 3).map((item) => (
                            <ProductVisual
                                key={item.productId}
                                visual={item.visual}
                                imageUrl={item.imageUrl}
                                imageFit={item.imageFit}
                                alt={item.name}
                                className="h-12 w-12 rounded-xl ring-2 ring-surface"
                            />
                        ))}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold">
                            {items.length === 1 ? items[0].name : `${items[0].name} y ${items.length - 1} más`}
                        </p>
                        <p className="truncate text-xs text-subtle">{[...new Set(items.map((i) => i.storeName))].join(' · ')}</p>
                    </div>
                    <span className="text-[14px] font-semibold tabular">{formatCOP(subtotal)}</span>
                </div>
            </section>

            {/* Entrega */}
            <section>
                <h2 className="mb-2.5 text-[13px] font-semibold text-muted">Entrega</h2>
                <div className="space-y-2" role="radiogroup" aria-label="Método de entrega">
                    <Option
                        active={delivery === 'pickup'}
                        onClick={() => setDelivery('pickup')}
                        icon={<PiStorefront className="h-5 w-5" aria-hidden />}
                        title="Recoger en el punto del vendedor"
                        detail={pickupPoint}
                        trailing={<span className="text-[13px] font-semibold text-primary">Gratis</span>}
                    />
                    <Option
                        active={delivery === 'campus'}
                        onClick={() => setDelivery('campus')}
                        icon={<PiPackage className="h-5 w-5" aria-hidden />}
                        title="Entrega en el campus"
                        detail="Un domiciliario estudiante te lo lleva"
                        trailing={<span className="text-[13px] font-semibold tabular">{formatCOP(CAMPUS_DELIVERY_FEE)}</span>}
                    />
                </div>
                {delivery === 'campus' && (
                    <label className="mt-3 block animate-fade-up">
                        <span className="label">Punto de entrega</span>
                        <div className="relative">
                            <PiMapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" aria-hidden />
                            <select value={point} onChange={(e) => setPoint(e.target.value)} className="input appearance-none pl-12">
                                {campusPoints.map((p) => (
                                    <option key={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                )}
            </section>

            {/* Pago */}
            <section>
                <h2 className="mb-2.5 text-[13px] font-semibold text-muted">Método de pago</h2>
                <div className="space-y-2" role="radiogroup" aria-label="Método de pago">
                    <Option
                        active={payment === 'unicoin'}
                        onClick={() => setPayment('unicoin')}
                        icon={<UnicoinIcon className="h-6 w-6" />}
                        title="UNICOIN"
                        detail={
                            canPayWithUnicoin ? (
                                <>Saldo: {formatNumber(balance)} UC · pago instantáneo</>
                            ) : (
                                <span className="text-danger">Saldo insuficiente ({formatNumber(balance)} UC)</span>
                            )
                        }
                        trailing={<CoinAmount amount={totals.totalUnicoin} className="text-[13px] font-semibold text-coin" />}
                    />
                    <Option
                        active={payment === 'nequi'}
                        onClick={() => setPayment('nequi')}
                        icon={<PiDeviceMobile className="h-5 w-5" aria-hidden />}
                        title="Nequi"
                        detail="Te enviamos la solicitud de pago a tu celular"
                    />
                    <Option
                        active={payment === 'efectivo'}
                        onClick={() => setPayment('efectivo')}
                        icon={<PiMoney className="h-5 w-5" aria-hidden />}
                        title="Efectivo al recibir"
                        detail="Paga al vendedor cuando recojas tu pedido"
                    />
                </div>
            </section>

            <label className="block">
                <span className="label">Nota para el vendedor (opcional)</span>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    maxLength={160}
                    placeholder="Ej. Sin cebolla, por favor. Salgo de clase a las 10:00."
                    className="input h-auto resize-none py-3"
                />
            </label>

            {/* Totales */}
            <section className="card divide-y divide-line/70 text-[14px]">
                <div className="flex justify-between p-4">
                    <span className="text-muted">Subtotal</span>
                    <span className="tabular">{formatCOP(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between p-4">
                    <span className="text-muted">Entrega</span>
                    <span className="tabular">{totals.deliveryFee ? formatCOP(totals.deliveryFee) : 'Gratis'}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                    <span className="font-semibold">Total</span>
                    {payment === 'unicoin' ? (
                        <span className="text-right">
                            <CoinAmount amount={totals.totalUnicoin} suffix className="text-lg font-bold text-coin" />
                            <span className="block text-xs text-subtle tabular">{formatCOP(totals.total)}</span>
                        </span>
                    ) : (
                        <span className="text-lg font-bold tabular">{formatCOP(totals.total)}</span>
                    )}
                </div>
            </section>

            {error && <p className="text-[13px] text-danger" role="alert">{error}</p>}

            <StickyActionBar>
                <Button size="lg" block onClick={confirm} loading={submitting} disabled={!effectivePayment}>
                    {submitting
                        ? 'Confirmando…'
                        : payment === 'unicoin'
                          ? `Pagar ${formatNumber(totals.totalUnicoin)} UC`
                          : `Confirmar pedido · ${formatCOP(totals.total)}`}
                </Button>
            </StickyActionBar>
        </div>
    );
};

export default CheckoutPage;
