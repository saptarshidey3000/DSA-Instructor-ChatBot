import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { sendMessageToGemini } from "../services/geminiService";
import { WELCOME_MESSAGE } from "../constants/prompts";

/**
 * ChatContainer Component
 * The main chat interface that manages messages and API calls
 */
function ChatContainer() {
  // State: Array of all messages in the chat
  // Each message: { role: "user" | "assistant", content: "text" }
  const [messages, setMessages] = useState([
    // Start with welcome message from AI
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);

  // State: Is the AI currently generating a response?
  const [loading, setLoading] = useState(false);

  // State: Any error that occurred
  const [error, setError] = useState("");

  // Ref: Reference to the messages container div
  // Refs let us access DOM elements directly
  // We'll use this to auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef(null);

  /**
   * Scrolls chat to bottom
   * Called after new messages are added
   */
  const scrollToBottom = () => {
    // messagesEndRef.current is the actual DOM element
    // scrollIntoView smoothly scrolls it into view
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * useEffect: Runs after every render when messages change
   * This automatically scrolls to bottom when new messages arrive
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array: run this effect when messages changes

  /**
   * Handles sending a user message
   * This function is passed to ChatInput as a prop
   */
  const handleSendMessage = async (userMessage) => {
    // Clear any previous errors
    setError("");

    // Add user's message to the chat immediately
    // Spread operator [...] creates new array with existing + new message
    const userMessageObj = { role: "user", content: userMessage };
    setMessages((prevMessages) => [...prevMessages, userMessageObj]);

    // Set loading to true (shows loading indicator)
    setLoading(true);

    try {
      // Call the Gemini API
      // await pauses until we get response
      const aiResponse = await sendMessageToGemini(userMessage);

      // Add AI's response to the chat
      const aiMessageObj = { role: "assistant", content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, aiMessageObj]);
    } catch (err) {
      // If API call fails, show error message
      setError(err.message);

      // Also add error as a message in chat
      const errorMessageObj = {
        role: "assistant",
        content: `❌ Sorry, I encountered an error: ${err.message}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessageObj]);
    } finally {
      // Whether success or error, stop loading
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">DSA Instructor</h1>
        <p className="text-sm opacity-90">
          Your personal Data Structures & Algorithms tutor
        </p>
      </div>

      {/* Messages Container */}
      {/* flex-1 makes this take all available space between header and input */}
      {/* overflow-y-auto adds scrollbar if content overflows */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Map over messages array and render ChatMessage for each */}
        {messages.map((message, index) => (
          // key helps React identify which items changed
          // index is okay here since messages are never reordered
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {/* Loading indicator - only shown when loading is true */}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-lg px-4 py-3 rounded-bl-none">
              <p className="text-xs font-semibold mb-1 opacity-70">
                AI Instructor
              </p>
              <p className="text-sm text-gray-600">Thinking...</p>
              {/* Animated dots */}
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        {/* Invisible div at the end - used for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Error display - only shown if error exists */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <p className="text-sm text-red-600">⚠️ {error}</p>
        </div>
      )}

      {/* Input box at bottom */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default ChatContainer;