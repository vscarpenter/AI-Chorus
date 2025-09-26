# LLM Chat Application - Original Requirements

## Project Overview
Build a beautiful visually appealing modern web app that will allow the user to select an LLM (ChatGPT, Claude or Gemini) from a dropdown and then ask it a question. The prompt will then be submitted via API to the selected LLM and the response presented back to the user.

## Technical Requirements

### Frontend Framework
- **Framework**: React with Next.js
- **Styling**: Use Tailwind theme extract from style guide with CSS variables
- **Architecture**: Start with a simple frontend-only solution

### LLM Integration
- **Providers**: Support for ChatGPT, Claude, and Gemini
- **API Integration**: Submit prompts via API to selected LLM
- **Response Handling**: Present responses back to the user

### Configuration
- **Environment Variables**: Leverage an .env file that will hold the API keys for each of the platforms
- **Security**: API keys should be stored in environment configuration

### User Experience Features
- **Conversation Management**: Ability to start new conversations
- **Response Format**: Responses should support markdown and formatting
- **Persistence**: Conversation history persistence backed by local IndexedDB
- **Interface**: Beautiful, visually appealing, modern web app design

### Deployment
- **Local Development**: Run locally for development
- **Production Deployment**: Eventually deploy to AWS S3 with CloudFront CDN

## Design & Code Standards

### Style Guide
- Use the style guide in the `@style-guide/` directory
- Follow coding standards and guidelines laid out in `@llm_code_guidelines.md`

### Code Quality Requirements
- Follow the principles in `llm_code_guidelines.md`:
  - Favor simplicity over cleverness
  - Start minimal and iterate
  - Optimize for the next developer
  - Use descriptive names
  - Keep functions small and focused
  - Minimize nesting
  - Add comments for "why," not "what"
  - Follow consistent formatting

### Development Approach
- **Planning**: Create a todo or task list to maintain context and continuity across multiple conversations
- **Implementation**: Build iteratively with clear progress tracking
- **Quality**: Ensure code follows established patterns and conventions

## Functional Requirements

### Core Features
1. **LLM Provider Selection**: Dropdown to select between ChatGPT, Claude, or Gemini
2. **Model Selection**: Ability to choose specific models for each provider
3. **Message Input**: Interface for users to input their questions/prompts
4. **Response Display**: Present AI responses with markdown support
5. **Conversation Management**: Create, view, and manage multiple conversations
6. **History Persistence**: Save conversations locally using IndexedDB

### User Interface
- Modern, clean, and visually appealing design
- Responsive layout that works across devices
- Intuitive navigation and user experience
- Loading states and error handling
- Accessible design following best practices

### Technical Implementation
- TypeScript for type safety
- Component-based architecture
- Proper error handling and validation
- Clean separation of concerns
- Maintainable and extensible codebase

## Success Criteria
- Application successfully integrates with all three LLM providers
- Beautiful, modern UI that follows the provided style guide
- Conversation history persists across browser sessions
- Markdown responses render properly
- Code follows established guidelines and best practices
- Ready for deployment to AWS S3/CloudFront
- Maintainable codebase with clear documentation