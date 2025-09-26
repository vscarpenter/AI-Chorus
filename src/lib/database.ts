import Dexie, { Table } from 'dexie';

export interface Message {
  id?: number;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  provider?: 'openai' | 'anthropic' | 'gemini';
}

export interface Conversation {
  id: string;
  title: string;
  provider: 'openai' | 'anthropic' | 'gemini';
  model: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export class ChatDatabase extends Dexie {
  conversations!: Table<Conversation>;
  messages!: Table<Message>;

  constructor() {
    super('ChatDatabase');
    this.version(1).stores({
      conversations: 'id, title, provider, model, createdAt, updatedAt, messageCount',
      messages: '++id, conversationId, role, content, timestamp, provider'
    });
  }
}

export const db = new ChatDatabase();

export const conversationService = {
  async createConversation(provider: 'openai' | 'anthropic' | 'gemini', model: string): Promise<Conversation> {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Conversation',
      provider,
      model,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0
    };

    await db.conversations.add(conversation);
    return conversation;
  },

  async updateConversationTitle(id: string, title: string): Promise<void> {
    await db.conversations.update(id, {
      title,
      updatedAt: new Date()
    });
  },

  async getConversations(): Promise<Conversation[]> {
    return await db.conversations.orderBy('updatedAt').reverse().toArray();
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    return await db.conversations.get(id);
  },

  async deleteConversation(id: string): Promise<void> {
    await db.transaction('rw', db.conversations, db.messages, async () => {
      await db.messages.where('conversationId').equals(id).delete();
      await db.conversations.delete(id);
    });
  },

  async incrementMessageCount(conversationId: string): Promise<void> {
    const conversation = await db.conversations.get(conversationId);
    if (conversation) {
      await db.conversations.update(conversationId, {
        messageCount: conversation.messageCount + 1,
        updatedAt: new Date()
      });
    }
  }
};

export const messageService = {
  async addMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    const fullMessage: Message = {
      ...message,
      timestamp: new Date()
    };

    const id = await db.messages.add(fullMessage);
    await conversationService.incrementMessageCount(message.conversationId);

    return { ...fullMessage, id };
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const messages = await db.messages
      .where('conversationId')
      .equals(conversationId)
      .toArray();

    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  },

  async deleteMessage(id: number): Promise<void> {
    await db.messages.delete(id);
  },

  async clearConversationMessages(conversationId: string): Promise<void> {
    await db.messages.where('conversationId').equals(conversationId).delete();
    await db.conversations.update(conversationId, { messageCount: 0 });
  }
};