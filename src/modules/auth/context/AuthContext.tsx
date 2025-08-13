import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar esta librería: npm install jwt-decode

// Definimos los roles que puede tener un usuario
type UserRole = 'CLIENT' | 'ENTREPRENEUR' | 'UNIVERSITY_ADMIN' | 'SUPER_ADMIN';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: UserRole | null; // <-- AÑADIDO: El rol del usuario
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

// Función auxiliar para decodificar el rol del token
const getRoleFromToken = (token: string): UserRole | null => {
    try {
        const decoded: { roles: UserRole[] } = jwtDecode(token);
        // Devolvemos el primer rol del arreglo (ajustar si un usuario puede tener múltiples roles activos)
        return decoded.roles?.[0] || null;
    } catch (error) {
        console.error("Error decodificando el token:", error);
        return null;
    }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('access_token') || null);
    const [userRole, setUserRole] = useState<UserRole | null>(token ? getRoleFromToken(token) : null);

    const login = (newToken: string) => {
        Cookies.set('access_token', newToken, { expires: 7, secure: true, sameSite: 'strict' });
        setToken(newToken);
        setUserRole(getRoleFromToken(newToken));
    };

    const logout = () => {
        Cookies.remove('access_token');
        setToken(null);
        setUserRole(null);
    };

    const value = {
        isAuthenticated: !!token,
        userRole, // <-- AÑADIDO
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};