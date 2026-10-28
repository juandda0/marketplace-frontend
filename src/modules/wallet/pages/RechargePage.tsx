import { useState } from 'react';
import type { IconType } from 'react-icons';
import { PiBank, PiCheckBold, PiDeviceMobile, PiGift, PiMoney, PiShieldCheck } from 'react-icons/pi';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import { useWallet } from '../context/useWallet';
import { recharge, RECHARGE_BONUS_FROM, rechargeBonus, rechargeMethodLabels, rechargePackages } from '../services/walletService';
import type { RechargeMethod } from '../types';
import Button, { ButtonLink } from '../../../core/ui/Button';
import StickyActionBar from '../../../core/ui/StickyActionBar';
import { CoinAmount, UnicoinIcon } from '../../../core/ui/Unicoin';
import Emoji from '../../../core/ui/Emoji';
import { errorMessage } from '../../../lib/mockDb';
import { formatCOP, formatNumber, unicoinToCop } from '../../../core/utils/format';

const methods: { value: RechargeMethod; icon: IconType; detail: string; color: string }[] = [
    { value: 'nequi', icon: PiDeviceMobile, detail: 'Pago inmediato desde tu celular', color: '#BE185D' },
    { value: 'daviplata', icon: PiDeviceMobile, detail: 'Pago inmediato desde tu celular', color: '#B91C1C' },
    { value: 'pse', icon: PiBank, detail: 'Débito desde tu cuenta bancaria', color: '#2563EB' },
    { value: 'efectivo', icon: PiMoney, detail: 'Bienestar Universitario, lun a vie', color: '#15803D' },
];

