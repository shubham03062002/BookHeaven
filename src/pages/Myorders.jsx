import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("https://book-heaven-backend.vercel.app/myorders/get-order-history", {
                    headers: { id: localStorage.getItem("userId"),Authorization:`Bearer ${localStorage.getItem("token")}` },
                });
                setOrders(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 myordersection">
            <h2 className="text-2xl font-semibold mb-4 center" style={{textAlign:"center",color:"blueviolet"}}>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="space-y-4" style={{display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: "30px",
                    flexWrap: "wrap"}}>
                    {orders.map((order) => (
                        <li key={order._id} className="border p-4 rounded-lg shadow" style={{textAlign:"center"}} >
                            <img src={order.book?.url} alt="" height={"200px"} width={"200px"} />
                            <p><strong>Book:</strong> {order.book?.title || "Unknown"}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;

