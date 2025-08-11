import type { Product } from '../types';
import galletaImg from '../../../assets/mocks/mockGalleta.jpg'
import stikersImg from '../../../assets/mocks/stikerMock.jpg'
import arepaImg from '../../../assets/mocks/arepamock.jpg'
import camisaImg from '../../../assets/mocks/camsiaMock.png'
import salchipapaImg from '../../../assets/mocks/salchipapaMock.jpg'
// En el futuro, esto usará 'apiClient' para hacer una llamada real al backend.
// import apiClient from '../../../lib/axios';

// Datos de ejemplo para simular la respuesta de la API
const mockProducts: Product[] = [
    { id: 1, name: 'Gallenitas de chocolate', price: 3000, originalPrice: 500, imageUrl: galletaImg, shippingFree: true },
    { id: 2, name: 'Sikers sukuna', price: 1000, imageUrl: stikersImg, shippingFree: true },
    { id: 3, name: 'Camiseta estampada  ', price: 15000, originalPrice: 20000, imageUrl: camisaImg, shippingFree: true },
    { id: 4, name: 'Arepa rellena', price: 15000, imageUrl: arepaImg, shippingFree: true },
    { id: 5, name: 'Salchipapa', price: 5000, imageUrl: salchipapaImg, shippingFree: true },
];

export const getProducts = (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 500); // Simula un retraso de red
    });
};