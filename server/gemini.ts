import { GoogleGenerativeAI } from "@google/generative-ai";

// the newest Gemini model is "gemini-1.5-pro" which is highly capable and efficient
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// This function will generate a response from Gemini AI based on the resume content and user query
export async function generateChatResponse(query: string, resumeContent: string): Promise<string> {
  try {
    console.log("API Key loaded:", process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 10)}...` : "NOT SET");
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = gemini.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const prompt = `You are a helpful and friendly AI assistant for Vedansh Dhawan's portfolio website. You can:

1. **Answer questions about Vedansh** using the resume information below
2. **Handle general conversation** like greetings, thanks, how are you, etc.
3. **Be conversational and natural** while maintaining professionalism

RESUME CONTENT:
${resumeContent}

User Question: ${query}

Instructions:
- Be friendly and conversational for greetings (hi, hello, how are you, thanks, etc.)
- For resume-related questions, use the information provided above
- For questions not in the resume, politely redirect to topics you can help with
- Keep responses concise but engaging (under 150 words)
- Use emojis sparingly for a friendly tone
- Format with markdown when helpful
- If someone greets you, greet back and mention you can help them learn about Vedansh

Respond naturally to the user's question.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      return "I'm sorry, I couldn't generate a response. Please try asking in a different way.";
    }

    return text;
  } catch (error) {
    console.error("Error generating Gemini chat response:", error);
    
    // Provide specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API_KEY_INVALID") || error.message.includes("401")) {
        return "I'm sorry, there's an issue with the AI service configuration. Please try again later.";
      }
      if (error.message.includes("QUOTA_EXCEEDED") || error.message.includes("429")) {
        return "I'm sorry, the AI service is temporarily unavailable due to high demand. Please try again in a moment.";
      }
      if (error.message.includes("GEMINI_API_KEY is not configured")) {
        return "I'm sorry, the AI chat service is not currently configured. Please try again later.";
      }
    }
    
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}
