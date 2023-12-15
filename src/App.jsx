import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import BootcampsPage from './pages/BootcampsPage';
import SpesificBootcampPage from './pages/SpesificBootcampPage';
import SpesificModulePage from './pages/SpesificModulePage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import './App.css';

function App() {
	return (
		<div className="App">

			<Routes>
				<Route
					path="/"
					element={
						<IsAnon>
							<LoginPage />
						</IsAnon>
					}
				/>
				<Route
					path="/auth/signup"
					element={
						<IsAnon>
							<SignUpPage />
						</IsAnon>
					}
				/>
				<Route
					path="/index"
					element={
						<IsPrivate>
							<Homepage />
						</IsPrivate>
					}
				/>
				<Route
					path="/profile/:profileId"
					element={
						<IsPrivate>
							<ProfilePage />
						</IsPrivate>
					}
				/>
				<Route
					path="/bootcamps"
					element={
						<IsPrivate>
							<BootcampsPage />
						</IsPrivate>
					}
				/>
				<Route
					path="/bootcamps/:bootcampId"
					element={
						<IsPrivate>
							<SpesificBootcampPage />
						</IsPrivate>
					}
				/>
				<Route
					path="/modules/:moduleId"
					element={
						<IsPrivate>
							<SpesificModulePage />
						</IsPrivate>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
