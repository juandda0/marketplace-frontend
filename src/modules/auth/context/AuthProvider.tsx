import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { getUserFromToken } from '../services/authService';
import { subscribeDb } from '../../../lib/mockDb';

const SESSION_KEY = 'unimarket:session';

const readToken = (): string | null => {
    try {
        return localStorage.getItem(SESSION_KEY);
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(readToken);
    const [version, setVersion] = useState(0);

    // Si cambian los datos locales (p. ej. un registro nuevo) se recalcula el usuario.
    useEffect(() => subscribeDb(() => setVersion((v) => v + 1)), []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const user = useMemo(() => getUserFromToken(token), [token, version]);

    const login = useCallback((newToken: string) => {
        try {
            localStorage.setItem(SESSION_KEY, newToken);
        } catch {
            // Sin almacenamiento la sesión dura lo que dure la pestaña.
        }
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch {
            // ignorado
        }
        setToken(null);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated: user !== null,
            userRole: user?.role ?? null,
            user,
            login,
            logout,
        }),
        [user, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
