import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import BootcampsPage from './pages/BootcampsPage';
import SpesificBootcampPage from './pages/SpesificBootcampPage';
import SpesificModulePage from './pages/SpesificModulePage';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/auth/signup" element={<SignUpPage />} />
				<Route path="/index" element={<Homepage />} />
				<Route path="/profile/:profileId" element={<ProfilePage />} />
				<Route path="/bootcamps" element={<BootcampsPage />} />
				<Route
					path="/bootcamps/:bootcampId"
					element={<SpesificBootcampPage />}
				/>
				<Route path="/modules/:moduleId" element={<SpesificModulePage />} />
			</Routes>
		</div>
	);
}

export default App;
