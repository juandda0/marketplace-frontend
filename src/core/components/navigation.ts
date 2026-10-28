import type { IconType } from 'react-icons';
import {
    PiGavel,
    PiGavelFill,
    PiHouse,
    PiHouseFill,
    PiSquaresFour,
    PiSquaresFourFill,
    PiTicket,
    PiTicketFill,
    PiWallet,
    PiWalletFill,
} from 'react-icons/pi';

export interface NavTab {
    to: string;
    label: string;
    icon: IconType;
    activeIcon: IconType;
}

export const tabs: NavTab[] = [
    { to: '/', label: 'Inicio', icon: PiHouse, activeIcon: PiHouseFill },
    { to: '/catalogo', label: 'Explorar', icon: PiSquaresFour, activeIcon: PiSquaresFourFill },
    { to: '/subastas', label: 'Subastas', icon: PiGavel, activeIcon: PiGavelFill },
    { to: '/rifas', label: 'Rifas', icon: PiTicket, activeIcon: PiTicketFill },
    { to: '/billetera', label: 'Billetera', icon: PiWallet, activeIcon: PiWalletFill },
];

export const isTabRoot = (pathname: string) => tabs.some((t) => t.to === pathname);

export const isTabActive = (tab: NavTab, pathname: string) =>
    tab.to === '/' ? pathname === '/' : pathname === tab.to || pathname.startsWith(`${tab.to}/`);

/** Pantallas con barra de acción propia: ocultan la barra de pestañas en móvil. */
export const hidesTabBar = (pathname: string) =>
    /^\/(productos|subastas|rifas)\/[^/]+$/.test(pathname) ||
    pathname === '/carrito' ||
    pathname === '/checkout' ||
    pathname === '/billetera/recargar';

const titles: [RegExp, string][] = [
    [/^\/productos\//, 'Detalle del producto'],
    [/^\/tiendas\//, 'Tienda'],
    [/^\/subastas\//, 'Subasta'],
    [/^\/rifas\//, 'Rifa'],
    [/^\/billetera\/recargar$/, 'Recargar UNICOIN'],
    [/^\/carrito$/, 'Tu carrito'],
    [/^\/checkout$/, 'Finalizar compra'],
    [/^\/pedidos\//, 'Tu pedido'],
    [/^\/perfil$/, 'Mi perfil'],
];

export const routeTitle = (pathname: string) => titles.find(([re]) => re.test(pathname))?.[1] ?? '';
