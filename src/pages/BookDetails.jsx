import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token); // Check if user is logged in

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://book-heaven-backend.vercel.app/admin/get-book-info/${id}`
        );
        console.log(response);
        setBook(response.data.getbook);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please log in to add to favorites.");
      return;
    }

    try {
      const response = await axios.put(
        "https://book-heaven-backend.vercel.app/favorite/add-to-fav",
        {}, // No body required
        {
          headers: {
            authorization: `Bearer ${token}`,
            bookid: id,
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

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role  = localStorage.getItem("role")

    if (!token || !userId) {
      alert("Please log in to add to cart.");
      return;
    }

    try {
      const response = await axios.put(
        "https://book-heaven-backend.vercel.app/cart/add-to-cart",
        {}, // No body required
        {
          headers: {
            authorization: `Bearer ${token}`,
            bookid: id,
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

  if (!book)
    return <p className="loading-text">Loading book details...</p>;

  return (
    <div className="book-details-container">
      <div className="book-card" style={{ width: "80vw", height: "fit-content" }}>
        <img src={book.url} alt={book.title} className="book-image" style={{ width: "auto", height: "auto" }} />
        <div>
          <h2 className="book-title">{book.title}</h2>
          <p className="book-author"><strong>Author:</strong> {book.author}</p>
          <p className="book-price"><strong>Price:</strong> ₹{book.price}</p>
          <p className="book-language"><strong>Language:</strong> {book.lang}</p>
          <p className="book-description">{book.desc}</p>

          {/* Show buttons only if the user is logged in */}
          {userLoggedIn &&   (
            <div className="book-actions">
              <button onClick={handleAddToFavorites} className="btn btn-favorite" style={{ width: "100%" }}>
                ❤️ Add to Favorites
              </button>
              <button onClick={handleAddToCart} className="btn btn-cart" style={{ width: "100%" }}>
                🛒 Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
