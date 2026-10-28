import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PiArrowLeft, PiMagnifyingGlass, PiShoppingBagOpen } from 'react-icons/pi';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useCart } from '../../modules/cart/context/useCart';
import { useWallet } from '../../modules/wallet/context/useWallet';
import { useScrollTop } from '../hooks/useScrollTop';
import { CoinAmount } from '../ui/Unicoin';
import Avatar from '../ui/Avatar';
import Logo from '../ui/Logo';
import BottomTabBar from './BottomTabBar';
import ProfileDropdown from './ProfileDropdown';
import { hidesTabBar, isTabActive, isTabRoot, routeTitle, tabs } from './navigation';

const CartButton = () => {
    const { count } = useCart();
    return (
        <Link
            to="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-fg transition hover:bg-surface-2"
            aria-label={`Carrito, ${count} productos`}
        >
            <PiShoppingBagOpen className="h-[22px] w-[22px]" aria-hidden />
            {count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] animate-pop items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-fg ring-2 ring-bg">
                    {count > 9 ? '9+' : count}
                </span>
            )}
        </Link>
    );
};

const BalanceChip = () => {
    const { balance, loading } = useWallet();
    return (
        <Link
            to="/billetera"
            className="flex h-9 items-center rounded-full border border-coin/25 bg-coin/10 px-3 text-[13px] font-semibold text-coin transition hover:bg-coin/15"
            aria-label="Saldo UNICOIN"
        >
            {loading ? <span className="h-3 w-12 animate-pulse rounded bg-coin/20" /> : <CoinAmount amount={balance} />}
        </Link>
    );
};

const DesktopSearch = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submit = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/catalogo${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
    };
    return (
        <form onSubmit={submit} className="relative hidden w-full max-w-xs lg:block" role="search">
            <PiMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en Unimarket"
                aria-label="Buscar productos"
                className="h-10 w-full rounded-full border border-line bg-surface-2 pl-10 pr-4 text-sm text-fg placeholder:text-subtle focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
        </form>
    );
};

const TopBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const root = isTabRoot(pathname);
    const fullName = user ? `${user.name} ${user.lastName}`.trim() : '';

    const goBack = () => {
        if (window.history.state && window.history.state.idx > 0) navigate(-1);
        else navigate('/');
    };

    return (
        <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/80 backdrop-blur-xl">
            {/* Móvil */}
            <div className="flex h-14 items-center gap-2 px-4 md:hidden">
                {root ? (
                    <Link to="/" aria-label="Unimarket, inicio">
                        <Logo />
                    </Link>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={goBack}
                            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-fg transition hover:bg-surface-2"
                            aria-label="Volver"
                        >
                            <PiArrowLeft className="h-[22px] w-[22px]" aria-hidden />
                        </button>
                        <h1 className="truncate text-[15px] font-semibold text-fg">{routeTitle(pathname)}</h1>
                    </>
                )}
                <div className="ml-auto flex items-center gap-1">
                    {root && <BalanceChip />}
                    <CartButton />
                    {root && (
                        <Link to="/perfil" aria-label="Mi perfil" className="ml-1">
                            <Avatar name={fullName} size="sm" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Escritorio */}
            <div className="mx-auto hidden h-16 max-w-6xl items-center gap-6 px-6 md:flex">
                <Link to="/" aria-label="Unimarket, inicio">
                    <Logo />
                </Link>
                <nav className="flex items-center gap-1" aria-label="Secciones">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                                isTabActive(tab, pathname) ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                            }`}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="ml-auto flex flex-1 items-center justify-end gap-2">
                    <DesktopSearch />
                    <BalanceChip />
                    <CartButton />
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="mt-16 hidden border-t border-line/60 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-8 text-[13px] text-subtle">
            <div className="flex items-center gap-3">
                <Logo compact />
                <p>Unimarket · Hecho por estudiantes de la Universidad de Córdoba, Montería.</p>
            </div>
            <p>Proyecto ganador de TechU Montería 2025</p>
        </div>
    </footer>
);

const Layout = () => {
    const { pathname } = useLocation();
    useScrollTop();
    const showTabs = !hidesTabBar(pathname);

    return (
        <div className="min-h-dvh bg-bg text-fg">
            <TopBar />
            <main key={pathname} className="mx-auto max-w-6xl px-4 pb-32 pt-4 md:px-6 md:pb-8 md:pt-8">
                <Outlet />
            </main>
            <Footer />
            {showTabs && <BottomTabBar />}
        </div>
    );
};

export default Layout;
