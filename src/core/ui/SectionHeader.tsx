import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PiCaretRight } from 'react-icons/pi';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    to?: string;
    linkLabel?: string;
    icon?: ReactNode;
}

const SectionHeader = ({ title, subtitle, to, linkLabel = 'Ver todo', icon }: SectionHeaderProps) => (
    <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-fg md:text-lg">
                {icon}
                {title}
            </h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
        </div>
        {to && (
            <Link to={to} className="flex shrink-0 items-center gap-0.5 text-[13px] font-medium text-primary hover:underline">
                {linkLabel}
                <PiCaretRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
        )}
    </div>
);

export default SectionHeader;
