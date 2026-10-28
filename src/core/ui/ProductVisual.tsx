import { visualIcons } from './visualIcons';
import type { Visual } from './visualIcons';

interface ProductVisualProps {
    visual: Visual;
    imageUrl?: string;
    imageFit?: 'cover' | 'contain';
    alt: string;
    className?: string;
    /** Composición del arte generado (para galerías): 0 centrado, 1 inclinado, 2 detalle. */
    variant?: 0 | 1 | 2;
    /** Tamaño relativo del ícono principal. */
    iconScale?: 'sm' | 'md' | 'lg';
    /** `top` deja espacio libre abajo para superponer texto. */
    iconPosition?: 'center' | 'top';
}

const iconSizes = { sm: 'h-[34%] w-[34%]', md: 'h-[42%] w-[42%]', lg: 'h-[48%] w-[48%]' };

/**
 * Muestra la foto del producto o, si no tiene, un arte generado con degradado e ícono.
 * Nunca depende de imágenes externas.
 */
const ProductVisual = ({ visual, imageUrl, imageFit = 'cover', alt, className = '', variant = 0, iconScale = 'md', iconPosition = 'center' }: ProductVisualProps) => {
    if (imageUrl) {
        return (
            <div className={`relative overflow-hidden ${imageFit === 'contain' ? 'bg-[#EEF1EF]' : 'bg-surface-2'} ${className}`}>
                <img
                    src={imageUrl}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${imageFit === 'contain' ? 'object-contain p-[8%]' : 'object-cover'}`}
                />
            </div>
        );
    }

    const Icon = visualIcons[visual.icon];
    const angle = variant === 1 ? 200 : 145;

    return (
        <div
            role="img"
            aria-label={alt}
            className={`relative isolate overflow-hidden ${className}`}
            style={{ background: `linear-gradient(${angle}deg, ${visual.from} 0%, ${visual.to} 100%)` }}
        >
            {/* Luz suave */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        variant === 1
                            ? 'radial-gradient(90% 70% at 85% 15%, rgba(255,255,255,0.32), transparent 60%)'
                            : 'radial-gradient(110% 80% at 12% 0%, rgba(255,255,255,0.34), transparent 55%)',
                }}
            />
            {/* Textura de puntos */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.16]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.2px)',
                    backgroundSize: variant === 2 ? '10px 10px' : '14px 14px',
                    maskImage: 'linear-gradient(160deg, black 10%, transparent 75%)',
                    WebkitMaskImage: 'linear-gradient(160deg, black 10%, transparent 75%)',
                }}
            />
            {variant === 2 ? (
                <Icon className="absolute -bottom-[18%] -right-[12%] h-[95%] w-[95%] rotate-[-14deg] text-white/90 drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]" aria-hidden />
            ) : (
                <>
                    <Icon
                        className={`absolute h-[78%] w-[78%] text-white/[0.09] ${variant === 1 ? '-left-[16%] -top-[12%] rotate-[18deg]' : '-bottom-[16%] -right-[14%] rotate-[-16deg]'}`}
                        aria-hidden
                    />
                    <div className={`absolute inset-0 flex justify-center ${iconPosition === 'top' ? 'items-start pt-[9%]' : 'items-center'}`}>
                        <Icon
                            className={`${iconSizes[iconScale]} text-white drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)] ${variant === 1 ? 'rotate-[-8deg]' : ''}`}
                            aria-hidden
                        />
                    </div>
                </>
            )}
            {/* Brillo inferior */}
            <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
    );
};

export default ProductVisual;
