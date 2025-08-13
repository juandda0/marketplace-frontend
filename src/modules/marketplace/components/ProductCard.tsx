import React from 'react';
import { Link } from 'react-router-dom'; // IMPORTAR LINK
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
    };

    return (
        // ENVOLVEMOS TODO EN UN LINK
        <Link to={`/products/${product.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4 border-t">
                {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                <h3 className="text-2xl font-bold text-gray-800">{formatPrice(product.price)}</h3>
                {product.shippingFree && (
                    <p className="text-green-600 font-semibold text-sm mt-1">Envío gratis</p>
                )}
                <p className="text-gray-600 text-sm mt-2 truncate">{product.name}</p>
            </div>
        </Link>
    );
};

export default ProductCard;