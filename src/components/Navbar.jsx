import { Sun, Moon, Heart, BookOpen } from "lucide-react";

const Navbar = ({
  darkMode,
  toggleDarkMode,
  favoritesCount,
  currentView,
  setCurrentView,
}) => {
  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <BookOpen className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Book Finder</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentView("home")}
          className={`hidden lg:block px-3 cursor-pointer py-2 rounded-md text-sm font-medium ${
            currentView === "home" && "bg-blue-500 text-white"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentView("favorites")}
          className={`hidden lg:block items-center cursor-pointer gap-1 px-3 py-2 rounded-md text-sm font-medium ${
            currentView === "favorites" && "bg-blue-500 text-white"
          }`}
        >
          <Heart className="w-4 h-4 text-red-500 lg:hidden" />
          Favorites ({favoritesCount})
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 cursor-pointer rounded-full hover:bg-gray-200 transition dark:hover:text-gray-500"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
