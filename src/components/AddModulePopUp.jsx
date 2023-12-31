import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GetAllModules from './GetAllModules';

import '../SubmitForms.css';

function AddModulePopup(props) {
	const { bootcampId } = useParams();
	const [module, setmodule] = useState({
		name: '',
		description: '',
		avatarUrl: '',
		moduleCode: '',
		hoursPerWeek: '',
		startDate: '',
		endDate: '',
		startTime: '',
		endTime: '',
		daysOfWeek: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setmodule((module) => ({
			...module,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Submitting form...');
		try {
			console.log('Submitting form...');

			const storedToken = localStorage.getItem('authToken');
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}/module`,
				module,
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			);

			console.log('Form submitted successfully:', response.data);
			props.getBootcampFromApi();
			setmodule(response.data);
			props.setTrigger(false);
		} catch (error) {
			console.error('Form submission failed:', error);

			const errorDescription =
				error.response?.data?.message || 'Submission failed';
			setErrorMessage(errorDescription);
		}
	};

	return props.trigger ? (
		<div className="popup-form-container">
			<div className="popup-form-inner">
				<GetAllModules bootcampId={bootcampId} />
				<div className="add-new-module-div">
					<h3>Add New module</h3>
					<form className="popup-form" onSubmit={handleSubmit} method="POST">
						<label>Name of The module:</label>
						<input type="text" name="name" onChange={handleInputChange} />

						<label>Description:</label>
						<textarea
							type="textarea"
							name="description"
							onChange={handleInputChange}
							rows={5}
						/>

						<label>Logo of the module:</label>
						<input type="text" name="avatarUrl" onChange={handleInputChange} />

						{/* <label>Languages: </label>
					<input type="text" name="languages" onChange={handleInputChange} />

					<label>module Code</label>
					<input type="text" name="moduleCode" onChange={handleInputChange} />

					<label>Hours Per Week?</label>
					<input
						type="number"
						name="hoursPerWeek"
						onChange={handleInputChange}
					/>

					<label>Length of Course: </label>
					<input
						type="number"
						name="courseLength"
						onChange={handleInputChange}
					/>

					<label>Start Date: </label>
					<input type="date" name="startDate" onChange={handleInputChange} />

					<label>End Date: </label>
					<input type="date" name="endDate" onChange={handleInputChange} />

					<label>How many days per week?: </label>
					<input type="number" name="daysofWeek" onChange={handleInputChange} /> */}

						<button type="popup-form-btn">Submit</button>
					</form>
				</div>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</div>
			<button
				className="popup-form-btn"
				onClick={() => props.setTrigger(false)}
			>
				Close
			</button>
			{props.children}
		</div>
	) : (
		''
	);
}

export default AddModulePopup;
