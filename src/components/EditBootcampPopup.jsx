import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "../SubmitForms.css";

function EditBootcampPopup(props) {
	const [bootcamp, setBootcamp] = useState({
		name: '',
		description: '',
		teacher: '',
		avatarUrl: '',
		languages: '',
		bootcampCode: '',
		hoursPerWeek: '',
		courseLength: '',
		startDate: 'dd - MM - yyyy',
		endDate: '',
		daysOfWeek: '',
		modules: '',
	});

	const [errorMessage, setErrorMessage] = useState('');
	const { bootcampId } = useParams();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBootcamp((prevBootcamp) => ({
			...prevBootcamp,
			[name]: value,
		}));
	};

	const getBootcampFromApi = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const bootcampData = Array.isArray(response.data)
					? response.data[0]
					: response.data;
				setBootcamp(bootcampData);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
				console.log(bootcampId);
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const storedToken = localStorage.getItem('authToken');

		axios
			.put(
				`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`,
				bootcamp,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			)
			.then((response) => {
				console.log('Edit successful', response.data);
				props.getBootcampFromApi();
				setBootcamp(response.data);
				props.setTrigger(false);
			})
			.catch((error) => {
				console.log('Connection & Edit Failed?');
				console.log(error);
				const errorDescripton = error.response?.data?.message || 'Edit failed';
				setErrorMessage(errorDescripton);
			});
	};

	useEffect(() => {
		getBootcampFromApi();
	}, []);

	return props.trigger ? (
		<div className="popup-form-container">
			<div className="popup-form-inner">
				<h1>Edit This Bootcamp</h1>
				<form className="popup-form" onSubmit={handleSubmit}>
					<label>Name of The Bootcamp:</label>
					<input
						type="text"
						name="name"
						value={bootcamp.name || ''}
						onChange={handleInputChange}
					/>

					<label>Description:</label>
					<textarea
						type="textarea"
						name="description"
						value={bootcamp.description || ''}
						onChange={handleInputChange}
						rows={5}
					/>

					<label>Logo of the Bootcamp:</label>
					<input
						type="text"
						name="avatarUrl"
						value={bootcamp.avatarUrl || ''}
						onChange={handleInputChange}
					/>

					<label>Languages: </label>
					<input
						type="text"
						name="languages"
						value={bootcamp.languages || ''}
						onChange={handleInputChange}
					/>

					{/* <label>Bootcamp Code</label>
					<input
						type="text"
						name="bootcampCode"
						value={bootcamp.bootcampCode || ''}
						onChange={handleInputChange}
					/>

					<label>Hours Per Week?</label>
					<input
						type="number"
						name="hoursPerWeek"
						value={bootcamp.hoursPerWeek || ''}
						onChange={handleInputChange}
					/>

					<label>Length of Course: </label>
					<input
						type="number"
						name="courseLength"
						value={bootcamp.courseLength || ''}
						onChange={handleInputChange}
					/>

					<label>Start Date: </label>
					<input
						type="date"
						name="startDate"
						value={bootcamp.startDate || ''}
						onChange={handleInputChange}
					/>

					<label>End Date: </label>
					<input
						type="date"
						name="endDate"
						value={bootcamp.endDate || ''}
						onChange={handleInputChange}
					/>

					<label>How many days per week?: </label>
					<input
						type="number"
						name="daysofWeek"
						value={bootcamp.daysOfWeek || ''}
						onChange={handleInputChange}
					/> */}

					<button type="popup-form-btn">Submit</button>
				</form>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</div>
			<button className="popup-form-btn" onClick={() => props.setTrigger(false)}>
				Close
			</button>
			{props.children}
		</div>
	) : (
		''
	);
}

export default EditBootcampPopup;
