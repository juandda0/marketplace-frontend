import { initials } from '../utils/format';

const palette = ['#2563EB', '#B45309', '#6D28D9', '#C2410C', '#0E7490', '#BE185D', '#047857'];

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

interface AvatarProps {
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
};

const Avatar = ({ name, size = 'md', className = '' }: AvatarProps) => {
    const background = palette[hash(name) % palette.length];
    return (
        <span
            aria-hidden
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-2 ring-bg ${sizes[size]} ${className}`}
            style={{ background }}
        >
            {initials(name)}
        </span>
    );
};

export default Avatar;
