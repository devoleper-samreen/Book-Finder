import { BookOpen, Star, User, Calendar } from "lucide-react";

const BookCard = ({
  book,
  darkMode,
  favorites,
  toggleFavorite,
  setSelectedBook,
  setShowModal,
}) => {
  console.log("favorites", favorites);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden`}
    >
      <div className="relative">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => {
              setSelectedBook(book);
              setShowModal(true);
            }}
          />
        ) : (
          <div
            className={`w-full h-64 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } flex items-center justify-center cursor-pointer`}
            onClick={() => {
              setSelectedBook(book);
              setShowModal(true);
            }}
          >
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => toggleFavorite(book.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            favorites.includes(book.id)
              ? "bg-yellow-400 text-yellow-800"
              : `${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-600"
                }`
          } shadow-md hover:scale-110 transition-transform`}
        >
          <Star
            className={`w-5 h-5 ${
              favorites.includes(book.id) ? "fill-current" : ""
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3
          className={`font-bold text-lg mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          } line-clamp-2`}
        >
          {book.title}
        </h3>
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          <span>{book.author}</span>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{book.publishYear}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
