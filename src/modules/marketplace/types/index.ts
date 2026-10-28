import type { Visual, VisualIconKey } from '../../../core/ui/visualIcons';

export type CategorySlug =
    | 'comida'
    | 'postres'
    | 'ropa'
    | 'accesorios'
    | 'tecnologia'
    | 'libros'
    | 'servicios';

export interface Category {
    slug: CategorySlug;
    name: string;
    icon: VisualIconKey;
    /** Color de acento de la categoría (hex). */
    color: string;
}

export interface Review {
    id: number;
    author: string;
    rating: number; // de 1 a 5
    comment: string;
    date: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    /** Foto real del producto. Si no existe se usa `visual`. */
    imageUrl?: string;
    images?: string[];
    /** `contain` para fotos con fondo transparente o blanco. */
    imageFit?: 'cover' | 'contain';
    visual: Visual;
    shippingFree: boolean;
    stock: number;
    description: string;
    category: CategorySlug;
    storeId: string;
    storeName: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
    /** Ej. "porción", "hora", "pack x6". */
    unit?: string;
    /** Ej. "Listo en 15 min". */
    readyIn: string;
    featured?: boolean;
    condition?: 'Nuevo' | 'Usado' | 'Como nuevo';
}

export interface Store {
    id: string;
    name: string;
    tagline: string;
    description: string;
    ownerName: string;
    ownerProgram: string;
    location: string;
    schedule: string;
    responseTime: string;
    rating: number;
    reviewCount: number;
    sales: number;
    followers: number;
    verified: boolean;
    categories: CategorySlug[];
    visual: Visual;
    since: string;
    acceptsUnicoin: boolean;
}

export interface ProductFilters {
    query?: string;
    category?: CategorySlug | null;
    storeId?: string;
    sort?: 'relevancia' | 'precio-asc' | 'precio-desc' | 'calificacion';
}
