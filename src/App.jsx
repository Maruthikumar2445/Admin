import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <div className="app-wrapper">
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "1.5rem 2rem 0 0" }}>
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "0.7rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(44,62,80,0.09)",
                transition: "background 0.2s, transform 0.2s"
              }}
              onMouseOver={e => {
                e.target.style.background = "linear-gradient(90deg, #c0392b 0%, #e74c3c 100%)";
                e.target.style.transform = "scale(1.04)";
              }}
              onMouseOut={e => {
                e.target.style.background = "linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Logout
            </button>
          </div>
          <AdminDashboard />
        </>
      )}
    </div>
  );
};

export default App;