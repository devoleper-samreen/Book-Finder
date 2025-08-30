import { SortAsc, SortDesc } from "lucide-react";

const Filters = ({ sortBy, setSortBy, sortOrder, setSortOrder, darkMode }) => {
  return (
    <div className="flex items-center gap-4">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`px-3 py-2 rounded-lg border transition-colors ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="year">Sort by Year</option>
      </select>

      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className={`p-2 rounded-lg transition-colors ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        aria-label="Toggle sort order"
      >
        {sortOrder === "asc" ? (
          <SortAsc className="w-5 h-5" />
        ) : (
          <SortDesc className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default Filters;
