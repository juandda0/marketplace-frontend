import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './CartContext';
import type { CartItem } from '../types';
import type { Product } from '../../marketplace/types';

const CART_KEY = 'unimarket:cart';

const readCart = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(readCart);

    useEffect(() => {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(items));
        } catch {
            // ignorado
        }
    }, [items]);

    const addItem = useCallback((product: Product, quantity = 1) => {
        setItems((list) => {
            const existing = list.find((i) => i.productId === product.id);
            if (existing) {
                return list.map((i) =>
                    i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i,
                );
            }
            const item: CartItem = {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: Math.min(quantity, product.stock),
                stock: product.stock,
                storeId: product.storeId,
                storeName: product.storeName,
                imageUrl: product.imageUrl,
                imageFit: product.imageFit,
                visual: product.visual,
            };
            return [...list, item];
        });
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        setItems((list) =>
            list
                .map((i) => (i.productId === productId ? { ...i, quantity: Math.min(quantity, i.stock) } : i))
                .filter((i) => i.quantity > 0),
        );
    }, []);

    const removeItem = useCallback((productId: number) => {
        setItems((list) => list.filter((i) => i.productId !== productId));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const value = useMemo(
        () => ({
            items,
            count: items.reduce((n, i) => n + i.quantity, 0),
            subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            addItem,
            updateQuantity,
            removeItem,
            clear,
        }),
        [items, addItem, updateQuantity, removeItem, clear],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
