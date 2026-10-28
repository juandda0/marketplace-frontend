import { emojiIcons } from './emojiIcons';
import type { EmojiName } from './emojiIcons';

interface EmojiProps {
    name: EmojiName;
    className?: string;
    /** Texto alternativo; si se omite el ícono es decorativo. */
    label?: string;
}

/** Ícono ilustrado a color (Fluent Emoji Flat). */
const Emoji = ({ name, className = 'h-6 w-6', label }: EmojiProps) => (
    <img
        src={emojiIcons[name]}
        alt={label ?? ''}
        aria-hidden={label ? undefined : true}
        draggable={false}
        loading="lazy"
        decoding="async"
        className={`shrink-0 select-none ${className}`}
    />
);

export default Emoji;
