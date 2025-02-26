// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // Get user role

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loginStatus");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("name");

//     navigate("/login"); // Redirect to login page after logout
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src="BookHeaven.webp" alt="logo" />
//         <span>BookHeaven</span>
//       </div>
//       <ul className="nav-links">
//         {role === "admin" ? (
//           <>
//             <li>
//               <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>Admin Dashboard</NavLink>
//             </li>
//             <li>
//               <NavLink to="/admin-orders" className={({ isActive }) => (isActive ? "active-link" : "")}>Admin-Orders</NavLink>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/books" className={({ isActive }) => (isActive ? "active-link" : "")}>All Books</NavLink>
//             </li>

//             {/* Show Cart & Profile only if user is logged in */}
//             {token && (
//               <>
//                 <li>
//                   <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")}>Cart</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/orders" className={({ isActive }) => (isActive ? "active-link" : "")}>My Orders</NavLink>
//                 </li>

                
//                 <li>
//                   <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>Profile</NavLink>
//                 </li>
//               </>
//             )}
//           </>
//         )}
//       </ul>

//       <div className="buttons">
//         {!token ? (
//           <>
//             <NavLink to="/login">
//               <button className="login-btn">Log In</button>
//             </NavLink>
//             <NavLink to="/signup">
//               <button className="signup-btn">Sign Up</button>
//             </NavLink>
//           </>
//         ) : (
//           <button className="logout-btn" onClick={handleLogout} style={{backgroundColor:"red"}}>Log Out</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Navbar.css"; // Ensure you have your Navbar.css file

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loginStatus");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("name");
//     navigate("/login");
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src="BookHeaven.webp" alt="logo" />
//         <span className="bookheaven">BookHeaven</span>
//       </div>

//       <button className="hamburger" onClick={toggleMobileMenu}>
//         {isMobileMenuOpen ? (
//           <span className="close-icon">X</span>
//         ) : (
//           <>
//             <div className="bar"></div>
//             <div className="bar"></div>
//             <div className="bar"></div>
//           </>
//         )}
//       </button>

//       <div className={`nav-container ${isMobileMenuOpen ? "active" : ""}`}>
//         <ul className="nav-links">
//           {role === "admin" ? (
//             <>
//               <li>
//                 <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/admin-orders" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Admin-Orders</NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/books" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>All Books</NavLink>
//               </li>
//               {token && (
//                 <>
//                   <li>
//                     <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Cart</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/orders" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>My Orders</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
//                   </li>
//                 </>
//               )}
//             </>
//           )}

//           <li className="mobile-buttons">
//             {!token ? (
//               <>
//                 <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="login-btn">Log In</button>
//                 </NavLink>
//                 <NavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="signup-btn">Sign Up</button>
//                 </NavLink>
//               </>
//             ) : (
//               <button className="logout-btn" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ backgroundColor: "red" }}>
//                 Log Out
//               </button>
//             )}
//           </li>
//         </ul>

//       </div>
//       <div className="desktop-buttons">
//         {!token ? (
//           <>
//             <NavLink to="/login">
//               <button className="login-btn">Log In</button>
//             </NavLink>
//             <NavLink to="/signup">
//               <button className="signup-btn">Sign Up</button>
//             </NavLink>
//           </>
//         ) : (
//           <button className="logout-btn" onClick={handleLogout} style={{ backgroundColor: "red" }}>
//             Log Out
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="BookHeaven.webp" alt="logo" />
        <span style={{fontSize:"20px"}}>BookHeaven</span>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <span className="close-icon">X</span>
        ) : (
          <>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </>
        )}
      </button>

      <div className={`nav-container ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          {role === "admin" ? (
            <>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/admin-orders" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Admin-Orders</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/books" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>All Books</NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>My Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
                  </li>
                </>
              )}
            </>
          )}

          {/* Corrected Mobile Buttons Logic */}
          {isMobileMenuOpen && (
            <li className="mobile-buttons">
              {!token ? (
                <div className = "mobile-buttons-container">
                  <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="login-btn">Log In</button>
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="signup-btn">Sign Up</button>
                  </NavLink>
                </div>
              ) : (
                <button className="logout-btn" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ backgroundColor: "red" }}>
                  Log Out
                </button>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Corrected Desktop Buttons Logic */}
      {!isMobileMenuOpen && (
        <div className="desktop-buttons">
          {!token ? (
            <>
              <NavLink to="/login">
                <button className="login-btn">Log In</button>
              </NavLink>
              <NavLink to="/signup">
                <button className="signup-btn">Sign Up</button>
              </NavLink>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout} style={{ backgroundColor: "red" }}>
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;