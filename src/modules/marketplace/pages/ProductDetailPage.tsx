import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProductById } from '../services/productService';
import ImageGallery from '../components/ImageGallery';
import ProductInfo from '../components/ProductInfo';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                setLoading(true);
                const data = await getProductById(Number(productId));
                if (data) {
                    setProduct(data);
                }
                setLoading(false);
            };
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <div className="text-center py-20">Cargando producto...</div>;
    }

    if (!product) {
        return <div className="text-center py-20">Producto no encontrado.</div>;
    }

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <ImageGallery images={product.images || [product.imageUrl]} productName={product.name} />
                        </div>
                        <div>
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                    <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>
                
                 {/* Aquí irían los componentes de Reseñas y Productos Relacionados */}
            </div>
        </div>
    );
};

export default ProductDetailPage;