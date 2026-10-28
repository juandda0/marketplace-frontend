export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'coin' | 'raffle' | 'auction' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:border-line disabled:bg-surface-3 disabled:text-subtle [&_svg]:shrink-0';

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-fg hover:bg-primary-hover',
    secondary: 'border border-line bg-surface-2 text-fg hover:bg-surface-3',
    ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
    coin: 'bg-coin text-coin-fg hover:bg-[#d97706]',
    raffle: 'bg-raffle text-raffle-fg hover:bg-[#5b21b6]',
    auction: 'bg-auction text-auction-fg hover:bg-[#9a3412]',
    danger: 'border border-danger-line bg-danger-soft text-danger-ink hover:bg-danger hover:text-danger-fg',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 rounded-xl px-3.5 text-[13px]',
    md: 'h-11 rounded-xl px-4 text-sm',
    lg: 'h-[52px] rounded-2xl px-5 text-[15px]',
};

export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
    `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
