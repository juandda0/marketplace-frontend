import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowDownLeft, PiArrowUpRight, PiGavel, PiPlusBold, PiTicket } from 'react-icons/pi';
import { useWallet } from '../context/useWallet';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import TransactionItem from '../components/TransactionItem';
import { UnicoinIcon } from '../../../core/ui/Unicoin';
import Emoji from '../../../core/ui/Emoji';
import EmptyState from '../../../core/ui/EmptyState';
import { ListSkeleton } from '../../../core/ui/Skeleton';
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
                className="relative isolate overflow-hidden rounded-[28px] bg-[#1E3A8A] p-5"
                aria-label="Saldo UNICOIN"
            >
                <span className="absolute -right-12 -top-12 -z-10 h-44 w-44 rounded-full bg-[#1E40AF]" aria-hidden />
                <Emoji name="money-bag" className="absolute right-5 top-9 -z-10 h-16 w-16" />
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[13px] font-medium text-[#DBEAFE]">
                        <UnicoinIcon className="h-5 w-5" /> UNICOIN
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-[#93C5FD]">UM · {user.id.slice(-4).toUpperCase()}</p>
                </div>
                <p className="mt-5 text-[13px] text-[#BFDBFE]">Saldo disponible</p>
                {loading ? (
                    <span className="mt-1 block h-11 w-48 rounded-xl bg-[#1E40AF]" />
                ) : (
                    <p className="mt-0.5 text-[42px] font-bold leading-none tracking-tight text-white tabular">
                        {formatNumber(balance)}
                        <span className="ml-1.5 text-lg font-semibold text-[#FBBF24]">UC</span>
                    </p>
                )}
                <p className="mt-1.5 text-[13px] text-[#BFDBFE]">≈ {formatCOP(unicoinToCop(balance))} COP</p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                    <Link
                        to="/billetera/recargar"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#F59E0B] py-3 text-[12px] font-semibold text-[#1C1003] transition-colors hover:bg-[#FBBF24]"
                    >
                        <PiPlusBold className="h-5 w-5" aria-hidden /> Recargar
                    </Link>
                    <Link
                        to="/subastas"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#1E40AF] py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                    >
                        <PiGavel className="h-5 w-5" aria-hidden /> Pujar
                    </Link>
                    <Link
                        to="/rifas"
                        className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#1E40AF] py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                    >
                        <PiTicket className="h-5 w-5" aria-hidden /> Rifas
                    </Link>
                </div>
            </section>

            {/* Resumen del mes */}
            <section className="mt-4 grid grid-cols-2 gap-3">
                <div className="card p-3.5">
                    <p className="flex items-center gap-1.5 text-xs text-subtle">
                        <PiArrowDownLeft className="h-4 w-4 text-success-ink" aria-hidden /> Ingresos · 30 días
                    </p>
                    <p className="mt-1 text-lg font-bold text-success-ink tabular">+{formatNumber(income)} UC</p>
                </div>
                <div className="card p-3.5">
                    <p className="flex items-center gap-1.5 text-xs text-subtle">
                        <PiArrowUpRight className="h-4 w-4 text-auction-ink" aria-hidden /> Gastos · 30 días
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
                    <ul className="card divide-y divide-line">
                        {list.map((tx) => (
                            <TransactionItem key={tx.id} tx={tx} />
                        ))}
                    </ul>
                ) : (
                    <EmptyState icon={<Emoji name="receipt" />} title="Sin movimientos" description="Aquí verás tus recargas, compras, pujas y boletos." />
                )}
            </section>

            <section className="mt-6 flex gap-3 rounded-2xl border border-line bg-surface-2 p-4 text-[13px]">
                <Emoji name="money-bag" className="h-7 w-7" />
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
