import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PiCheckCircleFill, PiInfoFill, PiWarningCircleFill } from 'react-icons/pi';
import { ToastContext } from './ToastContext';
import type { ToastOptions } from './ToastContext';
import { UnicoinIcon } from '../ui/Unicoin';

interface ToastItem extends ToastOptions {
    id: number;
}

const toneIcon = {
    success: <PiCheckCircleFill className="h-5 w-5 text-success" aria-hidden />,
    error: <PiWarningCircleFill className="h-5 w-5 text-danger" aria-hidden />,
    info: <PiInfoFill className="h-5 w-5 text-muted" aria-hidden />,
    coin: <UnicoinIcon className="h-5 w-5" />,
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);

    const show = useCallback((toast: ToastOptions) => {
        const id = ++nextId.current;
        setToasts((list) => [...list.slice(-2), { ...toast, id }]);
        window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200);
    }, []);

    return (
        <ToastContext.Provider value={show}>
            {children}
            <div
                aria-live="polite"
                className="pointer-events-none fixed inset-x-0 top-[calc(64px+env(safe-area-inset-top))] z-[60] flex flex-col items-center gap-2 px-4 md:bottom-8 md:top-auto"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-2xl border border-line bg-surface-2/95 px-4 py-3 shadow-float backdrop-blur"
                    >
                        <span className="mt-0.5 shrink-0">{toneIcon[toast.tone ?? 'success']}</span>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-fg">{toast.title}</p>
                            {toast.description && <p className="mt-0.5 text-[13px] text-muted">{toast.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
