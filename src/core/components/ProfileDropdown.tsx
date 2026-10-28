import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiMoon, PiReceipt, PiSignOut, PiStorefront, PiSun, PiUserCircle, PiWallet } from 'react-icons/pi';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useTheme } from '../theme/useTheme';
import Avatar from '../ui/Avatar';

/** Menú de cuenta para escritorio. */
const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;
    const fullName = `${user.name} ${user.lastName}`.trim();

    const item = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-surface-2 hover:text-fg';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((o) => !o)}
                className="flex items-center rounded-full"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Abrir menú de cuenta"
            >
                <Avatar name={fullName} size="sm" />
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 z-50 mt-3 w-64 animate-fade-up rounded-2xl border border-line bg-surface p-2"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex items-center gap-3 px-3 py-2.5">
                        <Avatar name={fullName} size="md" />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-fg">{fullName}</p>
                            <p className="truncate text-xs text-subtle">{user.email}</p>
                        </div>
                    </div>
                    <div className="my-1 h-px bg-line" />
                    <Link to="/perfil" className={item} role="menuitem">
                        <PiUserCircle className="h-5 w-5" aria-hidden /> Mi perfil
                    </Link>
                    <Link to="/billetera" className={item} role="menuitem">
                        <PiWallet className="h-5 w-5" aria-hidden /> Billetera UNICOIN
                    </Link>
                    <Link to="/perfil#pedidos" className={item} role="menuitem">
                        <PiReceipt className="h-5 w-5" aria-hidden /> Mis pedidos
                    </Link>
                    {user.storeId && (
                        <Link to={`/tiendas/${user.storeId}`} className={item} role="menuitem">
                            <PiStorefront className="h-5 w-5" aria-hidden /> Mi tienda
                        </Link>
                    )}
                    <button type="button" onClick={toggleTheme} className={`${item} w-full`} role="menuitem">
                        {theme === 'dark' ? <PiSun className="h-5 w-5" aria-hidden /> : <PiMoon className="h-5 w-5" aria-hidden />}
                        {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
                    </button>
                    <div className="my-1 h-px bg-line" />
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className={`${item} w-full text-danger-ink hover:text-danger-ink`}
                        role="menuitem"
                    >
                        <PiSignOut className="h-5 w-5" aria-hidden /> Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
