import React from "react";

function LogoutHandler() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <button
            className="logout-btn"
            onClick={handleLogout}>
            Log Out
        </button>
    );
}

export default LogoutHandler;