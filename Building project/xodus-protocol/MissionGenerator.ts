import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function generateMission(type: string, location: string = "Skyline Sector") {
    if (!genAI) {
        console.warn("Gemini API key not found. Using fallback mission data.");
        return null;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    Generate a cyberpunk mission for the XODUS protocol. 
    Location: ${location}
    Mission Type: ${type}
    
    Return a JSON object with this exact structure:
    {
      "title": "A short, punchy mission name",
      "description": "A flavorful 2-sentence briefing",
      "objectives": ["Array of 3 clear tactical objectives"],
      "rewards": [
        {"label": "Currency/Item", "value": "Amount/Name"},
        {"label": "Faction/Status", "value": "Bonus info"}
      ],
      "risk": "Low" | "Medium" | "High" | "Critical"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
    } catch (error) {
        console.error("AI Generation failed:", error);
        return null;
    }
}
