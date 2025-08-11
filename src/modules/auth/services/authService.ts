import apiClient from '../../../lib/axios';
import type { LoginRequest, RegisterRequest, TokenResponse } from '../types';

// La función de registro ahora espera un objeto que cumpla con la interfaz RegisterRequest.
export const registerUser = (userData: RegisterRequest): Promise<void> => {
    return apiClient.post('/api/v1/auth/register', userData);
};

// La función de login espera LoginRequest y devuelve una Promesa de TokenResponse.
export const loginUser = async (credentials: LoginRequest): Promise<TokenResponse> => {
    const { data } = await apiClient.post<TokenResponse>('/api/v1/auth/login', credentials);
    return data;
};