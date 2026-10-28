import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import deliveryImg from '../../../assets/hero/delivery.webp';

const HeroSection = () => (
    <section className="relative isolate overflow-hidden rounded-3xl bg-primary p-5 md:p-8">
        <span className="absolute -bottom-16 -right-10 -z-10 h-56 w-56 rounded-full bg-[#1D4ED8] md:right-6 md:h-72 md:w-72" aria-hidden />
        <div className="max-w-[60%] md:max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#BFDBFE]">Entre clases</p>
            <h2 className="mt-1.5 text-balance text-[22px] font-bold leading-[1.15] tracking-tight text-white md:text-4xl">
                Tu mercado, tu universidad.
            </h2>
            <p className="mt-2 text-[13px] leading-snug text-[#DBEAFE] md:text-base">
                Pide a emprendedores de la U y recoge en tu bloque sin hacer fila.
            </p>
            <Link
                to="/catalogo"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#EFF6FF]"
            >
                Explorar <PiArrowRight aria-hidden />
            </Link>
        </div>
        <img
            src={deliveryImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -right-3 h-[118%] max-h-[230px] w-auto md:right-10 md:max-h-[300px]"
        />
    </section>
);

export default HeroSection;
