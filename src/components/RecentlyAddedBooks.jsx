import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecentlyAddedBooks = () => {
  const [recent, setRecent] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State for user role

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Get role from localStorage
    setUserLoggedIn(!!token);
    setUserRole(role); // Set user role

    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-heaven-backend.vercel.app/admin/get-recent-books");
        setRecent(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle adding a book to favorites
  const handleAddToFavorites = async (bookId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please log in to add to favorites.");
      return;
    }

    try {
      const response = await axios.put(
        "https://book-heaven-backend.vercel.app/favorite/add-to-fav",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
            bookid: bookId,
            id: userId,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add book to favorites.");
    }
  };

  // Function to handle adding a book to cart
  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please log in to add to cart.");
      return;
    }

    try {
      const response = await axios.put(
        "https://book-heaven-backend.vercel.app/cart/add-to-cart",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
            bookid: bookId,
            id: userId,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add book to cart.");
    }
  };

  return (
    <section className="recent-books">
      <h2 style={{ marginBottom: "30px", color: "cornflowerblue" }}>Recently Added Books</h2>
      <div className="book-list" >
        {recent.length > 0 ? (
          recent.map((book) => (
            <div key={book._id} className="book-card" style={{height:"fit-content"}}>
              <Link to={`/book/${book._id}`} className="book-card-link" style={{textDecoration:"none"}}>
                <img src={book.url} alt={book.title} className="book-image" style={{ width: "auto" }} />
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                {/* <p className="description">{book.desc}</p> */}
              </Link>

              {/* Show buttons only if the user is logged in and NOT an admin */}
              {userLoggedIn && userRole !== "admin" && (
                <div className="book-actions">
                  <button
                    onClick={() => handleAddToFavorites(book._id)}
                    className="btn btn-favorite"
                    style={{ width: "100%" }}
                  >
                    ❤️ Add to Favorites
                  </button>
                  <button
                    onClick={() => handleAddToCart(book._id)}
                    className="btn btn-cart"
                    style={{ width: "100%" }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading recent books...</p>
        )}
      </div>
    </section>
  );
};

export default RecentlyAddedBooks;


