import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
    const { bookid } = useParams(); // Get book ID from URL
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        lang: "",
    });

    useEffect(() => {
        // Fetch existing book data
        const fetchBook = async () => {
            try {
                console.log(bookid)
                const response = await axios.get(`https://book-heaven-backend.vercel.app/admin/get-book-info/${bookid}`, {
                    headers: {
                        id: localStorage.getItem("userId"),
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBookData(response.data.getbook); // Pre-fill form
            } catch (error) {
                console.error("Error fetching book:", error.response?.data || error.message);
                alert("Failed to fetch book details");
            }
        };

        fetchBook();
    }, [bookid]);

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert price to number before sending
        const updatedData = { ...bookData, price: Number(bookData.price) };

        console.log("Updating book data:", updatedData); // Debugging log

        try {
            await axios.put(`https://book-heaven-backend.vercel.app/admin/update-book/${bookid}`, updatedData, {
                headers: {
                    id: localStorage.getItem("userId"),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            alert("Book updated successfully!");
            navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } catch (error) {
            console.error("Error updating book:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to update book");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Edit Book</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
                <input 
                    type="text" name="title" placeholder="Title" required 
                    value={bookData.title} onChange={handleChange} 
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input 
                    type="text" name="author" placeholder="Author" required 
                    value={bookData.author} onChange={handleChange} 
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input 
                    type="number" name="price" placeholder="Price" required 
                    value={bookData.price} onChange={handleChange} 
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <textarea
                    name="desc" placeholder="Description" required
                    value={bookData.desc} onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", height: "100px" }}
                />
                <input 
                    type="text" name="lang" placeholder="Language" required 
                    value={bookData.lang} onChange={handleChange} 
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input 
                    type="text" name="url" placeholder="Image URL" required 
                    value={bookData.url} onChange={handleChange} 
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default EditBook;
