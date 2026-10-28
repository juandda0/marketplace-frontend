import type { Category, Product, ProductFilters } from '../types';
import { categories, products } from '../../../mocks/catalog';
import { delay } from '../../../lib/mockDb';

const normalize = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');

export const getCategories = (): Promise<Category[]> => delay(categories, 120);

export const filterProducts = (list: Product[], filters: ProductFilters = {}): Product[] => {
    const query = normalize(filters.query?.trim() ?? '');
    let result = list.filter((p) => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.storeId && p.storeId !== filters.storeId) return false;
        if (!query) return true;
        const haystack = normalize(`${p.name} ${p.storeName} ${p.description} ${p.category}`);
        return query.split(/\s+/).every((word) => haystack.includes(word));
    });

    switch (filters.sort) {
        case 'precio-asc':
            result = [...result].sort((a, b) => a.price - b.price);
            break;
        case 'precio-desc':
            result = [...result].sort((a, b) => b.price - a.price);
            break;
        case 'calificacion':
            result = [...result].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
            break;
        default:
            break;
    }
    return result;
};

export const getProducts = (filters?: ProductFilters): Promise<Product[]> => delay(filterProducts(products, filters));

export const getFeaturedProducts = (): Promise<Product[]> => delay(products.filter((p) => p.featured));

export const getProductById = (id: number): Promise<Product | undefined> => {
    const found = products.find((p) => p.id === id);
    if (!found) return delay(undefined);
    // Las fotos reales se muestran solas; los productos sin foto usan variaciones del arte generado.
    return delay({ ...found, images: found.imageUrl ? [found.imageUrl] : [] });
};

export const getProductsByStore = (storeId: string): Promise<Product[]> =>
    delay(products.filter((p) => p.storeId === storeId));

export const getRelatedProducts = (product: Product, limit = 6): Promise<Product[]> => {
    const sameStore = products.filter((p) => p.storeId === product.storeId && p.id !== product.id);
    const sameCategory = products.filter(
        (p) => p.category === product.category && p.id !== product.id && p.storeId !== product.storeId,
    );
    return delay([...sameStore, ...sameCategory].slice(0, limit));
};
