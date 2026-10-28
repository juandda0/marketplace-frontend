import Emoji from './Emoji';
import type { Visual } from './visualIcons';
import { tileVars } from '../utils/color';

interface ProductVisualProps {
    visual: Visual;
    imageUrl?: string;
    imageFit?: 'cover' | 'contain';
    alt: string;
    className?: string;
    /** Composición del arte (para galerías): 0 centrado, 1 inclinado, 2 detalle. */
    variant?: 0 | 1 | 2;
    /** Tamaño relativo del ícono principal. */
    iconScale?: 'sm' | 'md' | 'lg';
    /** `top` deja espacio libre abajo para superponer contenido. */
    iconPosition?: 'center' | 'top';
}

const iconSizes = { sm: 'h-[38%] w-auto aspect-square', md: 'h-[48%] w-auto aspect-square', lg: 'h-[54%] w-auto aspect-square' };
const discSizes = { sm: 'h-[58%] aspect-square', md: 'h-[70%] aspect-square', lg: 'h-[76%] aspect-square' };

/**
 * Muestra la foto del producto o, si no tiene, una baldosa de color sólido con
 * un ícono ilustrado. Nunca depende de imágenes externas.
 */
const ProductVisual = ({
    visual,
    imageUrl,
    imageFit = 'cover',
    alt,
    className = '',
    variant = 0,
    iconScale = 'md',
    iconPosition = 'center',
}: ProductVisualProps) => {
    if (imageUrl) {
        return (
            <div className={`relative overflow-hidden ${imageFit === 'contain' ? 'bg-[#eef1f5]' : 'bg-surface-2'} ${className}`}>
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

    if (variant === 2) {
        return (
            <div role="img" aria-label={alt} className={`visual-tile relative overflow-hidden ${className}`} style={tileVars(visual.color)}>
                <span className="visual-tile-accent absolute -bottom-[30%] -right-[30%] h-[110%] w-[110%] rounded-full" />
                <Emoji name={visual.icon} className="absolute -bottom-[8%] -right-[6%] h-[82%] w-[82%] rotate-[-10deg]" />
            </div>
        );
    }

    return (
        <div
            role="img"
            aria-label={alt}
            className={`visual-tile relative flex justify-center overflow-hidden ${iconPosition === 'top' ? 'items-start pt-[7%]' : 'items-center'} ${className}`}
            style={tileVars(visual.color)}
        >
            <span
                className={`visual-tile-accent absolute rounded-full ${discSizes[iconScale]} ${
                    variant === 1 ? '-left-[12%] -top-[14%]' : iconPosition === 'top' ? 'top-[2%]' : ''
                }`}
            />
            <Emoji name={visual.icon} className={`relative ${iconSizes[iconScale]} ${variant === 1 ? 'rotate-[12deg]' : ''}`} />
        </div>
    );
};

export default ProductVisual;
