import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI(apiKey) : null;

if (!apiKey) {
  console.warn("تنبيه: VITE_GEMINI_API_KEY غير معرف. ميزات الذكاء الاصطناعي لن تعمل حتى يتم إضافة المفتاح.");
}

export const MODELS = {
  FLASH: "gemini-1.5-flash",
  PRO: "gemini-1.5-pro",
  AUDIO: "gemini-1.5-flash",
  MUSIC: "gemini-1.5-pro",
  VIDEO: "gemini-1.5-pro",
};
