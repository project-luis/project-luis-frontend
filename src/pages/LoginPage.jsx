import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";

const API_URL = 'http://localhost:5005';

function LoginPage(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		const requestBody = { email, password };

		axios
			.post(`${API_URL}/auth/login`, requestBody)
			.then((response) => {
				console.log('logged ın');
				console.log("JWT token", response.data.authToken);
				storeToken(response.data.authToken);
				autheticateUser();
				navigate("/index");
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			})
	};


	return (
		<div className="LoginPage">
			<h1>Login Page</h1>
			
			<form onSubmit={handleLoginSubmit}>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={handleEmail}
				/>

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={handlePassword}
				/>

				<button type="submit">Login</button>
			</form>

			<p>Don't have an account?</p>
			<Link to={'/auth/signup'}>Sign Up</Link>

			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
}

export default LoginPage;
