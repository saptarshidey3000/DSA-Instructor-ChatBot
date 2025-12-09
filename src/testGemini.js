// Import our sendMessageToGemini function from the service we just created
// This is the function that talks to the Gemini API
import { sendMessageToGemini } from './services/geminiService.js';

/**
 * Test function to verify Gemini API is working
 * This is an async function because API calls take time
 */
async function testGeminiAPI() {
  // Print a message so we know the test started
  console.log("🧪 Testing Gemini API connection...\n");
  
  try {
    // Define a test question about DSA
    // This is what a real user might ask
    const testQuestion = "What is a binary tree? Explain it simply.";
    
    // Print the question we're sending
    console.log("📤 Sending question:", testQuestion);
    console.log("⏳ Waiting for AI response...\n");
    
    // Call our service function
    // await pauses execution until we get a response
    // The response is stored in the 'response' variable
    const response = await sendMessageToGemini(testQuestion);
    
    // Print the AI's response
    console.log("✅ AI Response received:\n");
    console.log("=" .repeat(50)); // Print a line separator
    console.log(response);
    console.log("=".repeat(50));
    console.log("\n✨ Test successful! Gemini API is working.\n");
    
  } catch (error) {
    // If anything goes wrong, catch the error and print it
    // This helps us debug issues
    console.error("❌ Test failed!");
    console.error("Error message:", error.message);
    console.error("\n🔍 Troubleshooting tips:");
    console.error("1. Check that VITE_GEMINI_API_KEY is set in your .env file");
    console.error("2. Verify your API key is valid at https://aistudio.google.com/apikey");
    console.error("3. Make sure you installed the package: npm install @google/genai");
    console.error("4. Restart your dev server after changing .env file\n");
  }
}

// Run the test function
// This executes immediately when we run the file
testGeminiAPI();