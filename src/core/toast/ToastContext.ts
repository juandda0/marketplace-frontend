import { createContext } from 'react';

export type ToastTone = 'success' | 'error' | 'info' | 'coin';

export interface ToastOptions {
    title: string;
    description?: string;
    tone?: ToastTone;
}

export const ToastContext = createContext<((toast: ToastOptions) => void) | null>(null);
