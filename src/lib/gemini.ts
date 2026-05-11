import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not defined. AI features will not work.");
}

export const ai = new GoogleGenAI(apiKey || "");

export const MODELS = {
  FLASH: "gemini-1.5-flash",
  PRO: "gemini-1.5-pro",
  AUDIO: "gemini-1.5-flash", // Simplified for now
  MUSIC: "gemini-1.5-pro",
  VIDEO: "gemini-1.5-pro",
};
