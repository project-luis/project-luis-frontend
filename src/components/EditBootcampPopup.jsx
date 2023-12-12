import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function EditBootcampPopup(props) {
	const [bootcamp, setBootcamp] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [teacher, setTeacher] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');
	const [languages, setLanguages] = useState(0);
	const [bootcampCode, setBootcampCode] = useState('');
	const [hoursPerWeek, setHoursPerWeek] = useState('');
	const [courseLength, setCourseLength] = useState('');
	const [startDate, setStartDate] = useState('dd - MM - yyyy');
	const [endDate, setEndDate] = useState('');
	const [daysOfWeek, setDaysOfWeek] = useState('');
	const [modules, setModules] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { bootcampId } = useParams();

	const navigate = useNavigate();

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleTeacher = (e) => {
		setTeacher(e.target.value);
	};

	const handleAvatarUrl = (e) => {
		setAvatarUrl(e.target.value);
	};

	const handleLanguages = (e) => {
		setLanguages(e.target.value);
	};

	const handleBootcampCode = (e) => {
		setBootcampCode(e.target.value);
	};

	const handleHoursPerWeek = (e) => {
		setHoursPerWeek(e.target.value);
	};

	const handleCourseLength = (e) => {
		setCourseLength(e.target.value);
	};

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	const handleDaysOfWeek = (e) => {
		setDaysOfWeek(e.target.value);
	};

	const handleModules = (e) => {
		setModules(e.target.value);
	};

	const getBootcampFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');
			axios
				.get(`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					setBootcamp(response.data);
					console.log(`API: Connection success: ${response}`);
				})
				.catch((error) => {
					console.log(`API: Connection Failed: ${error}`);
					console.log(bootcampId);
				});
		}, []);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const requestBody = {
			name,
			description,
			teacher,
			avatarUrl,
			languages,
			bootcampCode,
			hoursPerWeek,
			courseLength,
			startDate,
			endDate,
			daysOfWeek,
			modules,
		};

		const storedToken = localStorage.getItem('authToken');

		axios
			.put(
				`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`,
				requestBody,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			)
			.then((response) => {
				console.log('Edit successful');
				props.setTrigger(false);
			})
			.catch((error) => {
				console.log('Connection & Edit Failed?');
				console.log(error);
				const errorDescripton = error.response.data.message;
				setErrorMessage(errorDescripton);
			});
	};

	getBootcampFromApi();

	return props.trigger ? (
		<div className="edit-bootcamp-popup">
			<div className="bootcamp-popup-inner">
				<h1>Edit This Bootcamp</h1>

				<form className="edit-bootcamp-form" onSubmit={handleSubmit}>
					<label>Name of The Bootcamp:</label>
					<input
						type="text"
						placeholder={bootcamp.name}
						name="name"
						value={name}
						onChange={handleName}
					/>

					<label>Description:</label>
					<input
						type="textarea"
						placeholder={bootcamp.description}
						name="description"
						value={description}
						onChange={handleDescription}
					/>

					<label>Teacher:</label>
					<input
						type="text"
						placeholder={bootcamp.teacher}
						name="teacher"
						value={teacher}
						onChange={handleTeacher}
					/>

					<label>Logo of the Bootcamp:</label>
					<input
						type="text"
						placeholder={bootcamp.avatarUrl}
						name="avatarUrl"
						value={avatarUrl}
						onChange={handleAvatarUrl}
					/>

					<label>Languages: </label>
					<input
						type="text"
						placeholder={bootcamp.languages}
						name="languages"
						value={languages}
						onChange={handleLanguages}
					/>

					<label>Bootcamp Code</label>
					<input
						type="text"
						placeholder={bootcamp.bootcampCode}
						name="bootcampCode"
						value={bootcampCode}
						onChange={handleBootcampCode}
					/>

					<label>Hours Per Week?</label>
					<input
						type="number"
						placeholder={bootcamp.hoursPerWeek}
						name="hoursPerWeek"
						value={hoursPerWeek}
						onChange={handleHoursPerWeek}
					/>

					<label>Length of Course: </label>
					<input
						type="number"
						placeholder={bootcamp.courseLength}
						name="courseLength"
						value={courseLength}
						onChange={handleCourseLength}
					/>

					<label>Start Date: </label>
					<input
						type="date"
						placeholder={bootcamp.startDate}
						name="startDate"
						value={startDate}
						onChange={handleStartDate}
					/>

					<label>End Date: </label>
					<input
						type="date"
						placeholder={bootcamp.endDate}
						name="endDate"
						value={endDate}
						onChange={handleEndDate}
					/>

					<label>How many days per week?: </label>
					<input
						type="number"
						placeholder={bootcamp.daysOfWeek}
						name="daysofWeek"
						value={daysOfWeek}
						onChange={handleDaysOfWeek}
					/>

					<label>Which Modules are included to this Bootcamp? </label>
					<input
						type="string"
						placeholder={[...bootcamp.modules].map((module) => {
							return ' ' + module.name;
						})}
						name="modules"
						value={modules}
						onChange={handleModules}
					/>

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

export default EditBootcampPopup;
