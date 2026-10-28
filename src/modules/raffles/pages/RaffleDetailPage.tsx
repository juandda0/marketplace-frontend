import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PiCheckBold, PiDiceFive, PiHeartFill, PiTicket, PiTrophy, PiX } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { buyTickets, getRaffleById } from '../services/raffleService';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import { useWallet } from '../../wallet/context/useWallet';
import { useToast } from '../../../core/toast/useToast';
import { errorMessage } from '../../../lib/mockDb';
import ProductVisual from '../../../core/ui/ProductVisual';
import ProgressBar from '../../../core/ui/ProgressBar';
import Badge from '../../../core/ui/Badge';
import Button, { ButtonLink } from '../../../core/ui/Button';
import EmptyState from '../../../core/ui/EmptyState';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CountdownBlocks } from '../../../core/ui/Countdown';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { DetailSkeleton } from '../../../core/ui/Skeleton';
import { formatCOP, formatDateTime, formatNumber, padTicket } from '../../../core/utils/format';

const MAX_PER_PURCHASE = 10;

const RaffleDetailPage = () => {
    const { raffleId } = useParams<{ raffleId: string }>();
    const id = Number(raffleId);
    const user = useCurrentUser();
    const { balance } = useWallet();
    const toast = useToast();
    const { data: raffle, loading, setData } = useAsync(() => getRaffleById(id, user.id), [id, user.id]);
    const [selected, setSelected] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (loading && !raffle) return <DetailSkeleton />;
    if (!raffle) {
        return <EmptyState icon={<PiTicket aria-hidden />} title="Rifa no encontrada" action={<ButtonLink to="/rifas">Ver rifas</ButtonLink>} />;
    }

    const taken = new Set(raffle.taken);
    const mine = new Set(raffle.myNumbers);
    const available = raffle.totalTickets - raffle.taken.length;
    const total = selected.length * raffle.ticketPrice;
    const insufficient = total > balance;

    const toggle = (n: number) => {
        setError('');
        if (selected.includes(n)) {
            setSelected(selected.filter((x) => x !== n));
        } else if (selected.length >= MAX_PER_PURCHASE) {
            setError(`Puedes elegir hasta ${MAX_PER_PURCHASE} números por compra.`);
        } else {
            setSelected([...selected, n].sort((a, b) => a - b));
        }
    };

    const pickRandom = () => {
        const free = Array.from({ length: raffle.totalTickets }, (_, i) => i).filter((n) => !taken.has(n) && !selected.includes(n));
        if (!free.length || selected.length >= MAX_PER_PURCHASE) return;
        toggle(free[Math.floor(Math.random() * free.length)]);
    };

    const buy = async () => {
        setError('');
        setSubmitting(true);
        try {
            const updated = await buyTickets(raffle.id, selected, user.id);
            setData(updated);
            toast({
                title: selected.length === 1 ? '¡Boleto comprado!' : `¡${selected.length} boletos comprados!`,
                description: `Números ${selected.map((n) => padTicket(n, raffle.totalTickets)).join(', ')} · Sorteo ${formatDateTime(raffle.drawAt)}`,
                tone: 'coin',
            });
            setSelected([]);
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <div>
                    <ProductVisual visual={raffle.visual} alt={raffle.prize} iconScale="lg" className="aspect-[16/10] w-full rounded-3xl border border-line/60 md:aspect-square" />
                </div>

                <div>
                    <div className="flex flex-wrap gap-2">
                        <Badge tone="raffle">Rifa</Badge>
                        <Badge>
                            Premio valorado en {formatCOP(raffle.prizeValue)}
                        </Badge>
                    </div>
                    <h1 className="mt-2.5 text-balance text-[22px] font-bold leading-tight tracking-tight md:text-3xl">{raffle.title}</h1>
                    <p className="mt-1 text-[13px] text-muted">
                        Organiza{' '}
                        {raffle.organizerStoreId ? (
                            <Link to={`/tiendas/${raffle.organizerStoreId}`} className="font-medium text-primary hover:underline">
                                {raffle.organizer}
                            </Link>
                        ) : (
                            <span className="font-medium text-fg">{raffle.organizer}</span>
                        )}
                    </p>

                    <div className="card mt-4 p-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[12px] text-subtle">Valor del boleto</p>
                                <CoinAmount amount={raffle.ticketPrice} suffix className="text-[28px] font-bold leading-tight text-coin" />
                            </div>
                            <div className="text-right">
                                <p className="text-[12px] text-subtle">Disponibles</p>
                                <p className="text-lg font-bold tabular">
                                    {available}
                                    <span className="text-sm font-medium text-subtle">/{raffle.totalTickets}</span>
                                </p>
                            </div>
                        </div>
                        <ProgressBar value={raffle.taken.length} max={raffle.totalTickets} tone="raffle" className="mt-3" />
                        <p className="mt-2 text-xs text-muted">
                            {Math.round((raffle.taken.length / raffle.totalTickets) * 100)}% vendido · se sortea aunque no se vendan todos
                        </p>
                    </div>

                    <div className="mt-4">
                        <p className="mb-2 text-[12px] font-medium text-subtle">Sorteo el {formatDateTime(raffle.drawAt)}</p>
                        <CountdownBlocks endsAt={raffle.drawAt} tone="raffle" />
                    </div>

                    {raffle.cause && (
                        <div className="mt-4 flex gap-3 rounded-2xl border border-raffle/25 bg-raffle/[0.08] p-3.5">
                            <PiHeartFill className="mt-0.5 h-5 w-5 shrink-0 text-raffle" aria-hidden />
                            <div className="text-[13px]">
                                <p className="font-semibold text-fg">Lo recaudado apoya</p>
                                <p className="text-muted">{raffle.cause}</p>
                            </div>
                        </div>
                    )}

                    <section className="mt-5">
                        <h2 className="flex items-center gap-2 text-[15px] font-semibold">
                            <PiTrophy className="h-5 w-5 text-coin" aria-hidden /> Premio
                        </h2>
                        <p className="mt-1 text-[14px] font-medium text-fg">{raffle.prize}</p>
                        <p className="mt-2 text-[14px] leading-relaxed text-muted">{raffle.description}</p>
                    </section>

                    {raffle.myNumbers.length > 0 && (
                        <section className="mt-5">
                            <h2 className="text-[15px] font-semibold">Tus boletos</h2>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {raffle.myNumbers.map((n) => (
                                    <span
                                        key={n}
                                        className="inline-flex h-9 min-w-[3rem] items-center justify-center gap-1 rounded-xl bg-raffle px-2.5 text-[14px] font-bold text-white tabular [[data-theme=dark]_&]:text-[#140b33]"
                                    >
                                        <PiTicket className="h-4 w-4" aria-hidden />
                                        {padTicket(n, raffle.totalTickets)}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Grilla de números */}
            <section className="mt-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <h2 className="whitespace-nowrap text-[17px] font-semibold tracking-tight">Elige tus números</h2>
                        <p className="text-xs text-subtle">Hasta {MAX_PER_PURCHASE} por compra</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                        {selected.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={() => setSelected([])} aria-label="Limpiar selección" className="w-9 !px-0">
                                <PiX className="h-4 w-4" aria-hidden />
                            </Button>
                        )}
                        <Button variant="secondary" size="sm" onClick={pickRandom} icon={<PiDiceFive className="h-4 w-4" aria-hidden />}>
                            Al azar
                        </Button>
                    </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-line bg-surface-2" /> Disponible</span>
                    <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-raffle" /> Seleccionado</span>
                    <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-raffle bg-raffle/20" /> Tuyo</span>
                    <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-surface-3/60" /> Vendido</span>
                </div>

                <div className="grid grid-cols-10 gap-1.5 md:gap-2" role="group" aria-label="Números de la rifa">
                    {Array.from({ length: raffle.totalTickets }, (_, n) => {
                        const isMine = mine.has(n);
                        const isTaken = taken.has(n) && !isMine;
                        const isSelected = selected.includes(n);
                        return (
                            <button
                                key={n}
                                type="button"
                                disabled={isTaken || isMine}
                                onClick={() => toggle(n)}
                                aria-pressed={isSelected}
                                aria-label={`Número ${padTicket(n, raffle.totalTickets)}${isTaken ? ', vendido' : isMine ? ', tuyo' : ''}`}
                                className={`relative flex aspect-square items-center justify-center rounded-lg text-[12px] font-semibold tabular transition md:text-sm ${
                                    isSelected
                                        ? 'scale-[1.04] bg-raffle text-white shadow-[0_6px_16px_-6px_rgb(var(--raffle)/0.8)] [[data-theme=dark]_&]:text-[#140b33]'
                                        : isMine
                                          ? 'border border-raffle bg-raffle/20 text-raffle'
                                          : isTaken
                                            ? 'cursor-not-allowed bg-surface-3/50 text-subtle/60 line-through'
                                            : 'border border-line bg-surface-2 text-fg hover:border-raffle/60 hover:text-raffle'
                                }`}
                            >
                                {padTicket(n, raffle.totalTickets)}
                                {isMine && <PiCheckBold className="absolute right-0.5 top-0.5 h-2.5 w-2.5" aria-hidden />}
                            </button>
                        );
                    })}
                </div>
                {error && <p className="mt-3 text-[13px] text-danger" role="alert">{error}</p>}
            </section>

            <StickyActionBar>
                <div className="min-w-0 flex-1">
                    <p className="text-xs text-subtle">
                        {selected.length ? `${selected.length} ${selected.length === 1 ? 'boleto' : 'boletos'}` : 'Elige al menos un número'}
                    </p>
                    <CoinAmount amount={total} suffix className={`text-lg font-bold ${insufficient ? 'text-danger' : 'text-fg'}`} />
                    {insufficient && <p className="text-[11px] text-danger">Saldo: {formatNumber(balance)} UC</p>}
                </div>
                {insufficient ? (
                    <ButtonLink to="/billetera/recargar" variant="coin" size="lg">
                        Recargar
                    </ButtonLink>
                ) : (
                    <Button variant="raffle" size="lg" onClick={buy} loading={submitting} disabled={!selected.length}>
                        Comprar boletos
                    </Button>
                )}
            </StickyActionBar>
        </div>
    );
};

export default RaffleDetailPage;
