import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://book-heaven-backend.vercel.app/myorders/get-all-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!newStatus) return alert("Please select a status.");

    try {
      await axios.put(
        `https://book-heaven-backend.vercel.app/myorders/update-order-status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Order status updated successfully.");
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading orders...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ margin: "0 auto", padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Admin Orders</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "8px 16px" }}>Order Image</th>
              <th style={{ padding: "8px 16px" }}>Order ID</th>
              <th style={{ padding: "8px 16px" }}>User</th>
              <th style={{ padding: "8px 16px" }}>Email</th>
              <th style={{ padding: "8px 16px" }}>Address</th>
              <th style={{ padding: "8px 16px" }}>Book</th>
              <th style={{ padding: "8px 16px" }}>Date</th>
              <th style={{ padding: "8px 16px" }}>Status</th>
              <th style={{ padding: "8px 16px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px 16px" }}>
                  <img src={order.book?.url} alt="" style={{ height: "150px", width: "auto", objectFit: "cover", borderRadius: "4px" }} />
                </td>
                <td style={{ padding: "8px 16px" }}>{order._id}</td>
                <td style={{ padding: "8px 16px" }}>{order.user?.username || "N/A"}</td>
                <td style={{ padding: "8px 16px" }}>{order.user?.email || "N/A"}</td>
                <td style={{ padding: "8px 16px" }}>{order.user?.address || "N/A"}</td>
                <td style={{ padding: "8px 16px" }}>{order.book?.title || "N/A"}</td>
                <td style={{ padding: "8px 16px" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "8px 16px", textAlign: "center" }}>
                  <span style={{ padding: "4px 8px", color: "white", borderRadius: "4px", backgroundColor: "blue" }}>
                    {order.status || "Pending"}
                  </span>
                </td>
                <td style={{ padding: "8px 16px" }}>
                  <select
                    style={{ border: "1px solid #e2e8f0", padding: "4px 8px", marginRight: "8px", borderRadius: "4px" }}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Change Status</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;