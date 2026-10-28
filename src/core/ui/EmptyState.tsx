import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

const EmptyState = ({ icon, title, description, action, className = '' }: EmptyStateProps) => (
    <div className={`flex flex-col items-center px-6 py-14 text-center ${className}`}>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface-2 text-3xl text-muted">
            {icon}
        </div>
        <h3 className="text-base font-semibold text-fg">{title}</h3>
        {description && <p className="mt-1 max-w-xs text-sm text-muted">{description}</p>}
        {action && <div className="mt-5">{action}</div>}
    </div>
);

export default EmptyState;
