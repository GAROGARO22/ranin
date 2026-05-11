import { ai as gemini, MODELS as GEMINI_MODELS } from "./gemini";

export type AIProvider = "gemini" | "openai" | "anthropic" | "suno" | "elevenlabs";

export interface AIRequestOptions {
  provider?: AIProvider;
  model?: string;
  systemInstruction?: string;
  responseMimeType?: string;
}

class AIOrchestrator {
  private providers: Record<AIProvider, any> = {
    gemini: gemini,
    openai: null, // To be implemented
    anthropic: null, // To be implemented
    suno: null, // To be implemented
    elevenlabs: null, // To be implemented
  };

  async generateText(prompt: string, options: AIRequestOptions = {}) {
    const provider = options.provider || "gemini";
    
    if (provider === "gemini") {
      if (!gemini) {
        throw new Error("عذراً، يجب إعداد مفتاح API الخاص بـ Gemini أولاً لتفعيل ميزات الذكاء الاصطناعي.");
      }
      const model = options.model || GEMINI_MODELS.PRO;
      try {
        const response = await gemini.getGenerativeModel({ 
          model,
          systemInstruction: options.systemInstruction
        }).generateContent(prompt);
        
        return response.response.text();
      } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
      }
    }

    // Add more providers here as needed
    throw new Error(`Provider ${provider} is not yet implemented or configured.`);
  }

  async generateJSON(prompt: string, options: AIRequestOptions = {}) {
    return this.generateText(prompt, { 
      ...options, 
      responseMimeType: "application/json" 
    });
  }

  // Audio generation logic (Placeholder for Suno/ElevenLabs)
  async generateAudio(text: string, options: AIRequestOptions = {}) {
    const provider = options.provider || "elevenlabs";
    console.log(`Generating audio for: "${text}" using ${provider}`);
    // This will connect to real APIs
    return { url: "https://example.com/audio.mp3" };
  }
}

export const orchestrator = new AIOrchestrator();
