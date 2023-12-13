import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditModulePopup from '../components/EditModulePopup';

function SpesificModulePage(props) {
	const [bootcampsArray, setbootcampsArray] = useState([]);
	const [editModuleButtonPopup, setEditModuleButtonPopup] = useState(false);
	const [module, setModule] = useState('');
	const { moduleId } = useParams();
	const getModuleFromApi = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/modules/${moduleId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setModule(response.data);
				setbootcampsArray(response.data.bootcamps);
				console.log(`API: Connection success: ${response}`);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
			});
	};

	const getBootcampsFromApi = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setbootcampsArray(response.data);
				console.log(`API: Connection success: ${response}`);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
			});
	};

	useEffect(() => {
		getModuleFromApi();
	}, []);

	const deleteModule = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.delete(`${import.meta.env.VITE_API_URL}/modules/${moduleId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => {
				navigate(`/bootcamps`);
				getBootcampsFromApi();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="spesificModule">
			<section className="module-modules-list">
				<h3>Bootcamps</h3>
				<li>
					<ul>
						This will be the list of bootcamps that related with this module
					</ul>
				</li>
			</section>
			<section className="module-description">
				<h1>
					<img className="module-avatar" src={module.avatarUrl} />
					{module.name}
				</h1>
				<p>{module.description}</p>
			</section>
			<section className="module-buttons">
				<button
					onClick={() => {
						setEditModuleButtonPopup(true);
					}}
				>
					Edit Module
				</button>
				<EditModulePopup
					trigger={editModuleButtonPopup}
					setTrigger={setEditModuleButtonPopup}
					getBootcampsFromApi={getBootcampsFromApi}
					getModuleFromApi={getModuleFromApi}
				></EditModulePopup>
				<Link to={'/bootcamps'}>
					<button onClick={deleteModule}>Delete Module</button>
				</Link>
				<Link to="/index">
					<button>(TEMP) Home</button>
				</Link>
			</section>
		</div>
	);
}

export default SpesificModulePage;
