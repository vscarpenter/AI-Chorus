import { useState, useEffect } from 'react';
import { Conversation, conversationService } from '@/lib/database';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationSidebarProps {
  currentConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ConversationSidebar({
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {
    try {
      const data = await conversationService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm('Are you sure you want to delete this conversation?')) {
      try {
        await conversationService.deleteConversation(id);
        onDeleteConversation(id);
        await loadConversations();
      } catch (error) {
        console.error('Failed to delete conversation:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-80 bg-[var(--bg-surface)] border-r border-[var(--border-default)] p-[var(--space-md)]">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-[var(--bg-subtle)] rounded"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-[var(--bg-subtle)] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[var(--bg-surface)] border-r border-[var(--border-default)] flex flex-col">
      <div className="p-[var(--space-md)] border-b border-[var(--border-default)]">
        <Button
          onClick={onNewConversation}
          className="w-full"
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-[var(--space-md)] space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-[var(--fg-muted)]">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start a new conversation to get started</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={cn(
                'cursor-pointer transition-colors hover:bg-[var(--bg-subtle)] p-[var(--space-sm)]',
                currentConversationId === conversation.id && 'bg-[var(--bg-subtle)] border-[var(--emphasis-primary)]'
              )}
              onClick={() => onSelectConversation(conversation)}
            >
              <CardContent className="p-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--fg-default)] truncate">
                      {conversation.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-[var(--bg-raised)] text-[var(--fg-muted)] px-2 py-1 rounded-[var(--radius-sm)]">
                        {conversation.provider}
                      </span>
                      <span className="text-xs text-[var(--fg-muted)]">
                        {conversation.messageCount} messages
                      </span>
                    </div>
                    <p className="text-xs text-[var(--fg-muted)] mt-1">
                      {conversation.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDelete(conversation.id, e)}
                    className="opacity-0 group-hover:opacity-100 hover:text-[var(--emphasis-danger)] p-1 h-auto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}