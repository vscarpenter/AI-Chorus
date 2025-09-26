import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="space-y-[var(--space-2xs)]">
        {label && (
          <label className="block text-sm font-medium text-[var(--fg-default)]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              'w-full h-[var(--size-control-md)] px-[var(--space-xs)] pr-8',
              'bg-[var(--bg-surface)] border border-[var(--border-default)]',
              'rounded-[var(--radius-md)] text-[var(--fg-default)]',
              'focus:outline-none focus:ring-[3px] focus:ring-[var(--focus-ring)] focus:border-[var(--focus-ring)]',
              'hover:border-[var(--border-hover)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'appearance-none',
              error && 'border-[var(--emphasis-danger)]',
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--fg-muted)] pointer-events-none" />
        </div>
        {error && (
          <p className="text-sm text-[var(--emphasis-danger)]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };