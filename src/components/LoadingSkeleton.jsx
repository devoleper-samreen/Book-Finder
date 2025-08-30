const LoadingSkeleton = ({ darkMode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse`}
      >
        <div
          className={`w-full h-64 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
        ></div>
        <div className="p-4">
          <div
            className={`h-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded mb-2`}
          ></div>
          <div
            className={`h-3 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded mb-2 w-3/4`}
          ></div>
          <div
            className={`h-3 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded w-1/2`}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
