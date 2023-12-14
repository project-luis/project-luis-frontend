import React, { useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DeleteAccountHandler() {
    
    const { profileId } = useParams();

    const handleDeleteAccount = () => {
        const storedToken = localStorage.getItem('authToken');

        if (window.confirm("Permanently delete your account?")) {
            console.log('something');
            axios
                .delete(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    window.location.href = "/auth/signup";
                    localStorage.removeItem("authToken");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <button
            className="delete-account-button"
            onClick={handleDeleteAccount}>
            Delete Account
        </button>
    );
}

export default DeleteAccountHandler;