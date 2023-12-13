import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import EditProfilePopup from '../components/EditProfilePopup';
import LogoutHandler from '../components/LogoutHandler';

import '../tempProfileCss.css';

function ProfilePage(props) {
	const [userProfile, setUserProfile] = useState([]);
	const { profileId } = useParams();

	const [editProfileButton, setEditProfileButton] = useState(false);

	const getUserProfile = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');

			axios
				.get(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const userData = response.data;
					setUserProfile(userData);
				})
				.catch((error) => console.log(error));
		}, []);
	};

	getUserProfile();
	
	return (
		<div className="profile-page">

			<div className="profile-page-head">
				<Link to="/index">
					<button>Home</button>
				</Link>

				<button
					className="profile-buttons"
					onClick={() => setEditProfileButton(true)}>
					Edit Profile
				</button>
				<EditProfilePopup
					trigger={editProfileButton}
					setTrigger={setEditProfileButton}>
				</EditProfilePopup>

				<LogoutHandler>
					<button></button>
				</LogoutHandler>
			</div>

			<div className="profile-page-full">
				<div className="profile-detail-card-container">
					<div className="profile-detail-card-content">
						<img
							className="profile-avatar"
							src={userProfile.avatarUrl}
						/>
						<p>{userProfile.fullName}</p>
						<p>I speak: {userProfile.languages}</p>
					</div>
				</div>

				<div className="profile-about-card-container">
					<div className="profile-about-card-content">
						<p>Expertise:<br/>{userProfile.field}</p>
						<p>My Bootcamps:<br/>{userProfile.bootcamps}</p>
						<p>My Modules:<br/>{userProfile.modules}</p>
						<p>About Me:<br/>{userProfile.aboutUser}</p>
					</div>
				</div>

				<div className="profile-contact-card-container">
					<div className="profile-contact-card-content">
						<a href={`mailto:${userProfile.email}`}>Email</a>
						<a href={`${userProfile.linkedInUrl}`}>LinkedIn</a>
						<a href={`${userProfile.githubUrl}`}>GitHub</a>
					</div>
				</div>
			</div>

		</div>
	);
}

export default ProfilePage;
