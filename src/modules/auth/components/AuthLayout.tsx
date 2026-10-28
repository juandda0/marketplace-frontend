import type { ReactNode } from 'react';
import { PiGavel } from 'react-icons/pi';
import Logo from '../../../core/ui/Logo';
import Emoji from '../../../core/ui/Emoji';
import { UnicoinIcon } from '../../../core/ui/Unicoin';

const features = [
    { icon: <Emoji name="convenience-store" className="h-6 w-6" />, text: 'Catálogos de emprendedores de la U' },
    { icon: <PiGavel className="h-5 w-5 text-[#FDBA8C]" aria-hidden />, text: 'Subastas en vivo' },
    { icon: <Emoji name="ticket" className="h-6 w-6" />, text: 'Rifas de causas estudiantiles' },
    { icon: <UnicoinIcon className="h-6 w-6" />, text: 'UNICOIN, la moneda del campus' },
];

const AuthLayout = ({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) => (
    <div className="relative isolate min-h-dvh overflow-hidden bg-bg text-fg md:grid md:grid-cols-2">
        {/* Panel de marca (escritorio) */}
        <aside className="relative hidden overflow-hidden bg-[#1E3A8A] md:flex md:flex-col md:justify-between md:p-12">
            <span className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#1E40AF]" aria-hidden />
            <Logo inverted className="relative" />
            <div className="relative">
                <h2 className="max-w-md text-5xl font-bold leading-[1.05] tracking-tight text-white">Tu mercado, tu universidad.</h2>
                <ul className="mt-8 space-y-3">
                    {features.map((f) => (
                        <li key={f.text} className="flex items-center gap-3 text-[15px] text-[#DBEAFE]">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E40AF]">{f.icon}</span>
                            {f.text}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="relative flex items-center gap-2 text-sm text-[#DBEAFE]">
                <Emoji name="trophy" className="h-5 w-5" /> Proyecto ganador de TechU Montería 2025
            </p>
        </aside>

        {/* Formulario */}
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-10 md:justify-center md:pt-8">
            <div className="md:hidden">
                <Logo />
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-coin-line bg-coin-soft px-2.5 py-1 text-[11px] font-semibold text-coin-ink">
                    <Emoji name="trophy" className="h-4 w-4" /> Ganador TechU Montería 2025
                </span>
            </div>
            <h1 className="mt-6 text-[28px] font-bold leading-tight tracking-tight md:mt-0">{title}</h1>
            <p className="mt-1 text-[14px] text-muted">{subtitle}</p>
            <div className="mt-7">{children}</div>
        </main>
    </div>
);

export default AuthLayout;
