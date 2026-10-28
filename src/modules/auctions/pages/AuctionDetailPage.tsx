import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PiCaretRight, PiCrownSimpleFill, PiEye, PiGavel, PiMinus, PiPlus, PiTrophyFill } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { useNow } from '../../../core/hooks/useNow';
import { auctionStatus, getAuctionById, minimumBid, placeBid } from '../services/auctionService';
import { storeById } from '../../../mocks/catalog';
import { displayName, useCurrentUser } from '../../auth/hooks/useAuth';
import { useWallet } from '../../wallet/context/useWallet';
import { useToast } from '../../../core/toast/useToast';
import { errorMessage } from '../../../lib/mockDb';
import { LiveDot } from '../components/AuctionCard';
import { StoreLogo } from '../../marketplace/components/StoreCard';
import ProductVisual from '../../../core/ui/ProductVisual';
import Avatar from '../../../core/ui/Avatar';
import Badge from '../../../core/ui/Badge';
import Button, { ButtonLink } from '../../../core/ui/Button';
import EmptyState from '../../../core/ui/EmptyState';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CountdownBlocks } from '../../../core/ui/Countdown';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { DetailSkeleton } from '../../../core/ui/Skeleton';
import { formatCOP, formatDateTime, formatNumber, formatRelative, unicoinToCop } from '../../../core/utils/format';

