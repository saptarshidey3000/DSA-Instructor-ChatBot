/**
 * LoadingMessage Component
 * Shows when AI is generating a response
 */
function LoadingMessage() {
  return (
    <div className="flex justify-start mb-4 animate-fadeIn">
      <div className="max-w-[75%] bg-white rounded-2xl rounded-bl-none px-5 py-3 shadow-md border border-gray-200">
        {/* Avatar and name */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
            🤖
          </div>
          <p className="text-xs font-semibold text-gray-600">AI Instructor</p>
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-gray-600 mb-2">Thinking...</p>
        
        {/* Animated dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingMessage;