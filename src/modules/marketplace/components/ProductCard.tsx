import { Link } from 'react-router-dom';
import { PiPlus, PiStarFill } from 'react-icons/pi';
import type { Product } from '../types';
import ProductVisual from '../../../core/ui/ProductVisual';
import { formatCOP } from '../../../core/utils/format';
import { useCart } from '../../cart/context/useCart';
import { useToast } from '../../../core/toast/useToast';

interface ProductCardProps {
    product: Product;
    className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
    const { addItem } = useCart();
    const toast = useToast();
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    const quickAdd = () => {
        addItem(product);
        toast({ title: 'Agregado al carrito', description: product.name });
    };

    return (
        <article className={`group ${className}`}>
            <div className="relative">
                <Link to={`/productos/${product.id}`} tabIndex={-1} aria-hidden className="block">
                    <ProductVisual
                        visual={product.visual}
                        imageUrl={product.imageUrl}
                        imageFit={product.imageFit}
                        alt={product.name}
                        className="aspect-square w-full rounded-2xl border border-line/50 transition duration-300 group-hover:brightness-110"
                    />
                    {discount > 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#06140D]/80 px-2 py-0.5 text-[11px] font-bold text-[#5BE3A1] backdrop-blur">
                            −{discount}%
                        </span>
                    )}
                </Link>
                <button
                    type="button"
                    onClick={quickAdd}
                    className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0B0F0D]/80 text-white shadow-float backdrop-blur transition hover:bg-primary hover:text-primary-fg active:scale-95"
                    aria-label={`Agregar ${product.name} al carrito`}
                >
                    <PiPlus className="h-4 w-4" aria-hidden />
                </button>
            </div>
            <Link to={`/productos/${product.id}`} className="mt-2.5 block rounded-lg px-0.5">
                <h3 className="line-clamp-2 min-h-[2.5em] text-[13.5px] font-medium leading-snug text-fg">{product.name}</h3>
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-subtle">
                    <span className="truncate">{product.storeName}</span>
                    <span aria-hidden>·</span>
                    <PiStarFill className="h-3 w-3 shrink-0 text-coin" aria-hidden />
                    <span className="text-muted">{product.rating.toLocaleString('es-CO', { minimumFractionDigits: 1 })}</span>
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-[15px] font-bold tracking-tight text-fg tabular">{formatCOP(product.price)}</span>
                    {product.originalPrice && (
                        <span className="text-xs text-subtle line-through tabular">{formatCOP(product.originalPrice)}</span>
                    )}
                </div>
            </Link>
        </article>
    );
};

export default ProductCard;
