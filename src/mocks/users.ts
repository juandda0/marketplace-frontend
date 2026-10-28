import type { Campus, User } from '../modules/auth/types';
import type { WalletTransaction } from '../modules/wallet/types';
import type { Order } from '../modules/cart/types';
import { products } from './catalog';

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const now = Date.now();

export const DEMO_EMAIL = 'demo@correo.unicordoba.edu.co';
export const DEMO_PASSWORD = 'unimarket2025';
export const DEMO_USER_ID = 'u-demo';
export const WELCOME_BONUS = 500;

export const campuses: Campus[] = [
    { id: 1, name: 'Montería · Campus Central' },
    { id: 2, name: 'Berástegui' },
    { id: 3, name: 'Lorica' },
    { id: 4, name: 'Sahagún' },
];

export const programs = [
    'Ingeniería de Sistemas',
    'Ingeniería Industrial',
    'Ingeniería Ambiental',
    'Ingeniería de Alimentos',
    'Ingeniería Mecánica',
    'Ingeniería Agronómica',
    'Medicina Veterinaria y Zootecnia',
    'Enfermería',
    'Bacteriología',
    'Administración en Finanzas y Negocios Internacionales',
    'Matemáticas',
    'Física',
    'Química',
    'Biología',
    'Estadística',
    'Geografía',
    'Licenciatura en Ciencias Naturales',
    'Licenciatura en Artes',
];

export const demoUser: User = {
    id: DEMO_USER_ID,
    name: 'Sofía',
    lastName: 'Martínez',
    email: DEMO_EMAIL,
    studentId: '1067 2021 0458',
    campusId: 1,
    program: 'Ingeniería de Sistemas',
    semester: 7,
    role: 'ENTREPRENEUR',
    storeId: 'la-cucharita',
    initialBalance: 2450,
    createdAt: now - 210 * DAY,
};

/** Historial "anterior" de la cuenta demo (ya incluido en `initialBalance`). */
export const demoTransactions: WalletTransaction[] = [
    { id: 't-s1', userId: DEMO_USER_ID, type: 'sale', title: 'Venta en La Cucharita', subtitle: 'Galletas x6 · Juliana R.', amount: 60, createdAt: now - 2 * HOUR },
    { id: 't-s2', userId: DEMO_USER_ID, type: 'purchase', title: 'Compra en El Arepazo', subtitle: 'Arepa rellena + jugo de corozo', amount: -100, createdAt: now - 5 * HOUR },
    { id: 't-s3', userId: DEMO_USER_ID, type: 'raffle', title: 'Boletos de rifa', subtitle: 'Combo gamer · 2 boletos', amount: -40, createdAt: now - 1 * DAY - 2 * HOUR },
    { id: 't-s4', userId: DEMO_USER_ID, type: 'recharge', title: 'Recarga con Nequi', subtitle: '$100.000 COP', amount: 1000, createdAt: now - 2 * DAY },
    { id: 't-s5', userId: DEMO_USER_ID, type: 'sale', title: 'Venta en La Cucharita', subtitle: 'Cheesecake x2 · Kevin A.', amount: 140, createdAt: now - 3 * DAY },
    { id: 't-s6', userId: DEMO_USER_ID, type: 'refund', title: 'Puja liberada', subtitle: 'Monitor 22" Full HD', amount: 2200, createdAt: now - 4 * DAY },
    { id: 't-s7', userId: DEMO_USER_ID, type: 'purchase', title: 'Compra en Apuntes Sinú', subtitle: 'Apuntes de Cálculo Diferencial', amount: -120, createdAt: now - 6 * DAY },
    { id: 't-s8', userId: DEMO_USER_ID, type: 'reward', title: 'Bono de bienvenida', subtitle: 'Gracias por unirte a Unimarket', amount: 500, createdAt: now - 210 * DAY },
];

const snapshot = (productId: number, quantity: number) => {
    const p = products.find((x) => x.id === productId)!;
    return {
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity,
        stock: p.stock,
        storeId: p.storeId,
        storeName: p.storeName,
        imageUrl: p.imageUrl,
        imageFit: p.imageFit,
        visual: p.visual,
    };
};

/** Pedidos anteriores de la cuenta demo. */
export const demoOrders: Order[] = [
    {
        id: 'UM-24817',
        userId: DEMO_USER_ID,
        items: [snapshot(1, 1), snapshot(4, 1)],
        subtotal: 10000,
        deliveryFee: 0,
        total: 10000,
        totalUnicoin: 100,
        paymentMethod: 'unicoin',
        deliveryMethod: 'pickup',
        deliveryPoint: 'Kiosco junto a la cafetería central',
        pickupCode: '4821',
        status: 'entregado',
        createdAt: now - 5 * HOUR,
    },
    {
        id: 'UM-24603',
        userId: DEMO_USER_ID,
        items: [snapshot(23, 1)],
        subtotal: 12000,
        deliveryFee: 0,
        total: 12000,
        totalUnicoin: 120,
        paymentMethod: 'unicoin',
        deliveryMethod: 'pickup',
        deliveryPoint: 'Fotocopiadora del bloque de Ciencias Básicas',
        pickupCode: '1937',
        status: 'entregado',
        createdAt: now - 6 * DAY,
    },
];