const AuctionDetailPage = () => {
    const { auctionId } = useParams<{ auctionId: string }>();
    const id = Number(auctionId);
    const user = useCurrentUser();
    const { balance } = useWallet();
    const toast = useToast();
    const now = useNow(1000);
    const { data: auction, loading, setData } = useAsync(() => getAuctionById(id), [id]);
    const [amount, setAmount] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const min = auction ? minimumBid(auction) : 0;
    useEffect(() => setAmount(min), [min]);

    if (loading && !auction) return <DetailSkeleton />;
    if (!auction) {
        return (
            <EmptyState
                icon={<PiGavel aria-hidden />}
                title="Subasta no encontrada"
                action={<ButtonLink to="/subastas">Ver subastas</ButtonLink>}
            />
        );
    }

    const status = auctionStatus(auction.endsAt, now);
    const ended = status === 'ended';
    const store = storeById(auction.storeId);
    const leadingIsMe = auction.leader?.userId === user.id;
    const myBids = auction.bids.filter((b) => b.userId === user.id);
    const outbid = !leadingIsMe && myBids.length > 0;

    const submit = async () => {
        setError('');
        setSubmitting(true);
        try {
            const updated = await placeBid(auction.id, amount, { id: user.id, displayName: displayName(user) });
            setData(updated);
            toast({ title: '¡Puja registrada! Vas ganando', description: `Ofreciste ${formatNumber(amount)} UNICOIN`, tone: 'coin' });
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setSubmitting(false);
        }
    };

    const step = (dir: 1 | -1) => setAmount((a) => Math.max(min, a + dir * auction.minIncrement));

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <div className="relative">
                    <ProductVisual
                        visual={auction.visual}
                        imageUrl={auction.imageUrl}
                        alt={auction.title}
                        iconScale="lg"
                        className="aspect-[4/3] w-full rounded-3xl border border-line/60 md:aspect-square"
                    />
                    <span
                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur ${
                            ended ? 'bg-[#0B0F0D]/75 text-white/80' : 'bg-[#0B0F0D]/75 text-white'
                        }`}
                    >
                        {ended ? 'Finalizada' : (<><LiveDot /> En vivo</>)}
                    </span>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#0B0F0D]/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        <PiEye className="h-3.5 w-3.5" aria-hidden /> {auction.watchers}
                    </span>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2">
                        <Badge tone="auction">Subasta</Badge>
                        <Badge>{auction.condition}</Badge>
                    </div>
                    <h1 className="mt-2.5 text-balance text-[22px] font-bold leading-tight tracking-tight md:text-3xl">{auction.title}</h1>

                    {/* Estado de la puja */}
                    <div className="card mt-4 overflow-hidden">
                        <div className="p-4">
                            <p className="text-[12px] font-medium text-subtle">{ended ? 'Precio final' : 'Puja más alta'}</p>
                            <div className="mt-1 flex items-end justify-between gap-3">
                                <CoinAmount amount={auction.currentBid} suffix className="text-[34px] font-bold leading-none tracking-tight text-coin" />
                                <span className="pb-1 text-xs text-subtle tabular">≈ {formatCOP(unicoinToCop(auction.currentBid))}</span>
                            </div>
                            {auction.leader && (
                                <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
                                    <PiCrownSimpleFill className="h-4 w-4 text-coin" aria-hidden />
                                    {leadingIsMe ? (
                                        <span className="font-semibold text-primary">{ended ? '¡Ganaste esta subasta!' : 'Vas ganando'}</span>
                                    ) : (
                                        <span>
                                            {ended ? 'Ganó' : 'Va ganando'} <span className="font-medium text-fg">{auction.leader.bidderName}</span>
                                        </span>
                                    )}
                                </p>
                            )}
                            {outbid && !ended && (
                                <p className="mt-2 rounded-xl bg-auction/10 px-3 py-2 text-[13px] font-medium text-auction">
                                    Te superaron. Tu última puja fue de {formatNumber(Math.max(...myBids.map((b) => b.amount)))} UC.
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 divide-x divide-line/70 border-t border-line/70 text-center">
                            <div className="py-2.5">
                                <p className="text-[11px] text-subtle">Precio base</p>
                                <p className="text-[13px] font-semibold tabular">{formatNumber(auction.startingBid)} UC</p>
                            </div>
                            <div className="py-2.5">
                                <p className="text-[11px] text-subtle">Incremento</p>
                                <p className="text-[13px] font-semibold tabular">+{formatNumber(auction.minIncrement)} UC</p>
                            </div>
                            <div className="py-2.5">
                                <p className="text-[11px] text-subtle">Pujas</p>
                                <p className="text-[13px] font-semibold tabular">{auction.bids.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tiempo */}
                    <div className="mt-4">
                        <p className="mb-2 text-[12px] font-medium text-subtle">
                            {ended ? `Terminó el ${formatDateTime(auction.endsAt)}` : 'Termina en'}
                        </p>
                        {ended ? (
                            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-3.5 text-[13px] text-muted">
                                <PiTrophyFill className="h-6 w-6 text-coin" aria-hidden />
                                El ganador tiene 48 horas para coordinar la entrega con la tienda.
                            </div>
                        ) : (
                            <CountdownBlocks endsAt={auction.endsAt} />
                        )}
                    </div>

                    {/* Desktop: pujar */}
                    {!ended && (
                        <div className="mt-5 hidden md:block">
                            <BidControls amount={amount} min={min} balance={balance} onStep={step} onSubmit={submit} submitting={submitting} disabled={leadingIsMe} />
                            {error && <p className="mt-2 text-[13px] text-danger" role="alert">{error}</p>}
                        </div>
                    )}

                    <section className="mt-6">
                        <h2 className="text-[15px] font-semibold">Descripción</h2>
                        <p className="mt-2 text-[14px] leading-relaxed text-muted">{auction.description}</p>
                    </section>

                    {store && (
                        <Link to={`/tiendas/${store.id}`} className="card mt-5 flex items-center gap-3 p-3 transition hover:border-line">
                            <StoreLogo store={store} className="h-10 w-10 rounded-xl" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] text-subtle">Subastado por</p>
                                <p className="truncate text-[14px] font-semibold">{store.name}</p>
                            </div>
                            <PiCaretRight className="h-5 w-5 text-subtle" aria-hidden />
                        </Link>
                    )}
                </div>
            </div>

            {/* Historial */}
            <section className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold tracking-tight">Historial de pujas</h2>
                    <span className="text-[13px] text-subtle">{auction.bids.length} pujas</span>
                </div>
                <ol className="card divide-y divide-line/70">
                    {auction.bids.map((bid, index) => {
                        const mine = bid.userId === user.id;
                        return (
                            <li key={bid.id} className={`flex items-center gap-3 px-4 py-3 ${index === 0 ? 'bg-coin/[0.06]' : ''}`}>
                                <Avatar name={bid.bidderName} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <p className="flex items-center gap-1.5 text-[14px] font-medium">
                                        {mine ? 'Tú' : bid.bidderName}
                                        {index === 0 && <PiCrownSimpleFill className="h-3.5 w-3.5 text-coin" aria-label="Puja más alta" />}
                                    </p>
                                    <p className="text-xs text-subtle">{formatRelative(bid.createdAt, now)}</p>
                                </div>
                                <CoinAmount amount={bid.amount} className={`text-[14px] font-semibold ${index === 0 ? 'text-coin' : 'text-muted'}`} />
                            </li>
                        );
                    })}
                    <li className="flex items-center gap-3 px-4 py-3 text-[13px] text-subtle">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-3">
                            <PiGavel aria-hidden />
                        </span>
                        Subasta abierta con precio base de {formatNumber(auction.startingBid)} UC
                    </li>
                </ol>
            </section>

            {/* Barra para pujar (móvil) */}
            <div className="md:hidden">
                {ended ? (
                    <StickyActionBar>
                        <ButtonLink to="/subastas" variant="secondary" size="lg" block>
                            Ver otras subastas
                        </ButtonLink>
                    </StickyActionBar>
                ) : (
                    <StickyActionBar>
                        <div className="w-full">
                            {error && <p className="mb-2 text-[13px] text-danger" role="alert">{error}</p>}
                            <BidControls amount={amount} min={min} balance={balance} onStep={step} onSubmit={submit} submitting={submitting} disabled={leadingIsMe} />
                        </div>
                    </StickyActionBar>
                )}
            </div>
        </div>
    );
};

interface BidControlsProps {
    amount: number;
    min: number;
    balance: number;
    onStep: (dir: 1 | -1) => void;
    onSubmit: () => void;
    submitting: boolean;
    disabled: boolean;
}

const BidControls = ({ amount, min, balance, onStep, onSubmit, submitting, disabled }: BidControlsProps) => (
    <div>
        <div className="mb-2 flex items-center justify-between text-xs text-subtle">
            <span>Mínimo {formatNumber(min)} UC</span>
            <span>
                Tu saldo: <span className="font-semibold text-coin">{formatNumber(balance)} UC</span>
            </span>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex h-[52px] flex-1 items-center rounded-2xl border border-line bg-surface-2">
                <button
                    type="button"
                    onClick={() => onStep(-1)}
                    disabled={amount <= min || disabled}
                    className="flex h-full w-11 items-center justify-center text-muted disabled:opacity-35"
                    aria-label="Bajar puja"
                >
                    <PiMinus aria-hidden />
                </button>
                <CoinAmount amount={amount} className="flex-1 justify-center text-[17px] font-bold" />
                <button
                    type="button"
                    onClick={() => onStep(1)}
                    disabled={disabled}
                    className="flex h-full w-11 items-center justify-center text-muted disabled:opacity-35"
                    aria-label="Subir puja"
                >
                    <PiPlus aria-hidden />
                </button>
            </div>
            <Button variant="auction" size="lg" onClick={onSubmit} loading={submitting} disabled={disabled} icon={<PiGavel className="h-5 w-5" aria-hidden />}>
                {disabled ? 'Vas ganando' : 'Pujar'}
            </Button>
        </div>
    </div>
);

export default AuctionDetailPage;
