import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-heaven-backend.vercel.app/admin/get-all-books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="loading-text">Loading books...</p>;

  return (
    <div className="all-books-container">
      <h2 className="section-title">All Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card" style={{minWidth:"300px",minHeight:"450px"}}>
            <img src={book.url} alt={book.title} className="book-image"style={{width:"auto"}} />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">By {book.author}</p>
            <p className="book-price">₹{book.price}</p>
            <Link to={`/book/${book._id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
