import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";
import { sendMessageToGemini } from "../services/geminiService";
import { WELCOME_MESSAGE } from "../constants/prompts";

/**
 * ChatContainer Component
 * Main chat interface with all improvements
 */
function ChatContainer() {
  // State: Messages array
  const [messages, setMessages] = useState([]);
  
  // State: Loading indicator
  const [loading, setLoading] = useState(false);
  
  // State: Error message
  const [error, setError] = useState("");
  
  // Ref: For auto-scrolling
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Check if chat is empty (no messages yet)
  const isEmpty = messages.length === 0;

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Auto-scroll when messages change
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]); // Also scroll when loading changes

  /**
   * Handle sending a message
   * Can be called from ChatInput or EmptyState suggestions
   */
  const handleSendMessage = async (userMessage) => {
    // Clear any previous errors
    setError("");
    
    // Validate message
    if (!userMessage || userMessage.trim() === "") {
      setError("Please enter a message");
      return;
    }
    
    // Add user's message immediately
    const userMessageObj = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMessageObj]);
    
    // Set loading state
    setLoading(true);

    try {
      // Call Gemini API
      const aiResponse = await sendMessageToGemini(userMessage);
      
      // Add AI response to messages
      const aiMessageObj = { role: "assistant", content: aiResponse };
      setMessages((prev) => [...prev, aiMessageObj]);
      
    } catch (err) {
      // Handle errors gracefully
      console.error("Error sending message:", err);
      
      // Show error to user
      setError(err.message || "Something went wrong. Please try again.");
      
      // Add error message to chat
      const errorMessageObj = {
        role: "assistant",
        content: `❌ I apologize, but I encountered an error: ${err.message}\n\nPlease try again. If the problem persists, check your internet connection and API key.`,
      };
      setMessages((prev) => [...prev, errorMessageObj]);
      
    } finally {
      // Always stop loading, whether success or error
      setLoading(false);
    }
  };
  
  /**
   * Handle clicking a suggestion in EmptyState
   */
  const handleSuggestionClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Show EmptyState if no messages */}
          {isEmpty ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <>
              {/* Render all messages */}
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              
              {/* Show loading indicator */}
              {loading && <LoadingMessage />}
              
              {/* Invisible div for auto-scroll */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Error Display - sticky at top of input area */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-3 animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            <p className="text-sm text-red-700 flex-1">{error}</p>
            {/* Close button */}
            <button
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default ChatContainer;