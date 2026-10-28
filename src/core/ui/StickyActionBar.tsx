import type { ReactNode } from 'react';

/**
 * Barra de acción fija en móvil (reemplaza la barra de pestañas en pantallas de detalle).
 * En escritorio se muestra en línea.
 */
const StickyActionBar = ({ children }: { children: ReactNode }) => (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 md:static md:z-auto md:mt-6 md:rounded-2xl md:border md:bg-surface md:p-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">{children}</div>
    </div>
);

export default StickyActionBar;
