import { useCallback, useEffect, useState } from 'react';
import type { DependencyList } from 'react';

interface AsyncState<T> {
    data: T | undefined;
    loading: boolean;
    error: unknown;
}

/** Ejecuta una función asíncrona al montar (y cuando cambian `deps`), con soporte para recargar. */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList) {
    const [state, setState] = useState<AsyncState<T>>({ data: undefined, loading: true, error: undefined });
    const [tick, setTick] = useState(0);

    useEffect(() => {
        let active = true;
        setState((s) => ({ ...s, loading: true }));
        fn()
            .then((data) => active && setState({ data, loading: false, error: undefined }))
            .catch((error: unknown) => active && setState({ data: undefined, loading: false, error }));
        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, tick]);

    const reload = useCallback(() => setTick((t) => t + 1), []);
    /** Reemplaza los datos sin volver a mostrar el estado de carga. */
    const setData = useCallback((data: T) => setState({ data, loading: false, error: undefined }), []);

    return { ...state, reload, setData };
}
