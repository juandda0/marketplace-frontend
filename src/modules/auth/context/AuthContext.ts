import { createContext } from 'react';
import type { User, UserRole } from '../types';

export interface AuthContextType {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    /** Perfil del usuario en sesión (modo demo: leído de la base local). */
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
