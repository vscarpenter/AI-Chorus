export function validateApiKeys() {
  const missingKeys: string[] = [];

  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY === 'your_openai_api_key_here') {
    missingKeys.push('OpenAI API Key');
  }

  if (!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    missingKeys.push('Anthropic API Key');
  }

  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY === 'your_gemini_api_key_here') {
    missingKeys.push('Gemini API Key');
  }

  return {
    isValid: missingKeys.length === 0,
    missingKeys
  };
}

export function getProviderValidation(providerId: string) {
  switch (providerId) {
    case 'openai':
      return !!process.env.NEXT_PUBLIC_OPENAI_API_KEY &&
             process.env.NEXT_PUBLIC_OPENAI_API_KEY !== 'your_openai_api_key_here';
    case 'anthropic':
      return !!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY &&
             process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here';
    case 'gemini':
      return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY &&
             process.env.NEXT_PUBLIC_GEMINI_API_KEY !== 'your_gemini_api_key_here';
    default:
      return false;
  }
}

export function sanitizeMessage(content: string): string {
  // Basic sanitization - trim whitespace and limit length
  return content.trim().slice(0, 10000);
}

export function validateMessage(content: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeMessage(content);

  if (!sanitized) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (sanitized.length < 1) {
    return { isValid: false, error: 'Message is too short' };
  }

  if (sanitized.length > 10000) {
    return { isValid: false, error: 'Message is too long (max 10,000 characters)' };
  }

  return { isValid: true };
}