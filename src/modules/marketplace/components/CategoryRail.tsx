import { Link } from 'react-router-dom';
import type { Category } from '../types';
import { visualIcons } from '../../../core/ui/visualIcons';

/** Accesos rápidos a categorías (scroll horizontal en móvil). */
const CategoryRail = ({ categories }: { categories: Category[] }) => (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
        <ul className="flex gap-3 md:grid md:grid-cols-7">
            {categories.map((category) => {
                const Icon = visualIcons[category.icon];
                return (
                    <li key={category.slug} className="shrink-0">
                        <Link
                            to={`/catalogo?categoria=${category.slug}`}
                            className="group flex w-[72px] flex-col items-center gap-2 text-center md:w-auto"
                        >
                            <span
                                className="flex h-16 w-16 items-center justify-center rounded-2xl border transition group-hover:-translate-y-0.5"
                                style={{
                                    background: `linear-gradient(150deg, ${category.color}2E, ${category.color}0F)`,
                                    borderColor: `${category.color}40`,
                                    color: category.color,
                                }}
                            >
                                <Icon className="h-7 w-7" aria-hidden />
                            </span>
                            <span className="text-[12px] font-medium leading-tight text-muted group-hover:text-fg">{category.name}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
);

export default CategoryRail;