const RechargePage = () => {
    const user = useCurrentUser();
    const { balance } = useWallet();
    const [amount, setAmount] = useState(500);
    const [custom, setCustom] = useState('');
    const [method, setMethod] = useState<RechargeMethod>('nequi');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<{ amount: number; bonus: number; balance: number } | null>(null);

    const bonus = rechargeBonus(amount);

    const pay = async () => {
        setError('');
        setSubmitting(true);
        try {
            const res = await recharge(user.id, amount, method);
            setResult({ amount, bonus: res.bonus, balance: res.balance });
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setSubmitting(false);
        }
    };

    if (result) {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center pt-8 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-coin-soft">
                    <Emoji name="party-popper" className="absolute -right-2 -top-1 h-10 w-10" />
                    <UnicoinIcon className="relative h-20 w-20 animate-pop" />
                </div>
                <h1 className="mt-6 text-2xl font-bold tracking-tight">¡Recarga exitosa!</h1>
                <p className="mt-1 text-[14px] text-muted">
                    Agregamos <span className="font-semibold text-coin-ink">{formatNumber(result.amount + result.bonus)} UC</span> a tu billetera
                    {result.bonus > 0 && ` (incluye ${formatNumber(result.bonus)} UC de bono)`}.
                </p>
                <div className="card mt-6 w-full divide-y divide-line text-left text-[14px]">
                    <div className="flex justify-between p-3.5">
                        <span className="text-muted">Pagaste</span>
                        <span className="font-semibold tabular">{formatCOP(unicoinToCop(result.amount))}</span>
                    </div>
                    <div className="flex justify-between p-3.5">
                        <span className="text-muted">Medio de pago</span>
                        <span className="font-semibold">{rechargeMethodLabels[method]}</span>
                    </div>
                    <div className="flex justify-between p-3.5">
                        <span className="text-muted">Nuevo saldo</span>
                        <CoinAmount amount={result.balance} suffix className="font-bold text-coin-ink" />
                    </div>
                </div>
                <div className="mt-6 grid w-full gap-2">
                    <ButtonLink to="/billetera" size="lg" block>
                        Ir a mi billetera
                    </ButtonLink>
                    <ButtonLink to="/subastas" variant="ghost" size="lg" block>
                        Ver subastas en vivo
                    </ButtonLink>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="hidden text-3xl font-bold tracking-tight md:block">Recargar UNICOIN</h1>
                    <p className="text-[11px] text-subtle md:hidden">Tasa fija</p>
                    <p className="text-[15px] font-semibold text-fg md:mt-0.5 md:text-[13px] md:font-normal md:text-muted">1 UC = {formatCOP(100)} COP</p>
                </div>
                <div className="text-right">
                    <p className="text-[11px] text-subtle">Saldo actual</p>
                    <CoinAmount amount={balance} className="text-[15px] font-semibold text-coin-ink" />
                </div>
            </div>

            {/* Paquetes */}
            <section className="mt-5">
                <h2 className="mb-2.5 text-[13px] font-semibold text-muted">¿Cuánto quieres recargar?</h2>
                <div className="grid grid-cols-3 gap-2">
                    {rechargePackages.map((value) => {
                        const active = amount === value && !custom;
                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => {
                                    setAmount(value);
                                    setCustom('');
                                }}
                                aria-pressed={active}
                                className={`relative rounded-2xl border p-3 text-left transition ${
                                    active ? 'border-coin bg-coin-soft ring-4 ring-coin-line' : 'border-line bg-surface hover:border-coin-line'
                                }`}
                            >
                                {value >= RECHARGE_BONUS_FROM && (
                                    <span className="absolute -top-2 right-2 rounded-full bg-coin px-1.5 py-0.5 text-[10px] font-bold text-coin-fg">+5%</span>
                                )}
                                <CoinAmount amount={value} className="text-[17px] font-bold" />
                                <p className="mt-0.5 text-[12px] text-subtle tabular">{formatCOP(unicoinToCop(value))}</p>
                            </button>
                        );
                    })}
                </div>
                <label className="mt-3 block">
                    <span className="label">Otro valor (UC)</span>
                    <div className="relative">
                        <UnicoinIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
                        <input
                            type="number"
                            inputMode="numeric"
                            min={50}
                            max={20000}
                            placeholder="Ej. 750"
                            value={custom}
                            onChange={(e) => {
                                setCustom(e.target.value);
                                setAmount(Number(e.target.value) || 0);
                            }}
                            className="input pl-12"
                        />
                    </div>
                </label>
            </section>

            {/* Medios de pago */}
            <section className="mt-6">
                <h2 className="mb-2.5 text-[13px] font-semibold text-muted">Medio de pago</h2>
                <div className="space-y-2" role="radiogroup" aria-label="Medio de pago">
                    {methods.map(({ value, icon: Icon, detail, color }) => {
                        const active = method === value;
                        return (
                            <button
                                key={value}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                onClick={() => setMethod(value)}
                                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                                    active ? 'border-primary bg-primary-soft' : 'border-line bg-surface'
                                }`}
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: color, color: '#FFFFFF' }}>
                                    <Icon className="h-5 w-5" aria-hidden />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[14px] font-semibold text-fg">{rechargeMethodLabels[value]}</span>
                                    <span className="block truncate text-xs text-subtle">{detail}</span>
                                </span>
                                <span
                                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                        active ? 'border-primary bg-primary text-primary-fg' : 'border-line'
                                    }`}
                                >
                                    {active && <PiCheckBold className="h-3 w-3" aria-hidden />}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Resumen */}
            <section className="card mt-6 divide-y divide-line text-[14px]">
                <div className="flex justify-between p-3.5">
                    <span className="text-muted">Recibes</span>
                    <CoinAmount amount={amount} suffix className="font-semibold" />
                </div>
                {bonus > 0 && (
                    <div className="flex justify-between p-3.5">
                        <span className="flex items-center gap-1.5 text-muted">
                            <PiGift className="h-4 w-4 text-coin-ink" aria-hidden /> Bono por recarga
                        </span>
                        <span className="font-semibold text-coin-ink">+{formatNumber(bonus)} UC</span>
                    </div>
                )}
                <div className="flex justify-between p-3.5">
                    <span className="text-muted">Total a pagar</span>
                    <span className="text-[16px] font-bold tabular">{formatCOP(unicoinToCop(amount))}</span>
                </div>
            </section>

            <p className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
                <PiShieldCheck className="h-4 w-4 text-primary-ink" aria-hidden />
                Modo demo: no se realiza ningún cobro real.
            </p>
            {error && <p className="mt-3 text-[13px] text-danger-ink" role="alert">{error}</p>}

            <StickyActionBar>
                <Button variant="coin" size="lg" block onClick={pay} loading={submitting} disabled={amount < 50}>
                    {submitting ? 'Procesando pago…' : `Pagar ${formatCOP(unicoinToCop(amount))}`}
                </Button>
            </StickyActionBar>
        </div>
    );
};

export default RechargePage;
