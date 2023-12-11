import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "../tempProfileCss.css";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
    const [teacherProfile, setTeacherProfile] = useState([]);
    const { teacherId } = useParams();

    const getTeacherProfile = () => {
        useEffect(() => {
            const storedToken = localStorage.getItem("authToken");
            
            axios
                .get(`${API_URL}/profile/${teacherId}`,
                    { headers: { Authorization: `Bearer ${storedToken}` }
                })
                .then((response) => {
                    const oneProfile = response.data;
                    setTeacherProfile(oneProfile);
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
                
                <h2>{`Welcome, ${teacherProfile.hello}!`}</h2>
            </div>

            <div className="profile-details-container">
                Profile details container
                {[...teacherProfile].map((teacher, i) => {
                    return(
                        <div key={teacher.id} className="profile-content">
                            <p>{teacher.fullName}</p>
                        </div>
                    )
                })}
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