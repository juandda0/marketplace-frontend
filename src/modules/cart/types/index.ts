import type { Visual } from '../../../core/ui/visualIcons';

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    storeId: string;
    storeName: string;
    imageUrl?: string;
    imageFit?: 'cover' | 'contain';
    visual: Visual;
}

export type DeliveryMethod = 'pickup' | 'campus';
export type PaymentMethod = 'unicoin' | 'nequi' | 'efectivo';
export type OrderStatus = 'confirmado' | 'preparando' | 'listo' | 'entregado';

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    /** Total en UNICOIN cuando se paga con la billetera. */
    totalUnicoin?: number;
    paymentMethod: PaymentMethod;
    deliveryMethod: DeliveryMethod;
    deliveryPoint: string;
    note?: string;
    pickupCode: string;
    status: OrderStatus;
    createdAt: number;
}

export interface CheckoutRequest {
    userId: string;
    items: CartItem[];
    paymentMethod: PaymentMethod;
    deliveryMethod: DeliveryMethod;
    deliveryPoint: string;
    note?: string;
}
