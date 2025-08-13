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
    imageUrl: string;
    images?: string[];
    shippingFree: boolean;
    stock: number;
    description: string;
    category: string;
    storeName: string;
    rating: number; 
    reviewCount: number;
    reviews: Review[];
}