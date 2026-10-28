export const Skeleton = ({ className = '' }: { className?: string }) => <div className={`skeleton ${className}`} aria-hidden />;

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {Array.from({ length: count }, (_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        ))}
    </div>
);

export const DetailSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-9 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    </div>
);

export const ListSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="space-y-3">
        {Array.from({ length: count }, (_, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-line p-3">
                <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2 py-1">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
            </div>
        ))}
    </div>
);
