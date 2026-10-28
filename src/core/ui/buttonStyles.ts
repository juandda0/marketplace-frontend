export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'coin' | 'raffle' | 'auction' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 [&_svg]:shrink-0';

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-fg shadow-glow hover:bg-primary-strong',
    secondary: 'border border-line bg-surface-2 text-fg hover:bg-surface-3',
    ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
    coin: 'bg-coin text-coin-fg shadow-coin hover:brightness-105',
    raffle: 'bg-raffle text-white shadow-[0_10px_30px_-10px_rgb(var(--raffle)/0.6)] hover:brightness-110 [[data-theme=dark]_&]:text-[#140b33]',
    auction: 'bg-auction text-white shadow-[0_10px_30px_-10px_rgb(var(--auction)/0.6)] hover:brightness-110 [[data-theme=dark]_&]:text-[#2b0c02]',
    danger: 'border border-danger/30 bg-danger/10 text-danger hover:bg-danger/15',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 rounded-xl px-3.5 text-[13px]',
    md: 'h-11 rounded-xl px-4 text-sm',
    lg: 'h-[52px] rounded-2xl px-5 text-[15px]',
};

export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
    `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
