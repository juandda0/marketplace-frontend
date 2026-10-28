import type { EmojiName } from './emojiIcons';

export type VisualIconKey = EmojiName;

/** Arte para elementos sin fotografía: baldosa de color sólido + ícono a color. */
export interface Visual {
    icon: EmojiName;
    /** Color base (hex) del que se derivan los tonos sólidos de la baldosa. */
    color: string;
}
