import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    

    try {
      const response = await axios.get("https://book-heaven-backend.vercel.app/cart/mycart", {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      console.log(response.data.cart)
      setCartItems(response.data.cart);
      calculateTotal(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`https://book-heaven-backend.vercel.app/cart/remove-from-cart`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          bookid: bookId,
          id: userId,
        },
      });
      

      const updatedCart = cartItems.filter((book) => book._id !== bookId);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing book from cart:", error);
    }
  };

  const handleMakeOrder = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    try {
      const response = await axios.post(
        "https://book-heaven-backend.vercel.app/myorders/place-order", { order: cartItems }, 
        // Ensure it's sent as an array
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,  // Sending user ID in headers
          },
        }
      );
  
      alert(response.data.message || "Order placed successfully!");
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };
  

  return (
    <div className="cart-container">
      <h2 className="cart-title" style={{textAlign:"center",color:"blueviolet",fontFamily:"monospace",fontSize:"2rem",}}>Your Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <ul className="cart-list" style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",gap:"30px"}}>
            {cartItems.map((book) => (
              <li key={book._id} className="cart-item" style={{textAlign:"center"}}>
                <img src={book.url} alt={book.title} className="cart-book-image" style={{width:"300px",height:"300px"}}/>
                <div className="cart-book-info">
                  <p className="cart-book-title">{book.title}</p>
                  {book.author && <p className="cart-book-author">by {book.author}</p>}
                  <p className="cart-book-price">₹{book.price || 0}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(book._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total" style={{display:"flex",justifyContent:"end",flexDirection:"column",alignItems:"end"}}>
            <h3>Total: ₹{totalPrice}</h3>
            <button className="order-btn" onClick={handleMakeOrder}>
              Make Order
            </button>
          </div>
        </>
      ) : (
        <p className="no-items">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
