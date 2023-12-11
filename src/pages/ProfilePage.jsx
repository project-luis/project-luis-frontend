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

            <div className="profile-page-full">

                <div className="profile-page-sidebar">
                    <div className="profile-details-container">
                        Profile details container
                        
                        <div className="profile-details-content">
                            <p><img src={teacherProfile.avatarUrl} className="profile-avatar" /></p>
                            <p>{teacherProfile.fullName}</p>
                            <p>Expertise: {teacherProfile.field}</p>
                            <p>Currently teaching: {teacherProfile.bootcamps}</p>
                            <p>Covering modules: {teacherProfile.modules}</p>
                            <p>Languages Spoken: {teacherProfile.languages}</p>
                        </div>
                        
                    </div>

                    <div className="profile-contacts-container">
                        Contact (websites, socials, email, etc.) container

                        <div className="profile-contacts-content">
                            <p><a href={teacherProfile.email}>Email</a></p>
                            <p><a href={teacherProfile.linkedInUrl}>LinkedIn</a></p>
                            <p><a href={teacherProfile.githubUrl}>GitHub</a></p>
                        </div>

                    </div>
                </div>

                <div className="profile-page-right-side">
                    <div className="profile-about-container">
                        <p className="profile-about-text">
                            <h2>
                                This "about me / details" section should be part of the schema that the user can edit.
                            </h2>
                            <br />
                            <h2>
                                Should a "delete account" option be available inside the Edit Profile page?
                            </h2>
                            <br /> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
                            ligula felis, id varius arcu interdum ac. Curabitur non risus lorem.
                            Mauris eget tristique ipsum. Vivamus aliquet bibendum ultrices. Duis
                            auctor fringilla justo, vel tincidunt mi ullamcorper sed. Phasellus a
                            magna eu turpis venenatis tincidunt. Morbi eu facilisis elit, ut
                            maximus urna. Sed at iaculis tortor. Donec ullamcorper fringilla eros,
                            ut pellentesque nulla dignissim ac. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Sed vitae tristique nisl, a tincidunt
                            dolor. Integer augue sem, viverra nec feugiat at, gravida at libero.
                            Suspendisse lobortis, est id cursus interdum, odio nunc fringilla
                            erat, id cursus tellus dolor eu risus.
                        </p>
                    </div>

                    <div className="profile-buttons-container">
                        <button className="profile-buttons">My Bootcamps</button>
                        <button className="profile-buttons">My Modules</button>
                        <button className="profile-buttons">Edit Profile</button>
                        <button className="profile-buttons">Log Out</button>
                    </div>
                </div> 

            </div>

        </div>
    );
}

export default ProfilePage;