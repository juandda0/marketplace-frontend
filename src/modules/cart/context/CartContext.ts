import { createContext } from 'react';
import type { CartItem } from '../types';
import type { Product } from '../../marketplace/types';

export interface CartContextType {
    items: CartItem[];
    count: number;
    subtotal: number;
    addItem: (product: Product, quantity?: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
