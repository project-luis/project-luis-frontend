import React from "react";
import "../Navbar.css";

function LogoutHandler() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <button
            className="nav-btn"
            onClick={handleLogout}>
            Log Out
        </button>
    );
}

export default LogoutHandler;