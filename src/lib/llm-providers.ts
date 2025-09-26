export interface LLMProvider {
  id: 'openai' | 'anthropic' | 'gemini';
  name: string;
  models: LLMModel[];
}

export interface LLMModel {
  id: string;
  name: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  content: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI GPT',
    models: [
      {
        id: 'gpt-4.1',
        name: 'GPT-4.1',
        description: 'Latest flagship model with 1M token context, superior coding and reasoning'
      },
      {
        id: 'gpt-4.1-mini',
        name: 'GPT-4.1 Mini',
        description: 'Beats GPT-4o performance with 83% cost reduction and half the latency'
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'Multimodal model supporting text, audio, image, and video inputs'
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        description: 'Cost-effective alternative to GPT-3.5 Turbo with better performance'
      }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    models: [
      {
        id: 'claude-opus-4-1',
        name: 'Claude Opus 4.1',
        description: 'Latest flagship model - most powerful for complex reasoning and coding'
      },
      {
        id: 'claude-sonnet-4-0',
        name: 'Claude Sonnet 4',
        description: 'Advanced model with superior coding and reasoning capabilities'
      },
      {
        id: 'claude-3-7-sonnet-latest',
        name: 'Claude 3.7 Sonnet',
        description: 'Hybrid reasoning model with rapid and thoughtful response modes'
      },
      {
        id: 'claude-3-5-haiku-latest',
        name: 'Claude 3.5 Haiku',
        description: 'Fast and cost-effective model for interactive applications'
      }
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    models: [
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        description: 'Latest flagship model with adaptive thinking capabilities'
      },
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        description: 'High-performance model with improved agentic tool use'
      },
      {
        id: 'gemini-2.5-flash-lite',
        name: 'Gemini 2.5 Flash Lite',
        description: 'Fast, cost-effective model for high-throughput applications'
      }
    ]
  }
];

export class LLMService {
  static async sendMessage(
    provider: 'openai' | 'anthropic' | 'gemini',
    model: string,
    messages: ChatMessage[]
  ): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          model,
          messages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.content,
        usage: data.usage
      };
    } catch (error) {
      console.error('LLM API error:', error);
      throw error;
    }
  }

  static getProvider(id: string): LLMProvider | undefined {
    return LLM_PROVIDERS.find(provider => provider.id === id);
  }

  static getModel(providerId: string, modelId: string): LLMModel | undefined {
    const provider = this.getProvider(providerId);
    return provider?.models.find(model => model.id === modelId);
  }
}