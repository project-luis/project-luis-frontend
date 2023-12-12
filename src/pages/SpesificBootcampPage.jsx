import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SpesificBootcampPage() {
	const [modulesArray, setModulesArray] = useState([]);
	const [bootcamp, setBootcamp] = useState('');
	const { bootcampId } = useParams();
	const getBootcampFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');

			axios
				.get(`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					setBootcamp(response.data);
					setModulesArray(response.data.modules);
					console.log(`API: Connection success: ${response}`);
				})
				.catch((error) => {
					console.log(`API: Connection Failed: ${error}`);
				});
		}, []);
	};

	getBootcampFromApi();

	return (
		<div className="spesificBootcamp">
			<section className="bootcamp-modules-list">
				<h3>Modules</h3>
				{[...modulesArray].map((module, i) => {
					return (
						<Link key={i} to={`/bootcamps/modules/${module._id}`}>
							<li className="bootcamp-single-module">
								<img className="bootcamp-module-logo" src={module.avatarUrl} />
								{module.name}
							</li>
						</Link>
					);
				})}
				<button
					className="add-module-button"
					to={`/bootcamps/${bootcampId}/modules/create`}
				>
					Add Module
				</button>
			</section>
			<section className="description-and-teacher">
				<h1>{bootcamp.name}</h1>
				<p>{bootcamp.teacher}</p>
				<p>{bootcamp.description}</p>
			</section>
			<section className="bootcamp-buttons">
				<button>Edit Bootcamp</button>
				<button>Delete Bootcamp</button>
				<Link to="/index">
					<button>(TEMP) Home</button>
				</Link>
			</section>
		</div>
	);
}

export default SpesificBootcampPage;
