import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/auth/signup" element={<SignUpPage />} />
			</Routes>
		</div>
	);
}

export default App;
