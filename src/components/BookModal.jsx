import { Star } from "lucide-react";

const BookModal = ({ book, onClose, darkMode, favorites, toggleFavorite }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <button
              onClick={onClose}
              className={`text-gray-500 hover:text-gray-700 text-2xl`}
            >
              ×
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {book.cover && (
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-48 h-72 object-cover rounded-lg mx-auto md:mx-0"
              />
            )}

            <div className="flex-1">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">Author</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {book.author}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Published Year</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {book.publishYear}
                  </p>
                </div>

                {book.pages && (
                  <div>
                    <h3 className="font-semibold">Pages</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {book.pages}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold">Subjects</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {book.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-sm rounded-full ${
                          darkMode
                            ? "bg-blue-900 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(book.id)}
                className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  favorites.includes(book.id)
                    ? "bg-yellow-400 text-yellow-800 hover:bg-yellow-500"
                    : `${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    favorites.includes(book.id) ? "fill-current" : ""
                  }`}
                />
                {favorites.includes(book.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
