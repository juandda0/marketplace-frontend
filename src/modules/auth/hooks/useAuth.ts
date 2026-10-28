import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return context;
};

/** Usuario en sesión; solo usar dentro de rutas protegidas. */
export const useCurrentUser = () => {
    const { user } = useAuth();
    if (!user) throw new Error('useCurrentUser requiere una sesión activa');
    return user;
};

export const displayName = (user: { name: string; lastName: string }) =>
    `${user.name}${user.lastName ? ` ${user.lastName.charAt(0)}.` : ''}`;
