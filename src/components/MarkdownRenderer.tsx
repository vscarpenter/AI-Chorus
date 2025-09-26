import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose prose-sm max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-[var(--fg-default)] mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-[var(--fg-default)] mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-[var(--fg-default)] mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-[var(--fg-default)] mb-3 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-3 text-[var(--fg-default)]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-3 text-[var(--fg-default)]">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--border-strong)] pl-4 py-2 my-4 bg-[var(--bg-subtle)] rounded-r-[var(--radius-md)]">
              {children}
            </blockquote>
          ),
          code: ({ children, ...props }) => {
            const className = (props as { className?: string }).className;
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <code
                  className="bg-[var(--bg-subtle)] text-[var(--fg-default)] px-1 py-0.5 rounded-[var(--radius-sm)] text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block bg-[var(--bg-subtle)] text-[var(--fg-default)] p-4 rounded-[var(--radius-md)] text-sm font-mono overflow-x-auto whitespace-pre-wrap"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-[var(--bg-subtle)] rounded-[var(--radius-md)] overflow-hidden mb-4">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[var(--link-default)] hover:text-[var(--link-hover)] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-[var(--border-default)] rounded-[var(--radius-md)]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[var(--bg-subtle)]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left border-b border-[var(--border-default)] font-medium text-[var(--fg-default)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-b border-[var(--border-default)] text-[var(--fg-default)]">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--fg-default)]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[var(--fg-default)]">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}