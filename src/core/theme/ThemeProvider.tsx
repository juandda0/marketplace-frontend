import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

const THEME_KEY = 'unimarket:theme';

const initialTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(initialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0e13' : '#f4f6fa');
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch {
            // ignorado
        }
    }, [theme]);

    const setTheme = useCallback((next: Theme) => setThemeState(next), []);
    const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), []);

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
