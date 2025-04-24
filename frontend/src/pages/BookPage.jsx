import React, { useEffect, useState } from "react";
import { useBookStore } from "../store/bookStore";

const BookPage = () => {
  const { books, fetchBooks, deleteBook, updateBook, isLoading, error } = useBookStore();
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  };

  const handleEdit = (book) => {
    const updatedTitle = prompt("Update book title:", book.title);
    if (updatedTitle) {
      updateBook(book._id, { ...book, title: updatedTitle });
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-12 py-10 bg-[#FFFCF2] text-[#252422]">
      <h2 className="text-center text-3xl font-bold mb-10 tracking-wide">📚 Book Library</h2>

      {isLoading && (
        <div className="text-center text-lg font-semibold text-gray-500 animate-pulse">
          Loading books...
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 font-medium mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={book.image || "/default-book.jpg"}
              alt={book.title}
              className="w-full h-52 object-contain bg-gray-100 rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#403D39]">{book.title}</h3>
            {book.subtitle && <p className="text-gray-500 italic mt-1">{book.subtitle}</p>}
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Author:</span> {book.author}
            </p>
            <p className="text-sm text-gray-700 mt-3">{book.review}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPage;
