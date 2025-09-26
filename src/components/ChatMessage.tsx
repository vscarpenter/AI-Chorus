import { Message } from '@/lib/database';
import { MarkdownRenderer } from './MarkdownRenderer';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      'flex gap-[var(--space-sm)] p-[var(--space-md)]',
      isUser ? 'bg-[var(--bg-surface)]' : 'bg-[var(--bg-canvas)]'
    )}>
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser
          ? 'bg-[var(--emphasis-primary)] text-white'
          : 'bg-[var(--emphasis-secondary)] text-white'
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-[var(--fg-default)]">
            {isUser ? 'You' : 'Assistant'}
          </span>
          {message.provider && !isUser && (
            <span className="text-xs bg-[var(--bg-subtle)] text-[var(--fg-muted)] px-2 py-1 rounded-[var(--radius-sm)]">
              {message.provider}
            </span>
          )}
          <span className="text-xs text-[var(--fg-muted)]">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div className="text-[var(--fg-default)]">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}