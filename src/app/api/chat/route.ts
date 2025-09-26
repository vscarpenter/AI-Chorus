import { NextRequest, NextResponse } from 'next/server';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  provider: 'openai' | 'anthropic' | 'gemini';
  model: string;
  messages: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { provider, model, messages } = body;

    switch (provider) {
      case 'openai':
        return await handleOpenAI(model, messages);
      case 'anthropic':
        return await handleAnthropic(model, messages);
      case 'gemini':
        return await handleGemini(model, messages);
      default:
        return NextResponse.json(
          { error: `Unsupported provider: ${provider}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleOpenAI(model: string, messages: ChatMessage[]) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
      stream: false
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { error: `OpenAI API error: ${error.error?.message || 'Unknown error'}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({
    content: data.choices[0].message.content,
    usage: data.usage
  });
}

async function handleAnthropic(model: string, messages: ChatMessage[]) {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Anthropic API key not configured' },
      { status: 500 }
    );
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 4000,
      messages,
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { error: `Anthropic API error: ${error.error?.message || 'Unknown error'}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({
    content: data.content[0].text,
    usage: data.usage
  });
}

async function handleGemini(model: string, messages: ChatMessage[]) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key not configured' },
      { status: 500 }
    );
  }

  // Convert messages to Gemini format
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { error: `Gemini API error: ${error.error?.message || 'Unknown error'}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    return NextResponse.json(
      { error: 'No content returned from Gemini API' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    content,
    usage: data.usageMetadata
  });
}