import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoriteBooks();
    }
  }, [user]); 

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Unauthorized: Token or User ID missing");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://book-heaven-backend.vercel.app/user/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });

      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteBooks = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get("https://book-heaven-backend.vercel.app/favorite/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });

      setFavoriteBooks(response.data.favourites);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };

  const handleRemoveFromFavorites = async (bookId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      await axios.put(
        "https://book-heaven-backend.vercel.app/favorite/remove-from-fav/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
            bookid: bookId,
          },
        }
      );

      setFavoriteBooks(favoriteBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  };

  const handleUpdateAvatar = async () => {
       if (!newAvatar.trim()) return alert("Avatar URL cannot be empty!");
    
         //const token = localStorage.getItem("token");
    //     const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
  
      try {
        await axios.put(
          "https://book-heaven-backend.vercel.app/user/update-avatar",
          { avatar: newAvatar },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: userId,
            },
          }
        );
  
        alert("Avatar updated!");
        setUser({ ...user, avatar: newAvatar });
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    };
  
  const handleUpdateAddress = async () => {
    if (!newAddress.trim()) return alert("Address cannot be empty!");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      await axios.put(
        "https://book-heaven-backend.vercel.app/user/update-address",
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        }
      );

      alert("Address updated!");
      setUser({ ...user, address: newAddress });
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };


  const handleAddToCart = async (bookId) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
    
        try {
          await axios.put(
            "https://book-heaven-backend.vercel.app/cart/add-to-cart",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                id: userId,
                bookid: bookId,
              },
            }
          );
    
          alert("Book added to cart!");
        } catch (error) {
          console.error("Error adding book to cart:", error);
        }
      };
    



  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container" style={{marginTop:"30px"}}>
      <h2>Profile</h2>

      <div className="profile-info">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>


      <div style={{ marginTop: "10px" }}>
           <input
            type="text"
            placeholder="New Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button onClick={handleUpdateAddress} style={{ padding: "5px 10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
            Update Address
          </button>
        </div>

        {/* Update Avatar */}
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="New Avatar URL"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button onClick={handleUpdateAvatar} style={{ padding: "5px 10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
            Update Avatar
          </button>
        </div>

      <div className="favorite-books">
        <h3>Favorite Books</h3>

        {favoriteBooks.length > 0 ? (
          <ul className="book-list">
            {favoriteBooks.map((book) => (
              <li key={book._id} className="book-item">
                <img src={book.url} alt={book.title} className="book-image" />
                <div className="book-details">
                  <p className="book-title">{book.title}</p>
                  {book.author && <p className="book-author">by {book.author}</p>}
                  {book.price && <p className="book-price">₹{book.price}</p>}
                </div>
                <div className="book-actions">
                  <button className="remove-btn" onClick={() => handleRemoveFromFavorites(book._id)}>Remove</button>
                  <button className="cart-btn" onClick={()=>handleAddToCart(book._id)}>Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-books">No favorite books added.</p>
        )}
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2, h3 {
          text-align: center;
        }

        .profile-info {
          text-align: center;
          margin-bottom: 20px;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        .favorite-books {
          text-align: center;
        }

        .book-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          justify-content: center;
        }

        .book-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
          transition: 0.3s;
          flex-direction: column;
          text-align: center;
        }

        .book-item:hover {
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .book-image {
          width: 80px;
          height: 120px;
          border-radius: 5px;
          object-fit: cover;
        }

        .book-details {
          flex: 1;
        }

        .book-title {
          font-weight: bold;
          margin: 0;
        }

        .book-author, .book-price {
          font-size: 14px;
          margin: 0;
          color: #555;
        }

        .book-actions {
          display: flex;
          gap: 5px;
          flex-direction: column;
        }

        .remove-btn, .cart-btn {
          border: none;
          padding: 7px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .remove-btn {
          background-color: #ff4d4d;
          color: white;
        }

        .cart-btn {
          background-color: #4CAF50;
          color: white;
        }

        .loading, .error, .no-books {
          text-align: center;
          font-size: 16px;
          color: #777;
        }

        @media (max-width: 770px) {
          .book-item {
            flex-direction: column;
            text-align: center;
            padding: 15px;
          }

          .profile-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          margin-top:100px;
        }

          .book-actions {
            flex-direction: row;
          }

          .remove-btn, .cart-btn {
            font-size: 12px;
            padding: 5px;
          }

          .avatar {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
