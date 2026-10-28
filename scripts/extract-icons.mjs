/**
 * Extrae del set Fluent Emoji Flat (Microsoft, MIT) solo los íconos que usa la app
 * y los guarda como SVG individuales en src/assets/icons/. También genera
 * src/core/ui/emojiIcons.ts con los imports.
 *
 * Uso: node scripts/extract-icons.mjs
 * Requiere la devDependency @iconify-json/fluent-emoji-flat.
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICONS = [
    // Comida y postres
    'hamburger', 'flatbread', 'cup-with-straw', 'bowl-with-spoon', 'pot-of-food',
    'cookie', 'chocolate-bar', 'shortcake', 'birthday-cake', 'custard',
    // Ropa y accesorios
    't-shirt', 'coat', 'billed-cap', 'label', 'old-key', 'round-pushpin', 'tumbler-glass',
    'sunglasses', 'shopping-bags', 'backpack',
    // Tecnología
    'laptop', 'headphone', 'electric-plug', 'computer-mouse', 'abacus', 'floppy-disk',
    'keyboard', 'desktop-computer', 'video-game', 'mobile-phone', 'bicycle',
    // Libros, apuntes y servicios
    'books', 'notebook', 'atom-symbol', 'open-book', 'memo', 'graduation-cap',
    'technologist', 'hammer-and-wrench', 'page-facing-up', 'handshake',
    // Ilustraciones de interfaz
    'convenience-store', 'wrapped-gift', 'ticket', 'trophy', 'package', 'fire',
    'magnifying-glass-tilted-left', 'shopping-cart', 'receipt', 'party-popper', 'money-bag',
];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const collection = JSON.parse(readFileSync(require.resolve('@iconify-json/fluent-emoji-flat/icons.json'), 'utf8'));
const outDir = join(root, 'src/assets/icons');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

for (const name of ICONS) {
    const icon = collection.icons[name];
    if (!icon) throw new Error(`Ícono no encontrado: ${name}`);
    if (/Gradient|url\(|opacity/i.test(icon.body)) throw new Error(`El ícono ${name} usa degradados o transparencia`);
    const width = icon.width ?? collection.width ?? 32;
    const height = icon.height ?? collection.height ?? 32;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${icon.body}</svg>\n`;
    writeFileSync(join(outDir, `${name}.svg`), svg);
}

const imports = ICONS.map((n) => `import ${camel(n)}Icon from '../../assets/icons/${n}.svg';`).join('\n');
const entries = ICONS.map((n) => `    '${n}': ${camel(n)}Icon,`).join('\n');
writeFileSync(
    join(root, 'src/core/ui/emojiIcons.ts'),
    `// Generado por scripts/extract-icons.mjs. No editar a mano.\n// Íconos: Fluent Emoji Flat, © Microsoft Corporation, licencia MIT.\n${imports}\n\nexport const emojiIcons = {\n${entries}\n} as const;\n\nexport type EmojiName = keyof typeof emojiIcons;\n`,
);

console.log(`${readdirSync(outDir).length} íconos escritos en src/assets/icons/`);
