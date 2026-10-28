# Unimarket · Frontend

Marketplace universitario para estudiantes de la **Universidad de Córdoba** (Montería, Colombia): catálogos de emprendimientos estudiantiles, **subastas**, **rifas** y una moneda digital propia, **UNICOIN**. Proyecto ganador de **TechU Montería 2025**.

Esta app funciona **100 % sin backend** (modo demo): los servicios responden con datos locales y lo que hace el usuario (pujas, boletos, recargas, pedidos) se guarda en `localStorage`.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 3 · React Router 7 · react-icons (Phosphor) · axios

## Ejecutar

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

Para entrar usa **«Entrar como demo»** en la pantalla de inicio de sesión (cuenta de Sofía Martínez, `demo@correo.unicordoba.edu.co`). También funciona cualquier correo válido con una contraseña de 6+ caracteres, o crear una cuenta en `/registro` (incluye 500 UNICOIN de bienvenida).

Desde **Perfil → Restablecer datos de demostración** se borra todo lo generado localmente.

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `/login`, `/registro` | Inicio de sesión (con acceso demo) y registro |
| `/` | Inicio: búsqueda, categorías, subastas en vivo, destacados, rifas y tiendas |
| `/catalogo` | Catálogo con búsqueda, filtros por categoría y orden (`?q=`, `?categoria=`, `?orden=`) |
| `/productos/:id` | Detalle de producto: galería, entrega, tienda, opiniones y relacionados |
| `/tiendas/:id` | Tienda del vendedor |
| `/subastas`, `/subastas/:id` | Subastas con cuenta regresiva, historial y pujas en UNICOIN |
| `/rifas`, `/rifas/:id` | Rifas con grilla de números y compra de boletos con UNICOIN |
| `/billetera`, `/billetera/recargar` | Saldo, movimientos y recarga de UNICOIN |
| `/carrito`, `/checkout`, `/pedidos/:id` | Carrito, pago (UNICOIN, Nequi o efectivo) y seguimiento del pedido |
| `/perfil` | Perfil, pedidos, pujas, boletos y tema claro/oscuro |

## Estructura

```
src/
  core/        # layout, navegación, UI compartida, tema, toasts, hooks y utilidades
  lib/         # cliente axios, configuración y base de datos local del modo demo
  mocks/       # datos de ejemplo (tiendas, productos, subastas, rifas, usuarios)
  modules/     # auth, marketplace, auctions, raffles, wallet, cart, profile
                 (cada uno con pages/components/services/types/routes)
```

## Conectar el backend

El cliente de `src/lib/axios.ts` apunta al backend en Spring Boot. Con `VITE_USE_MOCKS=false` y `VITE_API_URL` en `.env.local`, el login y el registro llaman a `/api/v1/auth/*`; la integración completa (perfil, catálogo, subastas, rifas y billetera) está pendiente y hoy esos servicios responden con datos locales.
