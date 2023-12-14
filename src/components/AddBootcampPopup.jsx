import axios from 'axios';
import React, { useState } from 'react';

function AddBootcampPopup(props) {
	const [bootcamp, setBootcamp] = useState({
		name: '',
		description: '',
		teacher: '',
		avatarUrl: '',
		languages: '',
		bootcampCode: '',
		hoursPerWeek: '',
		courseLength: '',
		startDate: '',
		endDate: '',
		daysOfWeek: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBootcamp((bootcamp) => ({
			...bootcamp,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('Submitting form...');

			const storedToken = localStorage.getItem('authToken');
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/bootcamps`,
				bootcamp,
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			);

			console.log('Form submitted successfully:', response.data);
			props.getBootcampsFromApi();
			setBootcamp(response.data);
			props.setTrigger(false);
		} catch (error) {
			console.error('Form submission failed:', error);

			const errorDescription =
				error.response?.data?.message || 'Submission failed';
			setErrorMessage(errorDescription);
		}
	};

	return props.trigger ? (
		<div className="edit-bootcamp-popup">
			<div className="bootcamp-popup-inner">
				<h1>Add New Bootcamp</h1>
				<form
					className="edit-bootcamp-form"
					onSubmit={handleSubmit}
					method="POST"
				>
					<label>Name of The Bootcamp:</label>
					<input type="text" name="name" onChange={handleInputChange} />

					<label>Description:</label>
					<textarea
						type="textarea"
						name="description"
						onChange={handleInputChange}
						rows={5}
					/>
					<label>Logo of the Bootcamp:</label>
					<input type="text" name="avatarUrl" onChange={handleInputChange} />

					<label>Languages: </label>
					<input type="text" name="languages" onChange={handleInputChange} />

					{/* <label>Bootcamp Code</label>
					<input type="text" name="bootcampCode" onChange={handleInputChange} /> */}

					{/* <label>Hours Per Week?</label>
					<input
						type="number"
						name="hoursPerWeek"
						onChange={handleInputChange}
					/> */}

					{/* <label>Length of Course: </label>
					<input
						type="number"
						name="courseLength"
						onChange={handleInputChange}
					/> */}

					{/* <label>Start Date: </label>
					<input type="date" name="startDate" onChange={handleInputChange} />

					<label>End Date: </label>
					<input type="date" name="endDate" onChange={handleInputChange} /> */}

					{/* <label>How many days per week?: </label>
					<input type="number" name="daysofWeek" onChange={handleInputChange} /> */}

					<button type="submit">Submit</button>
				</form>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</div>
			<button className="close-btn" onClick={() => props.setTrigger(false)}>
				Close
			</button>
			{props.children}
		</div>
	) : (
		''
	);
}

export default AddBootcampPopup;
