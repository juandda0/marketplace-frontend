export type UserRole = 'CLIENT' | 'ENTREPRENEUR' | 'UNIVERSITY_ADMIN' | 'SUPER_ADMIN';

// Basado en RegisterRequest.java
export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
    studentId: string;
    campusId: number;
    phone?: string;
    program?: string;
}

// Basado en LoginRequest.java
export interface LoginRequest {
    email: string;
    password: string;
}

// Basado en TokenResponse.java
export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    studentId: string;
    campusId: number;
    program: string;
    semester: number;
    role: UserRole;
    phone?: string;
    /** Tienda que administra el usuario (solo emprendedores). */
    storeId?: string;
    /** Saldo de UNICOIN con el que arranca la cuenta (antes de movimientos locales). */
    initialBalance: number;
    createdAt: number;
}

export interface Campus {
    id: number;
    name: string;
}
