import type { CSSProperties } from 'react';

const toRgb = (hex: string): [number, number, number] => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (rgb: number[]) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

/** Mezcla dos colores sólidos: `amount` = 0 devuelve `a`, 1 devuelve `b`. Siempre opaco. */
export const mix = (a: string, b: string, amount: number): string => {
    const ca = toRgb(a);
    const cb = toRgb(b);
    return toHex(ca.map((v, i) => v + (cb[i] - v) * amount));
};

/** Variables CSS para `.visual-tile`: un tono profundo en oscuro y uno pastel en claro. */
export const tileVars = (color: string) =>
    ({
        '--tile-dark': mix(color, '#131821', 0.74),
        '--tile-dark-accent': mix(color, '#131821', 0.6),
        '--tile-light': mix(color, '#ffffff', 0.84),
        '--tile-light-accent': mix(color, '#ffffff', 0.7),
    }) as CSSProperties;
