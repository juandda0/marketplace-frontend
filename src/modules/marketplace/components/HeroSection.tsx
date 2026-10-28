import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import deliveryImg from '../../../assets/hero/delivery.webp';

const HeroSection = () => (
    <section className="relative isolate overflow-hidden rounded-3xl border border-primary/20 bg-[#0B2A1C] p-5 md:p-8">
        <div
            className="absolute inset-0 -z-10"
            style={{
                background:
                    'radial-gradient(120% 120% at 0% 0%, rgba(91,227,161,0.45) 0%, transparent 55%), radial-gradient(90% 90% at 100% 100%, rgba(246,188,66,0.28) 0%, transparent 60%), linear-gradient(135deg, #0F3A27 0%, #082016 100%)',
            }}
        />
        <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1.2px)',
                backgroundSize: '16px 16px',
                maskImage: 'linear-gradient(90deg, black, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(90deg, black, transparent 70%)',
            }}
        />
        <div className="max-w-[60%] md:max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7FF0B8]">Entre clases</p>
            <h2 className="mt-1.5 text-balance text-[22px] font-bold leading-[1.15] tracking-tight text-white md:text-4xl">
                Tu mercado, tu universidad.
            </h2>
            <p className="mt-2 text-[13px] leading-snug text-white/75 md:text-base">
                Pide a emprendedores de la U y recoge en tu bloque sin hacer fila.
            </p>
            <Link
                to="/catalogo"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#06140D] transition hover:bg-[#E7FFF2]"
            >
                Explorar <PiArrowRight aria-hidden />
            </Link>
        </div>
        <img
            src={deliveryImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -right-3 h-[118%] max-h-[230px] w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] md:right-10 md:max-h-[300px]"
        />
    </section>
);

export default HeroSection;
