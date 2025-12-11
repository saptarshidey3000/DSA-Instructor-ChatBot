/**
 * ChatMessage Component
 * Displays a single message with improved styling
 * 
 * Props:
 * - role: "user" or "assistant"
 * - content: message text
 */
function ChatMessage({ role, content }) {
  // Determine if message is from user
  const isUser = role === "user";

  /**
   * Format content to handle basic markdown-like syntax
   * This makes code blocks and bold text look better
   */
  const formatContent = (text) => {
    // Split by code blocks (```code```)
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // If this is a code block
      if (part.startsWith('```') && part.endsWith('```')) {
        // Remove the ``` markers
        const code = part.slice(3, -3).trim();
        
        return (
          <pre key={index} className="bg-gray-800 text-gray-100 p-3 rounded-lg my-2 overflow-x-auto">
            <code className="text-sm font-mono">{code}</code>
          </pre>
        );
      }
      
      // If this is bold text (**text**)
      // Use regex to find **text** and make it bold
      const boldFormatted = part.split(/(\*\*.*?\*\*)/g).map((segment, i) => {
        if (segment.startsWith('**') && segment.endsWith('**')) {
          return <strong key={i}>{segment.slice(2, -2)}</strong>;
        }
        return segment;
      });
      
      // Regular text
      return <span key={index}>{boldFormatted}</span>;
    });
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}
    >
      <div
        // Added max width and improved spacing
        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
        }`}
      >
        {/* Avatar and name section */}
        <div className="flex items-center gap-2 mb-2">
          {/* Avatar icon */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              isUser ? "bg-blue-700" : "bg-purple-100"
            }`}
          >
            {isUser ? "👤" : "🤖"}
          </div>
          
          {/* Name */}
          <p className={`text-xs font-semibold ${isUser ? "text-blue-100" : "text-gray-600"}`}>
            {isUser ? "You" : "AI Instructor"}
          </p>
        </div>
        
        {/* Message content with formatting */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;