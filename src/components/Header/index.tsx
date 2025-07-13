export const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-primary-600/20"></div>

      {/* Header content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6">
        {/* Logo/Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4a1 1 0 011-1h4m0 0v1m0-1h6m0 0v1m0-1h4a1 1 0 011 1v4m0 0h-1m1 0v6m0 0h-1m1 0v4a1 1 0 01-1 1h-4m0 0v-1m0 1h-6m0 0v-1m0 1H5a1 1 0 01-1-1v-4m0 0h1m-1 0V8m0 0h1"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Image Resize Calculator
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 text-center max-w-2xl">
          Calculate perfect proportions for your image resizing needs
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-primary-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 right-20 w-1 h-1 bg-primary-300 rounded-full animate-pulse delay-700"></div>
      </div>
    </header>
  );
};
