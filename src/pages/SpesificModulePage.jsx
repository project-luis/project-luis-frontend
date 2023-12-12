import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function SpesificModulePage() {
	const [bootcampsArray, setbootcampsArray] = useState([]);
	const [module, setModule] = useState('');
	const { moduleId } = useParams();
	const getModuleFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');

			axios
				.get(`${API_URL}/modules/${moduleId}`, {
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
		}, []);
	};

	const deleteModule = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.delete(`${API_URL}/modules/${moduleId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => {
				navigate(`/bootcamps`);
			})
			.catch((err) => console.log(err));
	};

	getModuleFromApi();

	return (
		<div className="spesificModule">
			<section className="module-modules-list">
				<h3>Bootcamps</h3>
				<li>
					<ul>
						This will be the list of bootcamps that related with this module
					</ul>
				</li>
				<button className="add-module-button" to={`/index`}>
					Add Module
				</button>
			</section>
			<section className="module-description">
				<h1>
					<img className="module-avatar" src={module.avatarUrl} />
					{module.name}
				</h1>
				<p>{module.description}</p>
			</section>
			<section className="module-buttons">
				<button>Edit Module</button>
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
