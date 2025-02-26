import React, { useState } from "react";
import axios from "axios";

const UpdateModal = ({ book, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ ...book });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const AdminId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // Check if token exists
        if (!AdminId || !token) {
            alert("Authentication failed. Please log in again.");
            return;
        }

        try {
            await axios.put(
                `https://book-heaven-backend.vercel.app/admin/update-book/${book._id}`,
                formData,
                {
                    headers: {
                        id: AdminId,
                        Authorization: `Bearer ${token}`, // Fixed placement
                    },
                }
            );

            onUpdate(); // Refresh book list
            onClose(); // Close modal
        } catch (error) {
            console.error("Error updating book", error);
            if (error.response?.status === 401) {
                alert("Unauthorized! Please log in again.");
            } else {
                alert("Failed to update book. Please try again.");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Update Book</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    <input type="text" name="lang" value={formData.lang} onChange={handleChange} required />
                    <textarea name="desc" value={formData.desc} onChange={handleChange} required></textarea>
                    
                    <div className="button-group">
                        <button type="submit" className="btn update-btn">Update</button>
                        <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
