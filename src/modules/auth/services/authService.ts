import { jwtDecode } from 'jwt-decode';
import apiClient from '../../../lib/axios';
import { USE_MOCKS } from '../../../lib/config';
import { delay, MockApiError, readDb, uid, updateDb } from '../../../lib/mockDb';
import { DEMO_EMAIL, DEMO_PASSWORD, WELCOME_BONUS } from '../../../mocks/users';
import { addMovement } from '../../wallet/services/walletService';
import type { LoginRequest, RegisterRequest, TokenResponse, User, UserRole } from '../types';

interface SessionClaims {
    sub: string;
    email: string;
    name: string;
    roles: UserRole[];
    iat: number;
    exp: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_DAYS = 7;

const base64Url = (value: object) => {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/** Token con la misma forma que emite el backend (JWT), firmado de forma ficticia. */
const createDemoToken = (user: User): string => {
    const iat = Math.floor(Date.now() / 1000);
    const claims: SessionClaims = {
        sub: user.id,
        email: user.email,
        name: `${user.name} ${user.lastName}`,
        roles: [user.role],
        iat,
        exp: iat + SESSION_DAYS * 24 * 3600,
    };
    return `${base64Url({ alg: 'none', typ: 'JWT' })}.${base64Url(claims)}.demo`;
};

export const decodeSession = (token: string): SessionClaims | null => {
    try {
        const claims = jwtDecode<SessionClaims>(token);
        if (claims.exp && claims.exp * 1000 < Date.now()) return null;
        return claims;
    } catch {
        return null;
    }
};

export const getUserFromToken = (token: string | null): User | null => {
    if (!token) return null;
    const claims = decodeSession(token);
    if (!claims) return null;
    return readDb().users.find((u) => u.id === claims.sub) ?? null;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const validateCredentials = ({ email, password }: LoginRequest) => {
    if (!EMAIL_RE.test(email.trim())) throw new MockApiError('Escribe un correo válido.');
    if (password.length < 6) throw new MockApiError('La contraseña debe tener al menos 6 caracteres.');
};

const createUser = (data: Omit<User, 'id' | 'createdAt' | 'initialBalance'>): User => {
    const user: User = { ...data, id: uid('u'), initialBalance: 0, createdAt: Date.now() };
    updateDb((db) => ({ ...db, users: [...db.users, user] }));
    addMovement(user.id, {
        type: 'reward',
        title: 'Bono de bienvenida',
        subtitle: 'Gracias por unirte a Unimarket',
        amount: WELCOME_BONUS,
    });
    return user;
};

export const registerUser = async (userData: RegisterRequest): Promise<void> => {
    if (!USE_MOCKS) {
        await apiClient.post('/api/v1/auth/register', userData);
        return;
    }
    await delay(null, 700);
    validateCredentials(userData);
    const email = userData.email.trim().toLowerCase();
    if (readDb().users.some((u) => u.email === email)) {
        throw new MockApiError('Ya existe una cuenta con este correo. Inicia sesión.');
    }
    createUser({
        name: userData.name.trim(),
        lastName: userData.lastName.trim(),
        email,
        studentId: userData.studentId.trim(),
        campusId: userData.campusId,
        phone: userData.phone,
        program: userData.program ?? 'Ingeniería de Sistemas',
        semester: 1,
        role: 'CLIENT',
    });
};

/**
 * Modo demo: cualquier correo válido con una contraseña de 6+ caracteres inicia sesión.
 * Si el correo no está registrado se crea una cuenta local automáticamente.
 */
export const loginUser = async (credentials: LoginRequest): Promise<TokenResponse> => {
    if (!USE_MOCKS) {
        const { data } = await apiClient.post<TokenResponse>('/api/v1/auth/login', credentials);
        return data;
    }
    await delay(null, 650);
    validateCredentials(credentials);
    const email = credentials.email.trim().toLowerCase();
    const user =
        readDb().users.find((u) => u.email === email) ??
        createUser({
            name: capitalize(email.split('@')[0].split(/[._-]/)[0] || 'Estudiante'),
            lastName: capitalize(email.split('@')[0].split(/[._-]/)[1] ?? ''),
            email,
            studentId: '',
            campusId: 1,
            program: 'Ingeniería de Sistemas',
            semester: 1,
            role: 'CLIENT',
        });
    return { access_token: createDemoToken(user), refresh_token: uid('refresh') };
};

export const loginAsDemo = (): Promise<TokenResponse> => loginUser({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
