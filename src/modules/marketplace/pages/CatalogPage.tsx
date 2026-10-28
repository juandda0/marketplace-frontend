import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PiMagnifyingGlass, PiSlidersHorizontal, PiX } from 'react-icons/pi';
import { useAsync } from '../../../core/hooks/useAsync';
import { getProducts } from '../services/productService';
import { categories } from '../../../mocks/catalog';
import type { CategorySlug, ProductFilters } from '../types';
import ProductGrid from '../components/ProductGrid';
import { ProductGridSkeleton } from '../../../core/ui/Skeleton';
import EmptyState from '../../../core/ui/EmptyState';
import Button from '../../../core/ui/Button';
import Emoji from '../../../core/ui/Emoji';
import { pluralize } from '../../../core/utils/format';

const sortOptions: { value: NonNullable<ProductFilters['sort']>; label: string }[] = [
    { value: 'relevancia', label: 'Más relevantes' },
    { value: 'calificacion', label: 'Mejor calificados' },
    { value: 'precio-asc', label: 'Menor precio' },
    { value: 'precio-desc', label: 'Mayor precio' },
];

const isCategory = (value: string | null): value is CategorySlug => categories.some((c) => c.slug === value);

const CatalogPage = () => {
    const [params, setParams] = useSearchParams();
    const query = params.get('q') ?? '';
    const categoryParam = params.get('categoria');
    const category = isCategory(categoryParam) ? categoryParam : null;
    const sortParam = params.get('orden');
    const sort = sortOptions.find((o) => o.value === sortParam)?.value ?? 'relevancia';
    const [draft, setDraft] = useState(query);

    useEffect(() => setDraft(query), [query]);

    // Búsqueda en vivo con una pequeña espera mientras se escribe.
    useEffect(() => {
        if (draft === query) return;
        const id = window.setTimeout(() => update({ q: draft.trim() || null }), 300);
        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draft]);

    const update = (patch: Record<string, string | null>) => {
        const next = new URLSearchParams(params);
        Object.entries(patch).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
        setParams(next, { replace: true });
    };

    const { data: products, loading } = useAsync(() => getProducts({ query, category, sort }), [query, category, sort]);
    const activeCategory = categories.find((c) => c.slug === category);

    return (
        <div>
            <div className="mb-4 md:mb-6">
                <h1 className="text-[26px] font-bold tracking-tight md:text-3xl">{activeCategory?.name ?? 'Explorar'}</h1>
                <p className="mt-0.5 text-[13px] text-muted">Todo lo que venden los estudiantes de la U, en un solo lugar.</p>
            </div>

            {/* Buscador + filtros (fijos al hacer scroll) */}
            <div className="sticky top-14 z-20 -mx-4 space-y-3 border-b border-line bg-bg px-4 pb-3 pt-1 md:top-16 md:mx-0 md:rounded-b-2xl md:px-0">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <PiMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" aria-hidden />
                        <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Buscar productos o tiendas"
                            aria-label="Buscar productos o tiendas"
                            className="input pl-11 pr-10"
                            type="search"
                        />
                        {draft && (
                            <button
                                type="button"
                                onClick={() => setDraft('')}
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-subtle hover:text-fg"
                                aria-label="Borrar búsqueda"
                            >
                                <PiX aria-hidden />
                            </button>
                        )}
                    </div>
                    <label className="relative">
                        <span className="sr-only">Ordenar por</span>
                        <PiSlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
                        <select
                            value={sort}
                            onChange={(e) => update({ orden: e.target.value === 'relevancia' ? null : e.target.value })}
                            className="input w-12 cursor-pointer appearance-none pl-11 pr-0 text-[0px] sm:w-48 sm:pr-4 sm:text-[15px]"
                        >
                            {sortOptions.map((o) => (
                                <option key={o.value} value={o.value} className="text-fg">
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0" role="tablist" aria-label="Categorías">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={!category}
                        onClick={() => update({ categoria: null })}
                        className={`chip ${!category ? 'chip-active' : ''}`}
                    >
                        Todo
                    </button>
                    {categories.map((c) => {
                        const active = c.slug === category;
                        return (
                            <button
                                key={c.slug}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => update({ categoria: active ? null : c.slug })}
                                className={`chip ${active ? 'chip-active' : ''}`}
                            >
                                <Emoji name={c.icon} className="h-[18px] w-[18px]" />
                                {c.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[13px] text-muted">
                <span>{loading ? 'Buscando…' : pluralize(products?.length ?? 0, 'resultado')}</span>
                <span className="sm:hidden">{sortOptions.find((o) => o.value === sort)?.label}</span>
            </div>

            <div className="mt-4">
                {loading && !products ? (
                    <ProductGridSkeleton count={6} />
                ) : products && products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <EmptyState
                        icon={<Emoji name="magnifying-glass-tilted-left" />}
                        title="No encontramos nada"
                        description={query ? `No hay resultados para “${query}”. Prueba con otra palabra o quita los filtros.` : 'No hay productos en esta categoría todavía.'}
                        action={
                            <Button variant="secondary" onClick={() => setParams({}, { replace: true })}>
                                Limpiar filtros
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
