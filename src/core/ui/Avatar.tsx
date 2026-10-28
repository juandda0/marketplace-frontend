import { initials } from '../utils/format';

const palettes = [
    ['#3ED68C', '#0E7A4C'],
    ['#F6BC42', '#B76E0A'],
    ['#AC92FF', '#5B3CC4'],
    ['#FF805C', '#B23A17'],
    ['#38BDF8', '#1D4ED8'],
    ['#F472B6', '#9D174D'],
];

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
    const [from, to] = palettes[hash(name) % palettes.length];
    return (
        <span
            aria-hidden
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-2 ring-bg ${sizes[size]} ${className}`}
            style={{ background: `linear-gradient(140deg, ${from}, ${to})`, textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}
        >
            {initials(name)}
        </span>
    );
};

export default Avatar;
