import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    className?: string;
}

const ProductGrid = ({ products, className = '' }: ProductGridProps) => (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-4 lg:grid-cols-4 ${className}`}>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
);

export default ProductGrid;
