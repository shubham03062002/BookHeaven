// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import UpdateModal from "./UpdateModal";

// const AdmDash = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const fetchBooks = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/admin/get-all-books");
//             setBooks(res.data.books);
//         } catch (error) {
//             console.error("Error fetching books", error);
//         }
//     };

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     const handleDelete = async (id) => {
//         const UserID = localStorage.getItem("userId");
//         const token = localStorage.getItem("token");
    
//         if (!UserID) {
//             console.error("User ID not found in localStorage");
//             return;
//         }
    
//         if (window.confirm("Are you sure you want to delete this book?")) {
//             try {
//                 await axios.delete(`http://localhost:5000/admin/delete-book/${id}`, {
//                     headers: {
//                         id: UserID,
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 fetchBooks();
//             } catch (error) {
//                 console.error("Error deleting book:", error.response?.data || error.message);
//             }
//         }
//     };

//     const openUpdateModal = (book) => {
//         setSelectedBook(book);
//         setIsModalOpen(true);
//     };

//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h2 style={{ textAlign: "center", color: "#333" }}>Admin Dashboard</h2>
//             <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//                 <thead>
//                     <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Image</th>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Author</th>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Language</th>
//                         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {books.map((book) => (
//                         <tr key={book._id} style={{ borderBottom: "1px solid #ddd" }}>
//                             <td style={{ padding: "10px", textAlign: "center" }}>
//                                 <img src={book.url} alt="Book" style={{ height: "100px", borderRadius: "5px" }} />
//                             </td>
//                             <td style={{ padding: "10px" }}>{book.title}</td>
//                             <td style={{ padding: "10px" }}>{book.author}</td>
//                             <td style={{ padding: "10px" }}>${book.price}</td>
//                             <td style={{ padding: "10px" }}>{book.lang}</td>
//                             <td style={{ padding: "10px", textAlign: "center" }}>
//                                 <FaEdit style={{ color: "#007bff", cursor: "pointer", marginRight: "10px" }} onClick={() => openUpdateModal(book)} />
//                                 <FaTrash style={{ color: "#dc3545", cursor: "pointer" }} onClick={() => handleDelete(book._id)} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {isModalOpen && <UpdateModal book={selectedBook} onClose={() => setIsModalOpen(false)} onUpdate={fetchBooks} />}
//         </div>
//     );
// };

// export default AdmDash;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdmDash = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate(); // Navigation hook

    const fetchBooks = async () => {
        try {
            const res = await axios.get("https://book-heaven-backend.vercel.app/admin/get-all-books");
            setBooks(res.data.books);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const UserID = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!UserID) {
            console.error("User ID not found in localStorage");
            return;
        }

        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(`https://book-heaven-backend.vercel.app/admin/delete-book/${id}`, {
                    headers: {
                        id: UserID,
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error.response?.data || error.message);
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Admin Dashboard</h2>

            {/* Add Book Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button 
                    onClick={() => navigate("/add-book")} // Navigate to Add Book Page
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Add Book
                </button>
            </div>

            {/* Books Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Image</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Author</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Language</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                                <img src={book.url} alt="Book" style={{ height: "100px", borderRadius: "5px" }} />
                            </td>
                            <td style={{ padding: "10px" }}>{book.title}</td>
                            <td style={{ padding: "10px" }}>{book.author}</td>
                            <td style={{ padding: "10px" }}>${book.price}</td>
                            <td style={{ padding: "10px" }}>{book.lang}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                                <Link to={`/edit-book/${book._id}`}><FaEdit 
                                    style={{ color: "#007bff", cursor: "pointer", marginRight: "10px" }} 
                                    onClick={() => navigate(`/edit-book/${book._id}`)} // Navigate to Edit Page
                                /></Link>
                                
                                <FaTrash 
                                    style={{ color: "#dc3545", cursor: "pointer" }} 
                                    onClick={() => handleDelete(book._id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdmDash;
