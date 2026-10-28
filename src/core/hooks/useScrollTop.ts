import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Vuelve al inicio de la página en cada navegación. */
export const useScrollTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [pathname]);
};
