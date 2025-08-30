import { useState, useEffect, useMemo } from "react";
import { Heart, BookOpen } from "lucide-react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import LoadingSkeleton from "./components/LoadingSkeleton";

const App = () => {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Fetch multiple popular book titles to get a good variety
      const queries = ["javascript", "python", "fiction"];
      const allBooks = [];

      for (const query of queries) {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&limit=5`
        );

        const data = await response.json();
        console.log(query, data);

        if (data.docs) {
          allBooks.push(...data.docs);
          console.log("allBooks", allBooks);
        }
      }

      // Process and deduplicate books
      const processedBooks = allBooks
        .filter((book) => book.title && book.author_name && book.cover_i)
        .map((book, index) => ({
          id: book.key || `book-${index}`,
          title: book.title,
          author: book.author_name?.[0] || "Unknown Author",
          publishYear: book.first_publish_year || "Unknown",
          subjects: book.subject?.slice(0, 3) || ["General"],
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          isbn: book.isbn?.[0] || null,
          pages: book.number_of_pages_median || null,
        }))
        .filter(
          (book, index, self) =>
            index ===
            self.findIndex(
              (b) => b.title === book.title && b.author === book.author
            )
        )
        .slice(0, 30); // Limit to 30 books for better performance

      setBooks(processedBooks);
      setDisplayBooks(processedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Fallback dummy data
      const dummyBooks = [
        {
          id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          publishYear: 1925,
          subjects: ["Fiction", "Classic Literature"],
          cover: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
          pages: 180,
        },
        {
          id: "2",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          publishYear: 1960,
          subjects: ["Fiction", "Classic Literature"],
          cover: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
          pages: 281,
        },
      ];
      setBooks(dummyBooks);
      setDisplayBooks(dummyBooks);
    }
    setLoading(false);
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // // Handle search with autocomplete
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const titleSuggestions = filtered
        .map((book) => book.title)
        .filter((title, index, self) => self.indexOf(title) === index)
        .slice(0, 5);

      setSuggestions(titleSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, books]);

  // Filter and sort books
  useEffect(() => {
    let filtered = books;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((book) =>
        book.subjects.some((subject) =>
          subject.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "author":
          comparison = a.author.localeCompare(b.author);
          break;
        case "year":
          comparison = (a.publishYear || 0) - (b.publishYear || 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setDisplayBooks(filtered);
  }, [searchQuery, selectedCategory, sortBy, sortOrder, books]);

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  //get from localstorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  //save to localstorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  // Get favorite books
  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        favoritesCount={favorites.length}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {currentView === "home" && (
        <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-20 my-6 items-center justify-center">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            darkMode={darkMode}
          />

          <Filters
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            darkMode={darkMode}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSkeleton darkMode={darkMode} />
        ) : currentView === "home" ? (
          <>
            {/* Results Info */}
            <div className="mb-6">
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {searchQuery || selectedCategory !== "all"
                  ? `Found ${displayBooks.length} books`
                  : `All Books (${displayBooks.length})`}
              </h2>
            </div>

            {/* Books Grid */}
            {displayBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    darkMode={darkMode}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    setSelectedBook={setSelectedBook}
                    setShowModal={setShowModal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No books found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters to find more books.
                </p>
              </div>
            )}
          </>
        ) : (
          // Favorites View
          <>
            <div className="mb-6">
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                My Favorites ({favoriteBooks.length})
              </h2>
            </div>

            {favoriteBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    darkMode={darkMode}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    setSelectedBook={setSelectedBook}
                    setShowModal={setShowModal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No favorites yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start adding books to your favorites by clicking the star icon
                  on any book.
                </p>
                <button
                  onClick={() => setCurrentView("home")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Browse Books
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Book Details Modal */}
      {showModal && selectedBook && (
        <BookModal
          book={selectedBook}
          darkMode={darkMode}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onClose={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
        />
      )}

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-t`}
      >
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setCurrentView("home")}
            className={`cursor-pointer flex flex-col items-center p-2 ${
              currentView === "home"
                ? "text-blue-500"
                : `${darkMode ? "text-gray-400" : "text-gray-600"}`
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setCurrentView("favorites")}
            className={`cursor-pointer flex flex-col items-center p-2 relative ${
              currentView === "favorites"
                ? "text-blue-500"
                : `${darkMode ? "text-gray-400" : "text-gray-600"}`
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-1">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default App;
