import { useState } from "react";

/**
 * ChatInput Component
 * Input box and send button for user messages
 * 
 * Props:
 * - onSendMessage: function to call when user sends a message
 * - disabled: whether input should be disabled (e.g., while loading)
 */
function ChatInput({ onSendMessage, disabled }) {
  // Local state to track what user is typing
  // This is the text in the input box
  const [input, setInput] = useState("");

  /**
   * Handles sending the message
   * Called when user clicks Send button or presses Enter
   */
  const handleSend = () => {
    // Trim removes whitespace from start and end
    // If message is empty or only spaces, don't send
    if (input.trim() === "") return;

    // Call the parent component's function with the message
    // Parent (ChatContainer) will handle sending to API
    onSendMessage(input);

    // Clear the input box after sending
    setInput("");
  };

  /**
   * Handles Enter key press
   * Allows users to send message by pressing Enter (not Shift+Enter)
   */
  const handleKeyPress = (e) => {
    // Check if Enter was pressed (not Shift+Enter)
    // e.key is the key that was pressed
    // e.shiftKey is true if Shift was held down
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default Enter behavior (adding new line)
      e.preventDefault();
      // Send the message
      handleSend();
    }
    // If Shift+Enter, allow default behavior (new line)
  };

  return (
    <div className="border-t border-gray-300 bg-white p-4">
      {/* flex makes input and button sit side by side */}
      <div className="flex gap-2">
        {/* Text input box */}
        <input
          type="text"
          // value connects input to state (controlled component)
          value={input}
          // onChange updates state every time user types
          // e.target.value is the current text in the input
          onChange={(e) => setInput(e.target.value)}
          // onKeyPress handles Enter key
          onKeyPress={handleKeyPress}
          // Disable input while loading
          disabled={disabled}
          placeholder="Ask me anything about DSA..."
          // flex-1 makes input take all available space
          // border, rounded, px-4, py-2 are styling classes
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          // Disable if input is empty or while loading
          disabled={disabled || input.trim() === ""}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

      {/* Hint text below input */}
      <p className="text-xs text-gray-500 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}

export default ChatInput;