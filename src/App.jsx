import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Homepage from './pages/Homepage';
import BootcampsPage from './pages/BootcampsPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/auth/signup" element={<SignUpPage />} />
				<Route path="/index" element={<Homepage />} />
				<Route path="/bootcamps" element={<BootcampsPage />} />
			</Routes>
		</div>
	);
}

export default App;
