import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "../tempProfileCss.css";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
    const [teacherProfile, setTeacherProfile] = useState([]);
    const { profileId } = useParams();

    const getTeacherProfile = () => {
        useEffect(() => {
            const storedToken = localStorage.getItem("authToken");

            axios
                .get(`${API_URL}/profile/${profileId}`,
                    {
                        headers: { Authorization: `Bearer ${storedToken}` }
                    })
                .then((response) => {
                    const userProfile = response.data;
                    setTeacherProfile(userProfile);
                })
                .catch((error) => console.log(error)
                );
        }, []);
    };

    getTeacherProfile();

    return (

        <div className="profile-page">

            <div className="profile-page-head">
                <Link to="/index">
                    <button className="nav-home">Home</button>
                </Link>

            </div>

            <div className="profile-details-container">
                Profile details container
                <div className="profile-content">
                    <p>{teacherProfile.fullName}</p>
                    <p>{teacherProfile.email}</p>
                    <p><img src={teacherProfile.avatarUrl} /></p>
                    <p>{teacherProfile.fullName}</p>
                    <p>{teacherProfile.fullName}</p>
                    <p>{teacherProfile.fullName}</p>
                </div>
                <button>Edit Profile</button>
                <button>Log Out</button>
                <button>Delete Account</button>
            </div>

            <div className="profile-contacts-container">
                Contact (websites, socials, email, etc.) container
                <button>Edit Contacts</button>
            </div>

            <div className="profile-placeholder-buttons">
                <button>Bootcamps</button>
                <button>Modules</button>
            </div>

        </div>

    );
}

export default ProfilePage;