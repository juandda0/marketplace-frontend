import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    title: string;
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
    return (
        <section className="container mx-auto px-24 py-8">
            <h2 className="text-2xl text-gray-500 mb-6">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;