import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function LoginPage(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const requestBody = { email, password };
	axios
		.post(`${API_URL}/auth/login`, requestBody)
		.then((response) => {
			console.log('logged ın');
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});

	return (
		<div className="LoginPage">
			<h1>Login Page</h1>
			<form>
				<label>Email:</label>
				<input type="email" name="email" value={email} />

				<label>Password:</label>
				<input type="password" name="password" value={password} />

				<button type="submit">Login</button>
			</form>

			<p>Don't have an account?</p>
			<Link to={'/auth/signup'}>Sign Up</Link>
		</div>
	);
}

export default LoginPage;
