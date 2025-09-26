import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-[var(--emphasis-primary)] text-white hover:bg-[var(--emphasis-primary-hover)] active:bg-[var(--emphasis-primary-hover)]',
      secondary: 'bg-[var(--emphasis-secondary)] text-white hover:bg-[var(--emphasis-secondary-hover)] active:bg-[var(--emphasis-secondary-hover)]',
      ghost: 'bg-transparent text-[var(--fg-default)] hover:bg-[var(--bg-subtle)] active:bg-[var(--bg-raised)]',
      danger: 'bg-[var(--emphasis-danger)] text-white hover:bg-red-600 active:bg-red-700'
    };

    const sizes = {
      sm: 'h-[var(--size-control-sm)] px-[var(--space-xs)] text-sm rounded-[var(--radius-md)]',
      md: 'h-[var(--size-control-md)] px-[var(--space-sm)] text-sm rounded-[var(--radius-md)]',
      lg: 'h-[var(--size-control-lg)] px-[var(--space-md)] text-base rounded-[var(--radius-lg)]'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };