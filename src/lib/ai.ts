import { 
  gateway, 
  customProvider, 
  defaultSettingsMiddleware, 
  wrapLanguageModel 
} from 'ai';

export const aiProvider = customProvider({
  languageModels: {
    // Alias for the main chat and analysis model
    'agent-chat': wrapLanguageModel({
      model: gateway('openai/gpt-5.4'),
      middleware: defaultSettingsMiddleware({
        settings: {
          // You can add default settings here if needed
        },
      }),
    }),
    // Alias for the image generation model
    'image-gen': gateway('google/gemini-3.1-flash-image-preview'),
  },
  textEmbeddingModels: {
    'tweet-embedding': gateway('openai/text-embedding-3-small'),
  },
  // Fallback to gateway for other models
  fallbackProvider: gateway,
});
