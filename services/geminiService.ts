import { GoogleGenAI } from "@google/genai";


const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

const apiKey = getApiKey();


const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const CACHE_KEY = 'cinematique_narrative_cache';
const COOLDOWN_KEY = 'cinematique_api_cooldown';
const COOLDOWN_DURATION = 60000;

export const generateNarrative = async (topic: string) => {
  // Check Cache first
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) return cached;

  // Fallback if no AI instance (e.g. local dev without key)
  if (!ai) {
    return "My work blends minimalist aesthetics, technical mastery, and the quiet intuition that comes from a mindful heart.";
  }

  // Check Cooldown
  const lastErrorTime = sessionStorage.getItem(COOLDOWN_KEY);
  if (lastErrorTime) {
    const timePassed = Date.now() - parseInt(lastErrorTime, 10);
    if (timePassed < COOLDOWN_DURATION) {
      return "My work blends minimalist aesthetics, technical mastery, and the quiet intuition that comes from a mindful heart.";
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, cinematic, and professional one-paragraph introduction about ${topic}. The tone should be mysterious, premium, and sophisticated. Keep it under 40 words.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const text = response.text?.trim() || "Designing digital worlds with intention, depth, and soul.";
    sessionStorage.setItem(CACHE_KEY, text);
    return text;

  } catch (error: any) {
    if (error?.message?.includes('429')) {
      sessionStorage.setItem(COOLDOWN_KEY, Date.now().toString());
    }
    return "A motion-focused creative technologist defining the future of digital interaction through code and vision.";
  }
};