# AI-Chorus

*Your AI ensemble, ready to perform!*

A beautiful, modern web application for chatting with multiple Large Language Models (LLMs) including ChatGPT, Claude, and Gemini. Built with Next.js, TypeScript, and the Cascade design system.

## Features

- 🤖 **Multiple LLM Support**: Chat with OpenAI GPT, Anthropic Claude, and Google Gemini
- 💬 **Conversation Management**: Create, save, and manage multiple conversations
- 📱 **Modern UI**: Beautiful interface using the Cascade design system
- 💾 **Persistent History**: Conversations saved locally using IndexedDB
- 📝 **Markdown Support**: Rich text rendering for AI responses
- ⚡ **Real-time**: Instant message delivery and response
- 🔒 **Client-side API Keys**: API keys stored securely in environment variables

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for the LLM providers you want to use

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your API keys to `.env.local`:**
   ```bash
   # OpenAI API Key - Get from https://platform.openai.com/api-keys
   NEXT_PUBLIC_OPENAI_API_KEY=sk-...

   # Anthropic Claude API Key - Get from https://console.anthropic.com/
   NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...

   # Google Gemini API Key - Get from https://makersuite.google.com/app/apikey
   NEXT_PUBLIC_GEMINI_API_KEY=AIza...
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Select Provider & Model**: Choose your preferred LLM provider and model from the dropdowns
2. **Start Chatting**: Click "New Conversation" or start typing to begin
3. **Manage Conversations**: View conversation history in the sidebar, click to switch between them
4. **Rich Responses**: AI responses support markdown formatting including code blocks, lists, and links

## API Keys Setup

### OpenAI (ChatGPT)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add billing information to your OpenAI account
4. Copy the key to your `.env.local` file

### Anthropic (Claude)
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and get API access
3. Generate an API key
4. Copy the key to your `.env.local` file

### Google (Gemini)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env.local` file

## Supported Models

### OpenAI
- **GPT-4.1** - Latest flagship with 1M token context, superior coding and reasoning
- **GPT-4.1 Mini** - Beats GPT-4o performance with 83% cost reduction and half the latency
- **GPT-4o** - Multimodal model supporting text, audio, image, and video inputs
- **GPT-4o Mini** - Cost-effective alternative to GPT-3.5 Turbo with better performance

### Anthropic Claude
- **Claude Opus 4.1** - Latest flagship model, most powerful for complex reasoning and coding
- **Claude Sonnet 4** - Advanced model with superior coding and reasoning capabilities
- **Claude 3.7 Sonnet** - Hybrid reasoning model with rapid and thoughtful response modes
- **Claude 3.5 Haiku** - Fast and cost-effective model for interactive applications

### Google Gemini
- **Gemini 2.5 Pro** - Latest flagship model with adaptive thinking capabilities
- **Gemini 2.5 Flash** - High-performance model with improved agentic tool use
- **Gemini 2.5 Flash Lite** - Fast, cost-effective model for high-throughput applications

## Development

### Build for Production
```bash
npm run build
```

### Deployment Options

### Option 1: Server Deployment (Recommended)
Deploy to platforms that support Next.js API routes:

**Vercel (Easiest):**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

**Other platforms:** Railway, Render, AWS Amplify, Netlify

### Option 2: Static Export (Limited - No AI functionality)
⚠️ **Note:** Static export doesn't support API routes, so AI chat features won't work.

```bash
npm run export
# Upload out/ directory to S3 + CloudFront
```

For AWS S3 + CloudFront with full functionality, you'll need to replace API routes with AWS Lambda functions.

## Contributing

AI-Chorus follows the coding guidelines in `llm_code_guidelines.md` and uses the Cascade design system from the `style-guide/` directory.
