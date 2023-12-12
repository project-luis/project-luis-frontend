import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import '../tempProfileCss.css';

function EditProfilePopup(props) {
    const { profileId } = useParams();

    const [errorMessage, setErrorMessage] = useState("");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [languages, setLanguages] = useState("");
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [field, setField] = useState("");
    const [bootcamps, setBootcamps] = useState("");
    const [modules, setModules] = useState("");

    const handleFullName = (e) => {
        setFullName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleAvatarUrl = (e) => {
        setAvatarUrl(e.target.value);
    };
    const handleLanguages = (e) => {
        setLanguages(e.target.value);
    };
    const handleLinkedInUrl = (e) => {
        setLinkedInUrl(e.target.value);
    };
    const handleGithubUrl = (e) => {
        setGithubUrl(e.target.value);
    };
    const handleField = (e) => {
        setField(e.target.value);
    };
    const handleBootcamps = (e) => {
        setBootcamps(e.target.value);
    };
    const handleModules = (e) => {
        setModules(e.target.value);
    };

    const getData = () => {
        useEffect(() => {
            const storedToken = localStorage.getItem("authToken");
            axios
                .get(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                })
                .then((response) => {
                    setFullName(response.data.fullName);
                    setEmail(response.data.email);
                    setAvatarUrl(response.data.avatarUrl);
                    setLanguages(response.data.languages);
                    setLinkedInUrl(response.data.linkedInUrl);
                    setGithubUrl(response.data.githubUrl);
                    setField(response.data.field);
                    setBootcamps(response.data.bootcamps);
                    setModules(response.data.modules);
                })
                .catch((error) => {
                    console.log(error);
                })
        }, []);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            fullName: fullName,
            email: email,
            avatarUrl: avatarUrl,
            languages: languages,
            linkedInUrl: linkedInUrl,
            githubUrl: githubUrl,
            field: field,
            bootcamps: bootcamps,
            modules: modules,
        };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                console.log("Profile successfully edited");
                props.setTrigger(false);                
            })
            .catch((error) => {
                console.log("Profile edit failed");
                console.log(error);
                const errorDescripton = error.response.data.message;
                setErrorMessage(errorDescripton);
            })
    };

    getData();

    return (props.trigger) ? (
        <div className="edit-profile-popup">
            <div className="edit-profile-popup-inner">

                <form className="edit-profile-form" onSubmit={handleSubmit}>
                        
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={fullName}
                            onChange={handleFullName} />

                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                        />

                        <label>Expertise</label>
                        <input
                            type="text"
                            name="expertise"
                            value={field}
                            onChange={handleField}
                        />

                        <label>Languages</label>
                        <input
                            type="text"
                            name="languages"
                            value={languages}
                            onChange={handleLanguages}
                        />

                        <label>LinkedIn Profile</label>
                        <input
                            type="text"
                            name="linkedin-profile"
                            value={linkedInUrl}
                            onChange={handleLinkedInUrl}
                        />

                        <label>GitHub Profile</label>
                        <input
                            type="text"
                            name="github-profile"
                            value={githubUrl}
                            onChange={handleGithubUrl}
                        />

                        <label>Your Bootcamps</label>
                        <input
                            type="text"
                            name="bootcamps"
                            value={bootcamps}
                            onChange={handleBootcamps}
                        />

                        <label>Your Modules</label>
                        <input
                            type="text"
                            name="modules"
                            value={modules}
                            onChange={handleModules}
                        />

                        <label>Upload a Profile Image</label>
                        <input
                            type="url"
                            name="profile-image"
                            value={avatarUrl}
                            onChange={setAvatarUrl}
                        />

                        <button type="submit">Submit</button>

                    </form>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    
                
                    <button className="edit-profile-popup-close-btn" onClick={() => props.setTrigger(false)}>
                        Close
                    </button>

                    {props.children}

            </div>
		</div>
	) : "";
}

export default EditProfilePopup;
