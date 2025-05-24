
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Safely access API_KEY from environment variables
// This checks if 'process', 'process.env', and 'process.env.API_KEY' exist.
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY)
  ? process.env.API_KEY
  : undefined;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found (process.env.API_KEY was not set or 'process' is undefined in this environment). AI features will be disabled.");
}

export const askGeminiForCurrencyConversion = async (query: string): Promise<string> => {
  if (!ai) {
    return "Gemini API not configured. Please ensure API_KEY is available (e.g., via process.env or other means).";
  }

  const model = "gemini-2.5-flash-preview-04-17"; // Recommended model
  const prompt = `You are a helpful currency converter. Answer the following currency conversion query as concisely as possible, providing only the numerical result or a short sentence with the result if a direct number isn't suitable. Query: "${query}"`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [{role: "user", parts: [{text: prompt}]}],
      config: {
        temperature: 0.2, // For factual, less creative answers
      }
    });
    
    let text = response.text.trim();
    
    // Basic cleanup if response is wrapped in markdown
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = text.match(fenceRegex);
    if (match && match[2]) {
      text = match[2].trim();
    }

    return text || "Could not get a response from AI.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for common API key related errors explicitly if possible
        if (error.message.includes("API key not valid")) {
            return "Gemini API Error: The API key is not valid. Please check your configuration.";
        }
        return `Gemini API Error: ${error.message}`;
    }
    return "An unknown error occurred with the Gemini API.";
  }
};
