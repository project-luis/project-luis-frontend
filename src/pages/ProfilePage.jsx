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
					<button className="nav-home">Home</button>
				</Link>
			</div>

			<div className="profile-page-full">
				<div className="profile-page-sidebar">
					<div className="profile-details-container">
						<div className="profile-details-content">
							<p>
								<img
									className="profile-avatar"
									src={userProfile.avatarUrl}
								/>
							</p>
							<p>{userProfile.fullName}</p>
							<p>Expertise: {userProfile.field}</p>
							<p>Currently teaching: {userProfile.bootcamps}</p>
							<p>Covering modules: {userProfile.modules}</p>
							<p>Languages Spoken: {userProfile.languages}</p>
						</div>
					</div>

					<div className="profile-contacts-container">
						(...contact (websites, socials, email, etc.) container --{' '}
						<b>DELETE</b> this text later...)
						<div className="profile-contacts-content">
							<p>
								<a href={userProfile.email}>Email</a>
							</p>
							<p>
								<a href={userProfile.linkedInUrl}>LinkedIn</a>
							</p>
							<p>
								<a href={userProfile.githubUrl}>GitHub</a>
							</p>
						</div>
					</div>
				</div>

				<div className="profile-page-right-side">
					<div className="profile-about-container">
						<p className="profile-about-text">
							<h2>
								This "about me / details" section should be part of the schema
								that the user can edit.
							</h2>
							<br />
							<h2>
								Should the "Edit Profile" button re-direct to an edit profile
								page or to just an edit profile pop-up?
							</h2>
							<br />
							<h2>
								Should a "delete account" option be available inside the Edit
								Profile page?
							</h2>
							<br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
							aliquet ligula felis, id varius arcu interdum ac. Curabitur non
							risus lorem. Mauris eget tristique ipsum. Vivamus aliquet bibendum
							ultrices. Duis auctor fringilla justo, vel tincidunt mi
							ullamcorper sed. Phasellus a magna eu turpis venenatis tincidunt.
							Morbi eu facilisis elit, ut maximus urna. Sed at iaculis tortor.
							Donec ullamcorper fringilla eros, ut pellentesque nulla dignissim
							ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
							vitae tristique nisl, a tincidunt dolor. Integer augue sem,
							viverra nec feugiat at, gravida at libero. Suspendisse lobortis,
							est id cursus interdum, odio nunc fringilla erat, id cursus tellus
							dolor eu risus.
						</p>
					</div>

					<div className="profile-buttons-container">
						<button className="profile-buttons">My Bootcamps</button>
						<button className="profile-buttons">My Modules</button>

						<button
							className="profile-buttons"
							onClick={() => setEditProfileButton(true)}>Edit Profile</button>

						<EditProfilePopup
							trigger={editProfileButton}
							setTrigger={setEditProfileButton}>
						</EditProfilePopup>

						<LogoutHandler>
							<button></button>
						</LogoutHandler>

					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
