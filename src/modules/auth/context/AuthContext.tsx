import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Creamos el contexto con un tipo definido y un valor inicial nulo.
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('access_token'));

    const login = (token: string) => {
        Cookies.set('access_token', token, { expires: 7, secure: true, sameSite: 'strict' });
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('access_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};