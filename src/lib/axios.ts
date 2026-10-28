import axios from 'axios';

/**
 * Cliente HTTP para el backend de Unimarket (Spring Boot).
 *
 * En modo demo (por defecto) la app NO lo usa: todos los servicios responden
 * con datos locales (ver `src/lib/mockDb.ts`). Para conectarse al backend real
 * define `VITE_USE_MOCKS=false` y `VITE_API_URL` en un archivo `.env.local`.
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
