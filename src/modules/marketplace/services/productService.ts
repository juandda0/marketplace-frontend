import type { Product } from '../types';
import galletaImg from '../../../assets/mocks/mockGalleta.jpg'
import stikersImg from '../../../assets/mocks/stikerMock.jpg'
import arepaImg from '../../../assets/mocks/arepamock.jpg'
import camisaImg from '../../../assets/mocks/camsiaMock.png'
import salchipapaImg from '../../../assets/mocks/salchipapaMock.jpg'

// Tus datos de ejemplo
const mockProducts: Product[] = [
    { id: 1, name: 'Gallenitas de chocolate', price: 3000, originalPrice: 5000, imageUrl: galletaImg, shippingFree: true, stock: 15, category: "Postres", storeName: "Galletas La Cucharita", rating: 4, reviewCount: 8, description: "Deliciosas galletas caseras con chips de chocolate.", reviews: [] },
    { id: 2, name: 'Stickers de Sukuna', price: 1000, imageUrl: stikersImg, shippingFree: true, stock: 50, category: "Accesorios", storeName: "Anime Fans Store", rating: 5, reviewCount: 22, description: "Stickers de alta calidad del rey de las maldiciones, Sukuna.", reviews: [] },
    { id: 3, name: 'Camiseta estampada', price: 15000, originalPrice: 20000, imageUrl: camisaImg, shippingFree: true, stock: 20, category: "Ropa", storeName: "Urban Style", rating: 4, reviewCount: 12, description: "Camiseta de algodón con estampado único.", reviews: [] },
    { id: 4, name: 'Arepa rellena', price: 15000, imageUrl: arepaImg, shippingFree: false, stock: 30, category: "Comida", storeName: "El Arepazo", rating: 5, reviewCount: 45, description: "La mejor arepa rellena de la universidad, con todo.", reviews: [] },
    { id: 5, name: 'Salchipapa', price: 5000, imageUrl: salchipapaImg, shippingFree: false, stock: 25, category: "Comida", storeName: "El Arepazo", rating: 4, reviewCount: 30, description: "Porción personal de salchipapa con queso y salsas.", reviews: [] },
];

// Función para obtener todos los productos (sin cambios)
export const getProducts = (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 500);
    });
};

// Función para obtener un producto por ID (ACTUALIZADA)
export const getProductById = (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        // 1. Busca el producto en tu arreglo de mocks
        const foundProduct = mockProducts.find(p => p.id === id);

        if (foundProduct) {
             // 2. Si lo encuentra, le añade detalles adicionales para la página de detalle
            const detailedProduct = {
                ...foundProduct,
                images: [
                    foundProduct.imageUrl,
                    'https://via.placeholder.com/600x600/343a40/FFFFFF?text=Vista+2',
                    'https://via.placeholder.com/600x600/343a40/FFFFFF?text=Vista+3',
                ],
                reviews: [
                    { id: 1, author: 'Juan D.', rating: 5, comment: '¡Excelente producto, recomendado!', date: '10 de Ago, 2025' },
                    { id: 2, author: 'Maria P.', rating: 4, comment: 'Muy bueno, llegó rápido.', date: '09 de Ago, 2025' },
                ],
            };
            resolve(detailedProduct);
        } else {
            resolve(undefined); // No se encontró el producto
        }
    });
};