import type { ReactNode } from 'react';
import { PiGavel, PiStorefront, PiTicket, PiTrophyFill } from 'react-icons/pi';
import Logo from '../../../core/ui/Logo';
import { UnicoinIcon } from '../../../core/ui/Unicoin';
import deliveryImg from '../../../assets/hero/delivery.webp';

const features = [
    { icon: <PiStorefront className="h-5 w-5 text-primary" aria-hidden />, text: 'Catálogos de emprendedores de la U' },
    { icon: <PiGavel className="h-5 w-5 text-auction" aria-hidden />, text: 'Subastas en vivo' },
    { icon: <PiTicket className="h-5 w-5 text-raffle" aria-hidden />, text: 'Rifas de causas estudiantiles' },
    { icon: <UnicoinIcon className="h-5 w-5" />, text: 'UNICOIN, la moneda del campus' },
];

const AuthLayout = ({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) => (
    <div className="relative isolate min-h-dvh overflow-hidden bg-bg text-fg md:grid md:grid-cols-2">
        <div
            className="pointer-events-none absolute inset-0 -z-10 md:hidden"
            style={{
                background:
                    'radial-gradient(80% 45% at 0% 0%, rgb(var(--primary) / 0.22), transparent 70%), radial-gradient(60% 35% at 100% 0%, rgb(var(--coin) / 0.14), transparent 70%)',
            }}
        />

        {/* Panel de marca (escritorio) */}
        <aside className="relative hidden overflow-hidden border-r border-line/60 md:flex md:flex-col md:justify-between md:p-12">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        'radial-gradient(90% 70% at 0% 0%, rgba(91,227,161,0.35), transparent 60%), radial-gradient(70% 60% at 100% 100%, rgba(246,188,66,0.25), transparent 60%), linear-gradient(135deg, #0F3A27, #07150F)',
                }}
            />
            <Logo className="[&_span]:text-white" />
            <div>
                <h2 className="max-w-md text-5xl font-bold leading-[1.05] tracking-tight text-white">Tu mercado, tu universidad.</h2>
                <ul className="mt-8 space-y-3">
                    {features.map((f) => (
                        <li key={f.text} className="flex items-center gap-3 text-[15px] text-white/80">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">{f.icon}</span>
                            {f.text}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/60">
                <PiTrophyFill className="h-4 w-4 text-[#F6BC42]" aria-hidden /> Proyecto ganador de TechU Montería 2025
            </p>
            <img src={deliveryImg} alt="" aria-hidden className="pointer-events-none absolute -right-8 bottom-16 w-64 opacity-90 drop-shadow-2xl" />
        </aside>

        {/* Formulario */}
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-10 md:justify-center md:pt-8">
            <div className="md:hidden">
                <Logo />
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-coin/25 bg-coin/10 px-2.5 py-1 text-[11px] font-semibold text-coin">
                    <PiTrophyFill className="h-3.5 w-3.5" aria-hidden /> Ganador TechU Montería 2025
                </span>
            </div>
            <h1 className="mt-6 text-[28px] font-bold leading-tight tracking-tight md:mt-0">{title}</h1>
            <p className="mt-1 text-[14px] text-muted">{subtitle}</p>
            <div className="mt-7">{children}</div>
        </main>
    </div>
);

export default AuthLayout;
