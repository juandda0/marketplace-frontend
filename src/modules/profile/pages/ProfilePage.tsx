import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    PiArrowCounterClockwise,
    PiCaretRight,
    PiEnvelopeSimple,
    PiGraduationCap,
    PiIdentificationCard,
    PiMapPin,
    PiMoon,
    PiSealCheckFill,
    PiSignOut,
    PiStorefront,
    PiSun,
    PiTrophyFill,
} from 'react-icons/pi';
import { useAuth, useCurrentUser } from '../../auth/hooks/useAuth';
import { useTheme } from '../../../core/theme/useTheme';
import { useToast } from '../../../core/toast/useToast';
import { useAsync } from '../../../core/hooks/useAsync';
import { getOrders } from '../../cart/services/orderService';
import { getUserBids } from '../../auctions/services/auctionService';
import { getUserTickets } from '../../raffles/services/raffleService';
import { campuses } from '../../../mocks/users';
import { storeById } from '../../../mocks/catalog';
import { resetDemoData } from '../../../lib/mockDb';
import { StoreLogo } from '../../marketplace/components/StoreCard';
import type { OrderStatus } from '../../cart/types';
import Avatar from '../../../core/ui/Avatar';
import Badge from '../../../core/ui/Badge';
import Button from '../../../core/ui/Button';
import ProductVisual from '../../../core/ui/ProductVisual';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { Skeleton } from '../../../core/ui/Skeleton';
import { formatCOP, formatDateTime, formatNumber, formatRelative, padTicket } from '../../../core/utils/format';

const statusLabel: Record<OrderStatus, { text: string; tone: 'primary' | 'coin' | 'neutral' }> = {
    confirmado: { text: 'Confirmado', tone: 'primary' },
    preparando: { text: 'En preparación', tone: 'coin' },
    listo: { text: 'Listo', tone: 'primary' },
    entregado: { text: 'Entregado', tone: 'neutral' },
};

