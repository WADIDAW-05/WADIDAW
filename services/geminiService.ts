
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export async function getStylingAdvice(history: ChatMessage[], userPrompt: string) {
  try {
    // Fixed: Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the WADIDAW AI Stylist. WADIDAW is a futuristic, streetwear-focused fashion brand.
        Your tone is cool, trendy, and helpful. You should suggest outfits based on the user's mood, the weather, or specific occasions.
        Keep your answers concise and energetic. Refer to WADIDAW products like "Neon Hoodie", "Orbit Sneakers", and "Cyberpunk Tee".
        Avoid overly formal language. Use emojis related to fashion.`,
      },
    });

    // We don't need to pass the whole history to sendMessage if we use the chat object, 
    // but the API wrapper for sendMessage typically handles the message only.
    const response = await chat.sendMessage({ message: userPrompt });
    
    // Fixed: The GenerateContentResponse features a text property, not a method.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Wadidaw! I'm having a small glitch in my fashion matrix. Try again in a second!";
  }
}
