import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [bookData, setBookData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        lang: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert price to number before sending
        const requestData = { ...bookData, price: Number(bookData.price) };

        console.log("Submitting book data:", requestData); // Debugging log

        try {
            await axios.post("https://book-heaven-backend.vercel.app/admin/add-book", requestData, {
                headers: {
                    id: localStorage.getItem("userId"),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Book added successfully!");
            navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } catch (error) {
            console.error("Error adding book:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to add book");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Add New Book</h2>
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
                <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
