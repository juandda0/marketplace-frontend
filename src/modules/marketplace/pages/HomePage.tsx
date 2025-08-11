import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProducts } from '../services/productService';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-100">
            <HeroSection />
            <ProductGrid title="Basado en tu última visita" products={products} />
        </div>
    );
};

export default HomePage;