import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DeleteAccountHandler from '../components/DeleteAccountHandler';

import '../tempProfileCss.css';

function EditProfilePopup(props) {
	const [userProfile, setUserProfile] = useState({
		fullName: '',
		email: '',
		avatarUrl: '',
		languages: '',
		linkedInUrl: '',
		githubUrl: '',
		field: '',
		aboutUser: '',
		bootcamps: '',
		modules: '',
	});

	const [errorMessage, setErrorMessage] = useState('');
	const { profileId } = useParams();

	const handleEditData = (e) => {
		const { name, value } = e.target;
		setUserProfile((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	const getUserData = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/profile/${profileId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const userData = Array.isArray(response.data)
					? response.data[0]
					: response.data;
				setUserProfile({
					...userData,
					linkedInUrl:
						userData.linkedInUrl.startsWith('https://') ||
						userData.linkedInUrl === ''
							? userData.linkedInUrl
							: 'https://' + userData.linkedInUrl,
					githubUrl:
						userData.githubUrl.startsWith('https://') ||
						userData.githubUrl === ''
							? userData.githubUrl
							: 'https://' + userData.githubUrl,
				});
				console.log('Successful edit');
				console.log('See updated information:', userData);
			})
			.catch((error) => {
				console.log(`Error: ${error}`);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const storedToken = localStorage.getItem('authToken');

		axios
			.put(
				`${import.meta.env.VITE_API_URL}/profile/${profileId}`,
				userProfile,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			)
			.then((response) => {
				console.log('Successful Edit:', response.data);
				setUserProfile(response.data);
				props.updateUserData();
				props.setTrigger(false);
			})
			.catch((error) => {
				console.log('Failed Edit:', error);
				const errorDescripton = error.response?.data?.message || 'Edit Failure';
				setErrorMessage(errorDescripton);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	return props.trigger ? (
		<div className="edit-profile-popup">
			<div className="edit-profile-popup-inner">
				<form className="edit-profile-form" onSubmit={handleSubmit}>
					<label>Your Name</label>
					<input
						type="text"
						name="fullName"
						value={userProfile.fullName || ''}
						onChange={handleEditData}
					/>

					<label>Email</label>
					<input
						type="text"
						name="email"
						value={userProfile.email || ''}
						onChange={handleEditData}
					/>

					<label>Languages</label>
					<input
						type="text"
						name="languages"
						value={userProfile.languages || ''}
						onChange={handleEditData}
					/>

					<label>Expertise</label>
					<input
						type="text"
						name="field"
						value={userProfile.field || ''}
						onChange={handleEditData}
					/>

					<label>About Me</label>
					<textarea
						type="text"
						name="aboutUser"
						value={userProfile.aboutUser || ''}
						onChange={handleEditData}
					></textarea>

					<label>LinkedIn Profile</label>
					<input
						type="url"
						name="linkedInUrl"
						value={userProfile.linkedInUrl || ''}
						onChange={handleEditData}
					/>

					<label>GitHub Profile</label>
					<input
						type="url"
						name="githubUrl"
						value={userProfile.githubUrl || ''}
						onChange={handleEditData}
					/>

					<label>Set your profile image</label>
					<input
						type="url"
						name="avatarUrl"
						value={userProfile.avatarUrl}
						onChange={handleEditData}
					/>

					<button type="submit">Submit</button>
				</form>

				{errorMessage && <p className="error-message">{errorMessage}</p>}

				<button
					className="edit-profile-popup-close-btn"
					onClick={() => props.setTrigger(false)}
				>
					Close
				</button>

				<div className="#">
					<DeleteAccountHandler>
						<button></button>
					</DeleteAccountHandler>
				</div>

				{props.children}
			</div>
		</div>
	) : (
		''
	);
}

export default EditProfilePopup;
