/**
 * EmptyState Component
 * Shown when there are no messages yet (optional)
 * Shows suggested questions to help users get started
 */
function EmptyState({ onSuggestionClick }) {
  // Suggested starter questions
  const suggestions = [
    {
      icon: "📚",
      text: "Explain what a linked list is",
      question: "What is a linked list? Explain it simply with examples."
    },
    {
      icon: "🔍",
      text: "How does binary search work?",
      question: "How does binary search work? Explain step by step."
    },
    {
      icon: "⚡",
      text: "What's Big O notation?",
      question: "What is Big O notation? Why is it important?"
    },
    {
      icon: "🌳",
      text: "Explain tree traversals",
      question: "What are the different tree traversal methods? Explain each one."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      {/* Welcome section */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎓</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to DSA Instructor!
        </h2>
        <p className="text-gray-600 max-w-md">
          I'm here to help you learn Data Structures and Algorithms. 
          Ask me anything, or try one of these suggestions:
        </p>
      </div>
      
      {/* Suggestion cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.question)}
            className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
          >
            {/* Icon and text */}
            <div className="flex items-center gap-3">
              <div className="text-3xl">{suggestion.icon}</div>
              <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                {suggestion.text}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Footer hint */}
      <p className="text-sm text-gray-500 mt-8">
        💡 Tip: I can help with concepts, code problems, complexity analysis, and more!
      </p>
    </div>
  );
}

export default EmptyState;