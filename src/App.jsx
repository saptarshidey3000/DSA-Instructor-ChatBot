// Import our Gemini service function
import { sendMessageToGemini } from './services/geminiService';
// Import useState hook to manage component state
import { useState } from 'react';

function App() {
  // State to store the AI's response
  // response starts as empty string
  // setResponse is the function to update it
  const [response, setResponse] = useState("");
  
  // State to track if we're waiting for API response
  const [loading, setLoading] = useState(false);
  
  // State to store any errors that occur
  const [error, setError] = useState("");

  /**
   * Function that runs when user clicks "Test API" button
   * This is an async function because it waits for API response
   */
  const handleTest = async () => {
    // Clear any previous response or error
    setResponse("");
    setError("");
    
    // Set loading to true (shows "Loading..." message)
    setLoading(true);
    
    try {
      // Call our Gemini service with a test question
      const result = await sendMessageToGemini("What is a binary tree? Explain it simply.");
      
      // Store the response in state so it displays on screen
      setResponse(result);
      
    } catch (err) {
      // If something goes wrong, store the error message
      setError(err.message);
      
    } finally {
      // Whether success or error, set loading back to false
      // finally block always runs after try/catch
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          DSA Instructor Chatbot
        </h1>
        <p className="text-gray-600 mb-6">
          Testing Gemini API Connection
        </p>
        
        {/* Test Button */}
        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Loading..." : "🧪 Test Gemini API"}
        </button>
        
        {/* Display Loading State */}
        {loading && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700">Waiting for AI response...</p>
          </div>
        )}
        
        {/* Display Error if any */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold">❌ Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {/* Display AI Response */}
        {response && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-semibold mb-2">✅ AI Response:</p>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;