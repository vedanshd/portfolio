import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// This function will generate a response from OpenAI based on the resume content and user query
export async function generateChatResponse(query: string, resumeContent: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for a portfolio website, answering questions about the resume owner based ONLY on the following resume information. NEVER make up information that is not present in the resume. If you don't know the answer, say so politely. 
          
RESUME CONTENT:
${resumeContent}

Answer questions in a professional, friendly tone. Keep responses relatively brief (under 150 words) and to the point. Format your responses with markdown for readability when appropriate.`
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}