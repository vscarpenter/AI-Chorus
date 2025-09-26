// Environment validation utility
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for required API keys
  if (!process.env.OPENAI_API_KEY) {
    errors.push('OPENAI_API_KEY is not configured');
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    errors.push('ANTHROPIC_API_KEY is not configured');
  }

  if (!process.env.GEMINI_API_KEY) {
    errors.push('GEMINI_API_KEY is not configured');
  }

  // Check for old NEXT_PUBLIC_ variables and warn about them
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    errors.push('NEXT_PUBLIC_OPENAI_API_KEY should be removed for security - use OPENAI_API_KEY instead');
  }

  if (process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY) {
    errors.push('NEXT_PUBLIC_ANTHROPIC_API_KEY should be removed for security - use ANTHROPIC_API_KEY instead');
  }

  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    errors.push('NEXT_PUBLIC_GEMINI_API_KEY should be removed for security - use GEMINI_API_KEY instead');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function logEnvironmentStatus(): void {
  const { isValid, errors } = validateEnvironment();

  if (isValid) {
    console.log('✅ Environment validation passed - all API keys configured');
  } else {
    console.error('❌ Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
  }
}