'use client';

import { useState, useEffect, useRef } from 'react';
import { Conversation, Message, conversationService, messageService } from '@/lib/database';
import { LLMService, ChatMessage as LLMChatMessage } from '@/lib/llm-providers';
import { ConversationSidebar } from '@/components/ConversationSidebar';
import { ModelSelector } from '@/components/ModelSelector';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'anthropic' | 'gemini'>('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (conversationId: string) => {
    try {
      const conversationMessages = await messageService.getMessages(conversationId);
      setMessages(conversationMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setError('Failed to load conversation messages');
    }
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setSelectedProvider(conversation.provider);
    setSelectedModel(conversation.model);
    await loadMessages(conversation.id);
    setError(null);
  };

  const handleNewConversation = async () => {
    if (!selectedProvider || !selectedModel) {
      setError('Please select a provider and model first');
      return;
    }

    try {
      const conversation = await conversationService.createConversation(selectedProvider, selectedModel);
      setCurrentConversation(conversation);
      setMessages([]);
      setError(null);
    } catch (error) {
      console.error('Failed to create conversation:', error);
      setError('Failed to create new conversation');
    }
  };

  const handleDeleteConversation = (id: string) => {
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversation) {
      await handleNewConversation();
      if (!currentConversation) return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Add user message to database
      const userMessage = await messageService.addMessage({
        conversationId: currentConversation.id,
        role: 'user',
        content,
      });

      setMessages(prev => [...prev, userMessage]);

      // Generate title for first message
      if (messages.length === 0) {
        const title = content.length > 50 ? content.substring(0, 50) + '...' : content;
        await conversationService.updateConversationTitle(currentConversation.id, title);
      }

      // Prepare messages for LLM
      const conversationHistory: LLMChatMessage[] = [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content }
      ];

      // Call LLM API
      const response = await LLMService.sendMessage(
        selectedProvider,
        selectedModel,
        conversationHistory
      );

      // Add assistant response to database
      const assistantMessage = await messageService.addMessage({
        conversationId: currentConversation.id,
        role: 'assistant',
        content: response.content,
        provider: selectedProvider,
      });

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Failed to send message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-canvas)]">
      <ConversationSidebar
        currentConversationId={currentConversation?.id}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] p-[var(--space-md)]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[var(--fg-default)] flex items-center gap-3">
              <Image src="/ai-chorus-logo.svg" alt="AI-Chorus" width={300} height={80} className="h-20 w-auto" />
              AI-Chorus
            </h1>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[var(--fg-muted)]" />
              <span className="text-sm text-[var(--fg-muted)]">Settings</span>
            </div>
          </div>

          <ModelSelector
            selectedProvider={selectedProvider}
            selectedModel={selectedModel}
            onProviderChange={(provider) => setSelectedProvider(provider as 'openai' | 'anthropic' | 'gemini')}
            onModelChange={setSelectedModel}
            disabled={isLoading}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!currentConversation ? (
            <div className="flex items-center justify-center h-full">
              <Card className="max-w-md text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-3">
                    <Image src="/ai-chorus-logo.svg" alt="AI-Chorus" width={300} height={80} className="h-20 w-auto" />
                    Welcome to AI-Chorus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--fg-muted)] mb-4">
                    Your AI ensemble, ready to perform! Select a provider and model above, then start a new conversation to begin chatting with AI.
                  </p>
                  <Button
                    onClick={handleNewConversation}
                    disabled={!selectedProvider || !selectedModel}
                  >
                    Start New Conversation
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((message) => (
                <ChatMessage key={message.id || message.timestamp.getTime()} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-[var(--space-md)] py-[var(--space-sm)] bg-[var(--emphasis-danger)] bg-opacity-10 border-t border-[var(--emphasis-danger)]">
            <p className="text-[var(--emphasis-danger)] text-sm">{error}</p>
          </div>
        )}

        {/* Chat Input */}
        <div className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] p-[var(--space-md)]">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading || !selectedProvider || !selectedModel}
            placeholder={
              !selectedProvider || !selectedModel
                ? "Please select a provider and model first..."
                : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  );
}
