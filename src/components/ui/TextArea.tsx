import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-[var(--space-2xs)]">
        {label && (
          <label className="block text-sm font-medium text-[var(--fg-default)]">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-[var(--space-xs)] py-[var(--space-2xs)]',
            'bg-[var(--bg-surface)] border border-[var(--border-default)]',
            'rounded-[var(--radius-md)] text-[var(--fg-default)]',
            'focus:outline-none focus:ring-[3px] focus:ring-[var(--focus-ring)] focus:border-[var(--focus-ring)]',
            'hover:border-[var(--border-hover)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-none',
            error && 'border-[var(--emphasis-danger)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--emphasis-danger)]">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };