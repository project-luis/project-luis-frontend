import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import EditProfilePopup from '../components/EditProfilePopup';
import LogoutHandler from '../components/LogoutHandler';

import { Stack, Button } from 'react-bootstrap';

// import '../tempProfileCss.css';

function ProfilePage(props) {
	const [userProfile, setUserProfile] = useState([]);
	const [bootcampData, setBootcampData] = useState([]);
	const { profileId } = useParams();

	const [editProfileButton, setEditProfileButton] = useState(false);

	const getUserProfile = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const userData = response.data;
				setUserProfile(userData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getBootcampData = () => {
		const storedToken = localStorage.getItem("authToken");

		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setBootcampData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getUserProfile();
		getBootcampData();
	}, []);

	const updateUserData = () => {
		getUserProfile();
	};

	return (
		<div className="profile-page">

			<Stack direction="horizontal" gap={3} className="col-md-5 mx-auto">

				<div className="p-2">
					<Link to="/index">
						<Button variant="secondary">Home</Button>
					</Link>
				</div>

				<div className="p-2 ms-auto">
					<button onClick={() => setEditProfileButton(true)}>
						Edit Profile
					</button>
				</div>

				<div className="vr" />

				<div className="p-2">
					<LogoutHandler>
						<button></button>
					</LogoutHandler>
				</div>

			</Stack>

			<div className="profile-page-main">
				{[userProfile].map((userItem, i) => {
					return (
						<div key={i}>
							<div className="profile-detail-card-container">
								<div className="profile-detail-card-content">
									<img
										className="profile-avatar"
										src={userItem.avatarUrl || "https://static.thenounproject.com/png/1876981-200.png"}
									/>
									<p>{userItem.fullName}</p>
									<p>I speak: {userItem.languages}</p>
								</div>
							</div>

							<div className="profile-contact-card-container">
								<div className="profile-contact-card-content">
									<a href={`mailto:${userItem.email}`}>Email</a>

									<a href={userItem.linkedInUrl || "https://www.linkedin.com/"}
										target="_blank"
										rel="noreferrer">LinkedIn
									</a>

									<a href={userItem.githubUrl || "https://github.com/"}
										target="_blank"
										rel="noreferrer">GitHub
									</a>
								</div>
							</div>

							<div className="profile-about-card-container">
								<div className="profile-about-card-content">
									<p>My bootcamps:</p>
									{bootcampData.map((bootcampItem, i) => {
										return (
											<div>
												<ul>
													<li key={i}>
														<Link to={`/bootcamps/${bootcampItem._id}`}>
															{bootcampItem.name}
														</Link>
													</li>
												</ul>
											</div>
										);
									})}
									<p>My experience and expertise:<br />{userItem.field}</p>
									<p>About me:<br />{userItem.aboutUser}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<EditProfilePopup
				trigger={editProfileButton}
				setTrigger={setEditProfileButton}
				updateUserData={updateUserData}>
			</EditProfilePopup>

		</div>
	);
}

export default ProfilePage;
