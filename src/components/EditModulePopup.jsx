import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "../SubmitForms.css";

function EditModulePopup(props) {
	const [module, setModule] = useState({
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
	const { moduleId } = useParams();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setModule((prevModule) => ({
			...prevModule,
			[name]: value,
		}));
	};

	const getModuleFromApi = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${import.meta.env.VITE_API_URL}/modules/${moduleId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const moduleData = Array.isArray(response.data)
					? response.data[0]
					: response.data;
				setModule(moduleData);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
				console.log(moduleId);
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const storedToken = localStorage.getItem('authToken');

		axios
			.put(`${import.meta.env.VITE_API_URL}/modules/${moduleId}`, module, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log('Edit successful', response.data);
				props.getModuleFromApi();
				setModule(response.data);
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
		getModuleFromApi();
	}, []);

	return props.trigger ? (
		<div className="popup-form-container">
			<div className="popup-form-inner">
				<h1>Edit This Module</h1>
				<form className="popup-form" onSubmit={handleSubmit}>
					<label>Name of The module:</label>
					<input
						type="text"
						value={module.name || ''}
						name="name"
						onChange={handleInputChange}
					/>

					<label>Description:</label>
					<textarea
						type="textarea"
						name="description"
						value={module.description || ''}
						onChange={handleInputChange}
						rows={5}
					/>

					<label>Logo of the module:</label>
					<input
						type="text"
						value={module.avatarUrl || ''}
						name="avatarUrl"
						onChange={handleInputChange}
					/>

					<label>Languages: </label>
					<input
						type="text"
						value={module.languages || ''}
						name="languages"
						onChange={handleInputChange}
					/>

					<label>module Code</label>
					<input
						type="text"
						value={module.moduleCode || ''}
						name="moduleCode"
						onChange={handleInputChange}
					/>

					<label>Hours Per Week?</label>
					<input
						type="number"
						value={module.hoursPerWeek || ''}
						name="hoursPerWeek"
						onChange={handleInputChange}
					/>

					<label>Length of Course: </label>
					<input
						type="number"
						name="courseLength"
						value={module.courseLength || ''}
						onChange={handleInputChange}
					/>

					<label>Start Date: </label>
					<input
						type="date"
						value={module.startDate || ''}
						name="startDate"
						onChange={handleInputChange}
					/>

					<label>End Date: </label>
					<input
						type="date"
						value={module.endDate || ''}
						name="endDate"
						onChange={handleInputChange}
					/>

					<label>How many days per week?: </label>
					<input
						type="number"
						value={module.daysOfWeek || ''}
						name="daysofWeek"
						onChange={handleInputChange}
					/>

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

export default EditModulePopup;
