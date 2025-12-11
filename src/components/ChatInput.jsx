import { useState } from "react";

/**
 * ChatInput Component
 * Enhanced input with character counter and better UX
 */
function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");
  
  // Maximum message length (Gemini has token limits)
  const MAX_LENGTH = 500;
  
  // Calculate remaining characters
  const remaining = MAX_LENGTH - input.length;
  
  // Determine if we're near the limit
  const isNearLimit = remaining < 50;
  const isOverLimit = remaining < 0;

  const handleSend = () => {
    // Don't send if empty or over limit
    if (input.trim() === "" || isOverLimit) return;
    
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* Input container */}
        <div className="flex gap-3">
          {/* Text input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              placeholder="Ask me anything about DSA..."
              maxLength={MAX_LENGTH} // HTML max length validation
              className={`w-full border rounded-xl px-5 py-3 pr-16 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
                isOverLimit
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            
            {/* Character counter - positioned inside input */}
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium ${
                isOverLimit
                  ? "text-red-600"
                  : isNearLimit
                  ? "text-orange-500"
                  : "text-gray-400"
              }`}
            >
              {remaining}
            </div>
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={disabled || input.trim() === "" || isOverLimit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {/* Icon changes based on state */}
            {disabled ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <span>🚀</span>
              </>
            )}
          </button>
        </div>
        
        {/* Helper text */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd> to send, 
            <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs ml-1">Shift+Enter</kbd> for new line
          </p>
          
          {/* Warning if over limit */}
          {isOverLimit && (
            <p className="text-xs text-red-600 font-medium">
              Message too long! Please shorten it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInput;