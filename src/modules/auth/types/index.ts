// Basado en RegisterRequest.java [cite: 43, 44, 45]
export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
    studentId: string;
    campusId: number;
    phone?: string; // Opcional
}

// Basado en LoginRequest.java [cite: 46]
export interface LoginRequest {
    email: string;
    password: string;
}

// Basado en TokenResponse.java [cite: 48]
export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}