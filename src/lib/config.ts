/** La app funciona 100 % offline con datos de ejemplo salvo que se desactive explícitamente. */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

/** Tasa fija de la moneda interna: 1 UNICOIN = $100 COP. */
export const COP_PER_UNICOIN = 100;

/** Costo de entrega dentro del campus (COP). */
export const CAMPUS_DELIVERY_FEE = 2000;
