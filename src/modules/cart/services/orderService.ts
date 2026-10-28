import type { CheckoutRequest, Order } from '../types';
import { delay, MockApiError, readDb, updateDb } from '../../../lib/mockDb';
import { demoOrders, DEMO_USER_ID } from '../../../mocks/users';
import { CAMPUS_DELIVERY_FEE } from '../../../lib/config';
import { copToUnicoin, formatNumber } from '../../../core/utils/format';
import { addMovement } from '../../wallet/services/walletService';

const allOrders = (userId?: string): Order[] => {
    const local = readDb().orders;
    const seeded = userId === undefined || userId === DEMO_USER_ID ? demoOrders : [];
    return [...local, ...seeded].sort((a, b) => b.createdAt - a.createdAt);
};

export const getOrders = (userId: string): Promise<Order[]> => delay(allOrders(userId).filter((o) => o.userId === userId));

export const getOrderById = (id: string): Promise<Order | undefined> => delay(allOrders().find((o) => o.id === id));

export const calculateTotals = (subtotal: number, deliveryMethod: CheckoutRequest['deliveryMethod']) => {
    const deliveryFee = deliveryMethod === 'campus' ? CAMPUS_DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    return { subtotal, deliveryFee, total, totalUnicoin: copToUnicoin(total) };
};

export const createOrder = async (request: CheckoutRequest): Promise<Order> => {
    await delay(null, 900);
    if (!request.items.length) throw new MockApiError('Tu carrito está vacío.');
    const subtotal = request.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totals = calculateTotals(subtotal, request.deliveryMethod);
    const id = `UM-${Math.floor(25000 + Math.random() * 74999)}`;

    if (request.paymentMethod === 'unicoin') {
        addMovement(request.userId, {
            type: 'purchase',
            title: `Pedido ${id}`,
            subtitle: `${formatNumber(request.items.reduce((n, i) => n + i.quantity, 0))} productos · ${[
                ...new Set(request.items.map((i) => i.storeName)),
            ].join(', ')}`,
            amount: -totals.totalUnicoin,
        });
    }

    const order: Order = {
        id,
        userId: request.userId,
        items: request.items,
        subtotal: totals.subtotal,
        deliveryFee: totals.deliveryFee,
        total: totals.total,
        totalUnicoin: request.paymentMethod === 'unicoin' ? totals.totalUnicoin : undefined,
        paymentMethod: request.paymentMethod,
        deliveryMethod: request.deliveryMethod,
        deliveryPoint: request.deliveryPoint,
        note: request.note,
        pickupCode: Math.floor(1000 + Math.random() * 8999).toString(),
        status: 'confirmado',
        createdAt: Date.now(),
    };
    updateDb((db) => ({ ...db, orders: [order, ...db.orders] }));
    return order;
};
