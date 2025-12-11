/**
 * Header Component
 * Top navigation bar with title and logo
 */
function Header() {
  return (
    // Gradient background from blue to purple
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      {/* Container with padding */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Flex container - items aligned horizontally */}
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center gap-3">
            {/* Icon/Logo - using emoji for now */}
            <div className="bg-white text-blue-600 rounded-lg p-2 text-2xl">
              🎓
            </div>
            
            {/* Title and subtitle */}
            <div>
              <h1 className="text-2xl font-bold">DSA Instructor</h1>
              <p className="text-sm text-blue-100">
                Your AI-powered learning companion
              </p>
            </div>
          </div>
          
          {/* Right side - Status indicator (optional) */}
          <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {/* Green dot - online indicator */}
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;