const ProfilePage = () => {
    const user = useCurrentUser();
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const toast = useToast();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const orders = useAsync(() => getOrders(user.id), [user.id]);
    const bids = useAsync(() => getUserBids(user.id), [user.id]);
    const tickets = useAsync(() => getUserTickets(user.id), [user.id]);

    useEffect(() => {
        if (hash && orders.data) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [hash, orders.data]);

    const fullName = `${user.name} ${user.lastName}`.trim();
    const store = user.storeId ? storeById(user.storeId) : undefined;
    const campus = campuses.find((c) => c.id === user.campusId)?.name ?? 'Montería · Campus Central';
    const ticketCount = tickets.data?.reduce((n, r) => n + r.myNumbers.length, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            {/* Encabezado */}
            <section className="relative isolate overflow-hidden rounded-3xl border border-line/70 bg-surface p-5">
                <div
                    className="absolute inset-x-0 top-0 -z-10 h-24"
                    style={{ background: 'linear-gradient(120deg, rgb(var(--primary) / 0.28), rgb(var(--coin) / 0.14) 60%, transparent)' }}
                />
                <Avatar name={fullName} size="xl" className="ring-4 ring-surface" />
                <h1 className="mt-3 flex items-center gap-1.5 text-[22px] font-bold tracking-tight">
                    {fullName}
                    {user.studentId && <PiSealCheckFill className="h-5 w-5 text-primary" aria-label="Estudiante verificado" />}
                </h1>
                <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted">
                    <PiGraduationCap className="h-4 w-4" aria-hidden />
                    {user.program} · {user.semester}.º semestre
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {user.studentId && <Badge tone="primary">Estudiante verificado</Badge>}
                    {user.role === 'ENTREPRENEUR' && <Badge tone="coin">Emprendimiento activo</Badge>}
                    <Badge>Miembro desde {new Date(user.createdAt).toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })}</Badge>
                </div>

                <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[
                        { label: 'Pedidos', value: orders.data?.length },
                        { label: 'Pujas', value: bids.data?.length },
                        { label: 'Boletos', value: ticketCount },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-surface-2 py-3">
                            <dd className="text-xl font-bold tabular">{stat.value ?? '–'}</dd>
                            <dt className="text-[11px] text-subtle">{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Tienda */}
            {store ? (
                <Link to={`/tiendas/${store.id}`} className="card flex items-center gap-3 p-4 transition hover:border-line">
                    <StoreLogo store={store} />
                    <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-medium text-subtle">Mi tienda</p>
                        <p className="truncate text-[15px] font-semibold">{store.name}</p>
                        <p className="text-xs text-muted">
                            {formatNumber(store.sales)} ventas · {formatNumber(store.followers)} seguidores
                        </p>
                    </div>
                    <PiCaretRight className="h-5 w-5 text-subtle" aria-hidden />
                </Link>
            ) : (
                <section className="card flex items-center gap-3 p-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <PiStorefront className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold">¿Tienes un emprendimiento?</p>
                        <p className="text-xs text-muted">Abre tu tienda y vende a toda la U.</p>
                    </div>
                    <Button
                        size="sm"
                        onClick={() =>
                            toast({ title: 'Solicitud enviada', description: 'Bienestar Universitario verificará tu emprendimiento en 48 h.' })
                        }
                    >
                        Quiero vender
                    </Button>
                </section>
            )}

            {/* Pedidos */}
            <section id="pedidos" className="scroll-mt-20">
                <h2 className="mb-3 text-[17px] font-semibold tracking-tight">Mis pedidos</h2>
                {orders.loading ? (
                    <Skeleton className="h-36 w-full rounded-2xl" />
                ) : orders.data?.length ? (
                    <ul className="card divide-y divide-line/70">
                        {orders.data.slice(0, 5).map((order) => {
                            const first = order.items[0];
                            const s = statusLabel[order.status];
                            return (
                                <li key={order.id}>
                                    <Link to={`/pedidos/${order.id}`} className="flex items-center gap-3 p-3.5 transition hover:bg-surface-2/60">
                                        <ProductVisual visual={first.visual} imageUrl={first.imageUrl} imageFit={first.imageFit} alt={first.name} className="h-12 w-12 shrink-0 rounded-xl" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-[14px] font-medium">
                                                {order.items.length === 1 ? first.name : `${first.name} y ${order.items.length - 1} más`}
                                            </p>
                                            <p className="text-xs text-subtle">
                                                {order.id} · {formatRelative(order.createdAt)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {order.totalUnicoin ? (
                                                <CoinAmount amount={order.totalUnicoin} className="text-[13px] font-semibold" />
                                            ) : (
                                                <span className="text-[13px] font-semibold tabular">{formatCOP(order.total)}</span>
                                            )}
                                            <Badge tone={s.tone}>{s.text}</Badge>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="card p-4 text-[13px] text-muted">Aún no has hecho pedidos.</p>
                )}
            </section>

            {/* Pujas */}
            {bids.data && bids.data.length > 0 && (
                <section>
                    <h2 className="mb-3 text-[17px] font-semibold tracking-tight">Mis pujas</h2>
                    <ul className="card divide-y divide-line/70">
                        {bids.data.map(({ auction, myBestBid, isLeading }) => (
                            <li key={auction.id}>
                                <Link to={`/subastas/${auction.id}`} className="flex items-center gap-3 p-3.5 transition hover:bg-surface-2/60">
                                    <ProductVisual visual={auction.visual} alt={auction.title} className="h-12 w-12 shrink-0 rounded-xl" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[14px] font-medium">{auction.title}</p>
                                        <p className="text-xs text-subtle">
                                            Tu puja: {formatNumber(myBestBid)} UC · actual {formatNumber(auction.currentBid)} UC
                                        </p>
                                    </div>
                                    {auction.status === 'ended' ? (
                                        <Badge tone={isLeading ? 'primary' : 'neutral'}>{isLeading ? 'Ganaste' : 'Finalizada'}</Badge>
                                    ) : (
                                        <Badge tone={isLeading ? 'primary' : 'auction'}>{isLeading ? 'Vas ganando' : 'Te superaron'}</Badge>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Boletos */}
            {tickets.data && tickets.data.length > 0 && (
                <section>
                    <h2 className="mb-3 text-[17px] font-semibold tracking-tight">Mis boletos</h2>
                    <ul className="card divide-y divide-line/70">
                        {tickets.data.map((raffle) => (
                            <li key={raffle.id}>
                                <Link to={`/rifas/${raffle.id}`} className="flex items-center gap-3 p-3.5 transition hover:bg-surface-2/60">
                                    <ProductVisual visual={raffle.visual} alt={raffle.title} className="h-12 w-12 shrink-0 rounded-xl" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[14px] font-medium">{raffle.title}</p>
                                        <p className="text-xs text-subtle">Sorteo {formatDateTime(raffle.drawAt)}</p>
                                    </div>
                                    <div className="flex max-w-[40%] flex-wrap justify-end gap-1">
                                        {raffle.myNumbers.slice(0, 4).map((n) => (
                                            <span key={n} className="rounded-md bg-raffle/15 px-1.5 py-0.5 text-[11px] font-bold text-raffle tabular">
                                                {padTicket(n, raffle.totalTickets)}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Datos */}
            <section>
                <h2 className="mb-3 text-[17px] font-semibold tracking-tight">Datos de la cuenta</h2>
                <ul className="card divide-y divide-line/70 text-[14px]">
                    <li className="flex items-center gap-3 p-3.5">
                        <PiEnvelopeSimple className="h-5 w-5 text-subtle" aria-hidden />
                        <span className="min-w-0 flex-1 truncate">{user.email}</span>
                    </li>
                    {user.studentId && (
                        <li className="flex items-center gap-3 p-3.5">
                            <PiIdentificationCard className="h-5 w-5 text-subtle" aria-hidden />
                            <span className="flex-1">Código estudiantil</span>
                            <span className="text-muted tabular">{user.studentId}</span>
                        </li>
                    )}
                    <li className="flex items-center gap-3 p-3.5">
                        <PiMapPin className="h-5 w-5 text-subtle" aria-hidden />
                        <span className="flex-1">Sede</span>
                        <span className="text-muted">{campus}</span>
                    </li>
                    <li className="flex items-center gap-3 p-3.5">
                        {theme === 'dark' ? <PiMoon className="h-5 w-5 text-subtle" aria-hidden /> : <PiSun className="h-5 w-5 text-subtle" aria-hidden />}
                        <span className="flex-1">Tema</span>
                        <div className="flex rounded-xl bg-surface-2 p-1" role="radiogroup" aria-label="Tema">
                            {(
                                [
                                    ['dark', 'Oscuro'],
                                    ['light', 'Claro'],
                                ] as const
                            ).map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    role="radio"
                                    aria-checked={theme === value}
                                    onClick={() => setTheme(value)}
                                    className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                                        theme === value ? 'bg-surface text-fg shadow-card' : 'text-subtle hover:text-fg'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </li>
                </ul>
            </section>

            <div className="space-y-2">
                <Button variant="danger" size="lg" block onClick={handleLogout} icon={<PiSignOut className="h-5 w-5" aria-hidden />}>
                    Cerrar sesión
                </Button>
                <Button variant="ghost" size="md" block onClick={resetDemoData} icon={<PiArrowCounterClockwise className="h-4 w-4" aria-hidden />}>
                    Restablecer datos de demostración
                </Button>
            </div>

            <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-xs text-subtle">
                <PiTrophyFill className="h-3.5 w-3.5 text-coin" aria-hidden />
                Unimarket v1.0 · Ganador TechU Montería 2025
            </p>
        </div>
    );
};

export default ProfilePage;
