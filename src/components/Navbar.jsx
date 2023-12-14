import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import LogoutHandler from '../components/LogoutHandler';

import "../Navbar.css";

function Navbar() {
    const [profile, setProfile] = useState('');
    const { user } = useContext(AuthContext);

    const getProfileData = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${import.meta.env.VITE_API_URL}/profile/${user?._id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const profile = response.data;
                setProfile(profile);
            })
            .catch((error) => {
                console.log(`API: Connection Failed: ${error}`);
            });
    };

    useEffect(() => {
        getProfileData(profile);
    }, []);

    return (
        <div className="nav-container">

            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Question_mark.png/475px-Question_mark.png" />

            <Link to="/index">
                <button className="nav-btn">Home</button>
            </Link>

            <Link to="/bootcamps">
                <button className="nav-btn">Bootcamps</button>
            </Link>

            <Link to={`/profile/${user?._id}`}>
                <button className="nav-btn">My Profile</button>
            </Link>

            <button className="nav-btn"><LogoutHandler /></button>

        </div>
    );
}

export default Navbar;