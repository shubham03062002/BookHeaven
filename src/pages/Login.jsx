import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");

    try {
      const response = await axios.post("https://book-heaven-backend.vercel.app/user/sign-in", {
        username: formData.username,
        password: formData.password,
      });

      toast.dismiss(); // Remove loading toast

      if (response.status === 200) {
        const { userID,role,token,name, } = response.data;

        // Store login details in localStorage
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userID);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        navigate("/")
        toast.success(`Welcome, ${name}!`);


      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" reverseOrder={false} />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Login</button>
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
  marginBottom:"100px",
  marginTop:"100px"

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
