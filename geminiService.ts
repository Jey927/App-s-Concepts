import { GoogleGenAI, Type } from "@google/genai";
import { Virtue, AIFeedback } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeReflection = async (
  virtue: Virtue, 
  reflection: string
): Promise<AIFeedback> => {
  
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    El usuario es un estudiante escolar. Ha registrado una entrada en su diario de virtudes.
    Virtud practicada: ${virtue}.
    Reflexión del estudiante: "${reflection}".
    
    Analiza esta entrada.
    1. Proporciona una frase corta y motivadora (encouragement).
    2. Sugiere un consejo práctico muy breve y concreto para mejorar o mantener esta virtud mañana (practicalTip).
    3. Asigna una puntuación del 1 al 10 basada en la profundidad de la reflexión (score).
    
    Responde estrictamente en JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            encouragement: { type: Type.STRING },
            practicalTip: { type: Type.STRING },
            score: { type: Type.INTEGER },
          },
          required: ["encouragement", "practicalTip", "score"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIFeedback;

  } catch (error) {
    console.error("Error analyzing reflection:", error);
    // Fallback in case of API error
    return {
      encouragement: "¡Buen trabajo registrando tu progreso hoy!",
      practicalTip: "Intenta notar una oportunidad pequeña para practicar esto mañana.",
      score: 5
    };
  }
};

export const generateWeeklyInsight = async (logs: any[]): Promise<string> => {
  // Simple check to avoid API call if no logs
  if (logs.length === 0) return "Registra tus virtudes para ver análisis aquí.";

  const model = 'gemini-2.5-flash';
  const logsText = logs.slice(0, 5).map(l => `- ${l.virtue}: ${l.reflection}`).join('\n');

  const prompt = `
    Analiza estos registros recientes de un estudiante:
    ${logsText}
    
    Escribe un resumen muy breve (máximo 2 frases) sobre su patrón de comportamiento y una palabra clave que defina su semana.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Sigue así.";
  } catch (error) {
    return "Continúa registrando tu progreso.";
  }
};