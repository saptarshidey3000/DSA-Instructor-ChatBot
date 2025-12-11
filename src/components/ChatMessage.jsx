/**
 * ChatMessage Component
 * Displays a single message in the chat (either from user or AI)
 * 
 * Props:
 * - role: "user" or "assistant" - determines styling and alignment
 * - content: the actual message text
 */
function ChatMessage({ role, content }) {
  // Determine if this message is from the user
  // If role is "user", isUser will be true
  const isUser = role === "user";

  return (
    <div
      // Container for the message
      // flex makes children align horizontally
      // justify-start aligns to left (for AI), justify-end aligns to right (for user)
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        // The message bubble itself
        // max-w-[70%] means max width is 70% of container (prevents super wide messages)
        // Different colors for user vs AI messages
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none" // User: blue, sharp bottom-right corner
            : "bg-gray-200 text-gray-800 rounded-bl-none" // AI: gray, sharp bottom-left corner
        }`}
      >
        {/* Display who sent the message */}
        <p className="text-xs font-semibold mb-1 opacity-70">
          {isUser ? "You" : "AI Instructor"}
        </p>
        
        {/* The actual message content */}
        {/* whitespace-pre-wrap preserves line breaks and spaces */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;