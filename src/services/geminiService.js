import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey:import.meta.env.VITE_GEMINI_API_KEY
});

export async function sendMessageToGemini(userMessage) {
    try {
        //prompt 
        const systemPrompt = `You are an expert Data Structures and Algorithms (DSA) instructor. Your role is to:
- Explain DSA concepts clearly and simply
- Break down problems step-by-step  
- Provide examples and analogies
- Be encouraging and patient
- Ask clarifying questions if needed
- Focus on helping students understand, not just giving answers

Student's question: ${userMessage}`
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });
  const aiResponse = response.text;
  return aiResponse;
} catch (error){
    console.error("Error calling Gemini API:", error);
    if (error.message?.includes("API key") || error.message?.includes("401")) {
      throw new Error("Invalid API key. Please check your VITE_GEMINI_API_KEY in the .env file.");
    }
    
    // Check if the error is related to quota/billing
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      throw new Error("API quota exceeded. Please check your Google AI Studio usage limits.");
    }
    
    // For any other error, throw a generic message
    // This prevents the app from crashing and shows a user-friendly message
    throw new Error("Failed to get response from AI. Please try again later.");
    }
}

export async function sendMessageWithHistory(userMessage,previousMesseages=[]){
    try {
        let conversationContext = previousMesseages
        .map(msg=>`${msg.role}:${msg.content}`)
        .join('\n');
        const fullPrompt = `You are an expert DSA instructor.

Previous conversation:
${conversationContext}

Student's new question: ${userMessage}

Please continue helping the student based on the conversation history.`;
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:fullPrompt,
        });
        return response.text;
    } catch(error){
        console.error("Error calling Gemini API with history:", error);
    throw new Error("Failed to get response from AI. Please try again.");
    }
    } 
