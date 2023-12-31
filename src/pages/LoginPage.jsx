import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function LoginPage(props) {
	console.log('Rendering LoginPage');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);
	const { isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		console.log('isAuthenticated:', isAuthenticated);
		if (isAuthenticated) {
			navigate('/index');
		}
	}, [isAuthenticated, navigate]);

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		const requestBody = { email, password };

		axios
			.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
			.then((response) => {
				console.log('API response:', response.data);
				console.log('JWT token', response.data.authToken);
				storeToken(response.data.authToken);
				authenticateUser();
				navigate('/index');
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className="login-signup-page">
			<h1>Log in</h1>

			<form
				className="login-signup-form"
				onSubmit={handleLoginSubmit}>

				<div className="login-signup-container">
					<label>Email:</label>
					<input type="email" name="email" value={email} onChange={handleEmail} />
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

				<button className="login-signup-btn" type="submit">Login</button>
			</form>

			<p>Don't have an account?</p>
			<Link to={'/auth/signup'}><button className="login-signup-btn">Sign Up</button></Link>

			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
}

export default LoginPage;
