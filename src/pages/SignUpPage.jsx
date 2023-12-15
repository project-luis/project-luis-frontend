import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

function SignUpPage(props) {
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [field, setField] = useState('');
	const [startDate, setStartDate] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleName = (e) => {
		setFullName(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleField = (e) => {
		setField(e.target.value);
	};

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestBody = { fullName, password, email, field, startDate };

		axios
			.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
			.then((response) => {
				console.log('sıgnup successful');
				navigate('/');
			})
			.catch((error) => {
				console.log('is this working?');
				console.log(error);
				const errorDescripton = error.response.data.message;
				setErrorMessage(errorDescripton);
			});
	};

	return (
		<div className="login-signup-page">
			<h1>Create an account</h1>

			<form
				className="login-signup-form"
				onSubmit={handleSubmit}>

				<div className="login-signup-container">
					<label>Name & Surname:</label>
					<input type="text" name="name" value={fullName} onChange={handleName} />
				</div>

				<div className="login-signup-container">
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePassword}
					/>
				</div>

				<div className="login-signup-container">
					<label>Email:</label>
					<input type="email" name="email" value={email} onChange={handleEmail} />
				</div>

				{/*
				<label>Field of Study:</label>
				<input type="text" name="field" value={field} onChange={handleField} />

				<label>When did you start with this bootcamp?</label>
				<input
					type="date"
					name="startDate"
					value={startDate}
					onChange={handleStartDate}
				/>
				*/}

				<button className="login-signup-btn" type="submit">Submit</button>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<p>Already have an account?</p>
			<Link to={'/'}><button className="login-signup-btn">Login</button></Link>
		</div>
	);
}

export default SignUpPage;
