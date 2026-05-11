import { orchestrator } from "./ai-orchestrator";

export interface AudioOptions {
  voice?: string;
  style?: string;
  speed?: number;
}

class AudioEngine {
  async generatePoemSong(poemContent: string, style: string = "خليجي") {
    console.log(`Generating song for poem in style: ${style}`);
    
    // In a real scenario, this would call Suno AI API via orchestrator
    try {
      const response = await orchestrator.generateAudio(poemContent, {
        provider: "suno",
        model: "v3.5"
      });
      
      return response.url;
    } catch (error) {
      console.error("Audio Generation Error:", error);
      return null;
    }
  }

  async generateTTS(text: string, voiceId: string = "arabic-male-1") {
    console.log(`Generating TTS for: ${text}`);
    
    try {
      const response = await orchestrator.generateAudio(text, {
        provider: "elevenlabs",
        model: voiceId
      });
      
      return response.url;
    } catch (error) {
      console.error("TTS Error:", error);
      return null;
    }
  }
}

export const audioEngine = new AudioEngine();
