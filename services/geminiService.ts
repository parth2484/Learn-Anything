
import { GoogleGenAI, Type } from "@google/genai";
import type { CourseModule } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. Please provide a valid API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY" });

export const generateCourseOutline = async (topic: string): Promise<Omit<CourseModule, 'videos'>[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a comprehensive, beginner-friendly course outline for the topic: "${topic}". The outline should be a list of modules. Each module needs a concise 'title' and a brief 'description' of the key concepts it covers. Structure the output as a JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the course module."
              },
              description: {
                type: Type.STRING,
                description: "A brief description of what the module covers."
              }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const courseOutline = JSON.parse(jsonText);
    return courseOutline as Omit<CourseModule, 'videos'>[];
  } catch (error) {
    console.error("Error generating course outline:", error);
    throw new Error("Failed to generate course outline. Please check your Gemini API key and try again.");
  }
};
