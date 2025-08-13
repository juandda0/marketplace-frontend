import React, { useState } from 'react';
import type { Product } from '../types';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const formatPrice = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="flex flex-col space-y-4 p-4 border rounded-lg bg-white">
            <p className="text-sm text-gray-500">Vendido por <span className="text-blue-600 font-semibold">{product.storeName}</span></p>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            
            <div className="flex items-center space-x-2 text-sm">
                <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
                <span className="text-blue-600 hover:underline cursor-pointer">{product.reviewCount} opiniones</span>
            </div>

            {product.originalPrice && <p className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>}
            <p className="text-4xl font-light text-gray-900">{formatPrice(product.price)}</p>

            <div className="text-green-600 font-semibold">
                {product.shippingFree ? 'Llega gratis el viernes' : 'Calcular costo de envío'}
            </div>

            <p className="font-bold text-lg">Stock disponible</p>
            <p className="text-gray-600">Cantidad: <span className="font-bold">{product.stock} disponibles</span></p>

            <div className="flex items-center space-x-3">
                <label htmlFor="quantity">Cantidad:</label>
                <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="p-2 border rounded-md">
                    {[...Array(product.stock > 10 ? 10 : product.stock).keys()].map(i => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
            
            <button className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Comprar ahora</button>
            <button className="w-full py-3 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-300">Agregar al carrito</button>
        </div>
    );
};

export default ProductInfo;