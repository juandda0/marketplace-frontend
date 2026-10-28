import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowDownLeft, PiArrowUpRight, PiGavel, PiInfo, PiPlusBold, PiReceipt, PiTicket } from 'react-icons/pi';
import { useWallet } from '../context/useWallet';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import TransactionItem from '../components/TransactionItem';
import { UnicoinIcon } from '../../../core/ui/Unicoin';
import EmptyState from '../../../core/ui/EmptyState';
import { ListSkeleton, Skeleton } from '../../../core/ui/Skeleton';
import { formatCOP, formatNumber, unicoinToCop } from '../../../core/utils/format';
import { COP_PER_UNICOIN } from '../../../lib/config';

type Filter = 'all' | 'in' | 'out';

const MONTH = 30 * 24 * 3_600_000;

const WalletPage = () => {
    const user = useCurrentUser();
    const { balance, transactions, loading } = useWallet();
    const [filter, setFilter] = useState<Filter>('all');

    const recent = transactions.filter((t) => Date.now() - t.createdAt < MONTH);
    const income = recent.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const spent = recent.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);
    const list = transactions.filter((t) => (filter === 'all' ? true : filter === 'in' ? t.amount > 0 : t.amount < 0));

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-[26px] font-bold tracking-tight md:text-3xl">Billetera</h1>

            {/* Tarjeta de saldo */}
            <section
                className="relative isolate overflow-hidden rounded-[28px] border border-coin/25 p-5 shadow-float"
                aria-label="Saldo UNICOIN"
            >
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            'radial-gradient(90% 120% at 100% 0%, rgba(246,188,66,0.42), transparent 55%), radial-gradient(80% 90% at 0% 100%, rgba(62,214,140,0.22), transparent 60%), linear-gradient(140deg, #1B1A10 0%, #0E1210 60%, #0A0D0B 100%)',
                    }}
                />
                <UnicoinIcon className="absolute -right-10 -top-10 -z-10 h-48 w-48 opacity-[0.16]" />
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[13px] font-medium text-white/70">
                        <UnicoinIcon className="h-5 w-5" /> UNICOIN
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-white/45">UM · {user.id.slice(-4).toUpperCase()}</p>
                </div>
                <p className="mt-5 text-[13px] text-white/60">Saldo disponible</p>
                {loading ? (
                    <Skeleton className="mt-1 h-11 w-48 bg-white/10" />
                ) : (
                    <p className="mt-0.5 text-[42px] font-bold leading-none tracking-tight text-white tabular">
                        {formatNumber(balance)}
                        <span className="ml-1.5 text-lg font-semibold text-[#FFD66B]">UC</span>
                    </p>
                )}
                <p className="mt-1.5 text-[13px] text-white/55">≈ {formatCOP(unicoinToCop(balance))} COP</p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                    <Link
                        to="/billetera/recargar"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#F6BC42] py-3 text-[12px] font-semibold text-[#261800] transition hover:brightness-105"
                    >
                        <PiPlusBold className="h-5 w-5" aria-hidden /> Recargar
                    </Link>
                    <Link
                        to="/subastas"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/10 py-3 text-[12px] font-semibold text-white transition hover:bg-white/15"
                    >
                        <PiGavel className="h-5 w-5" aria-hidden /> Pujar
                    </Link>
                    <Link
                        to="/rifas"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/10 py-3 text-[12px] font-semibold text-white transition hover:bg-white/15"
                    >
                        <PiTicket className="h-5 w-5" aria-hidden /> Rifas
                    </Link>
                </div>
            </section>

            {/* Resumen del mes */}
            <section className="mt-4 grid grid-cols-2 gap-3">
                <div className="card p-3.5">
                    <p className="flex items-center gap-1.5 text-xs text-subtle">
                        <PiArrowDownLeft className="h-4 w-4 text-primary" aria-hidden /> Ingresos · 30 días
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary tabular">+{formatNumber(income)} UC</p>
                </div>
                <div className="card p-3.5">
                    <p className="flex items-center gap-1.5 text-xs text-subtle">
                        <PiArrowUpRight className="h-4 w-4 text-auction" aria-hidden /> Gastos · 30 días
                    </p>
                    <p className="mt-1 text-lg font-bold tabular">−{formatNumber(spent)} UC</p>
                </div>
            </section>

            {/* Movimientos */}
            <section className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[17px] font-semibold tracking-tight">Movimientos</h2>
                    <div className="flex gap-1.5" role="tablist">
                        {(
                            [
                                ['all', 'Todos'],
                                ['in', 'Ingresos'],
                                ['out', 'Gastos'],
                            ] as const
                        ).map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                role="tab"
                                aria-selected={filter === value}
                                onClick={() => setFilter(value)}
                                className={`chip h-8 px-3 text-[12px] ${filter === value ? 'chip-active' : ''}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                {loading ? (
                    <ListSkeleton count={3} />
                ) : list.length ? (
                    <ul className="card divide-y divide-line/70">
                        {list.map((tx) => (
                            <TransactionItem key={tx.id} tx={tx} />
                        ))}
                    </ul>
                ) : (
                    <EmptyState icon={<PiReceipt aria-hidden />} title="Sin movimientos" description="Aquí verás tus recargas, compras, pujas y boletos." />
                )}
            </section>

            <section className="mt-6 flex gap-3 rounded-2xl border border-line/70 bg-surface-2/60 p-4 text-[13px]">
                <PiInfo className="mt-0.5 h-5 w-5 shrink-0 text-coin" aria-hidden />
                <div>
                    <p className="font-semibold text-fg">¿Qué es UNICOIN?</p>
                    <p className="mt-1 leading-relaxed text-muted">
                        Es la moneda digital de Unimarket. 1 UNICOIN equivale a {formatCOP(COP_PER_UNICOIN)} COP y la puedes usar para
                        comprar en tiendas del campus, pujar en subastas y participar en rifas. Los vendedores reciben sus ventas en UNICOIN al instante.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default WalletPage;
