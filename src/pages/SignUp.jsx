import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate =useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Signing up..."); // Show loading toast
    try {
      const response = await fetch("https://book-heaven-backend.vercel.app/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.dismiss(); // Remove loading toast
        toast.success(data.message || "Signed up successfully!");
        navigate("/login")
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.dismiss(); // Remove loading toast
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" reverseOrder={false} />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textAlign: "center",
  marginBottom:"60px",
  marginTop:"60px"
};

const inputStyle = {
  width: "85%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};
