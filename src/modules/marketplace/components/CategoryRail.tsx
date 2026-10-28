import { Link } from 'react-router-dom';
import type { Category } from '../types';
import Emoji from '../../../core/ui/Emoji';
import { tileVars } from '../../../core/utils/color';

/** Accesos rápidos a categorías (scroll horizontal en móvil). */
const CategoryRail = ({ categories }: { categories: Category[] }) => (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
        <ul className="flex gap-3 md:grid md:grid-cols-7">
            {categories.map((category) => (
                <li key={category.slug} className="shrink-0">
                    <Link
                        to={`/catalogo?categoria=${category.slug}`}
                        className="group flex w-[72px] flex-col items-center gap-2 text-center md:w-auto"
                    >
                        <span
                            className="visual-tile flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-0.5"
                            style={tileVars(category.color)}
                        >
                            <Emoji name={category.icon} className="h-9 w-9" />
                        </span>
                        <span className="text-[12px] font-medium leading-tight text-muted group-hover:text-fg">{category.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default CategoryRail;
