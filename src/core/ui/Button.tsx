import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { buttonClasses } from './buttonStyles';
import type { ButtonSize, ButtonVariant } from './buttonStyles';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    block?: boolean;
    icon?: ReactNode;
}

const Button = ({ variant, size, loading, block, icon, className = '', children, disabled, type = 'button', ...rest }: ButtonProps) => (
    <button
        type={type}
        className={buttonClasses(variant, size, `${block ? 'w-full' : ''} ${className}`)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
    >
        {loading ? <Spinner /> : icon}
        {children}
    </button>
);

interface ButtonLinkProps extends LinkProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
    icon?: ReactNode;
}

export const ButtonLink = ({ variant, size, block, icon, className = '', children, ...rest }: ButtonLinkProps) => (
    <Link className={buttonClasses(variant, size, `${block ? 'w-full' : ''} ${className}`)} {...rest}>
        {icon}
        {children}
    </Link>
);

export default Button;
