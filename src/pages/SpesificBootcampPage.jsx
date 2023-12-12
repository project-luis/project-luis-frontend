import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditBootcampPopup from './EditBootcampPopUp';

const API_URL = 'http://localhost:5005';

function SpesificBootcampPage() {
	const [modulesArray, setModulesArray] = useState([]);
	const [bootcamp, setBootcamp] = useState('');
	const [editButtonPopup, setEditButtonPopup] = useState(false);
	const { bootcampId } = useParams();
	const getBootcampFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');
			axios
				.get(`${API_URL}/bootcamps/${bootcampId}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					setBootcamp(response.data);
					setModulesArray(response.data.modules);
					console.log(`API: Connection success: ${response}`);
				})
				.catch((error) => {
					console.log(`API: Connection Failed: ${error}`);
					console.log(bootcampId);
				});
		}, []);
	};

	const deleteBootcamp = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.delete(`${API_URL}/bootcamps/${bootcampId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => {
				navigate('/bootcamps');
			})
			.catch((err) => console.log(err));
	};

	getBootcampFromApi();

	return (
		<div className="spesificBootcamp">
			<section className="bootcamp-modules-list">
				<h3>Modules</h3>
				{[...modulesArray].map((module, i) => {
					return (
						<Link key={i} to={`/modules/${module._id}`}>
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
				<button
					onClick={() => {
						setEditButtonPopup(true);
					}}
				>
					Edit Bootcamp
				</button>
				<EditBootcampPopup
					trigger={editButtonPopup}
					setTrigger={setEditButtonPopup}
				></EditBootcampPopup>
				<Link to={'/bootcamps'}>
					<button onClick={deleteBootcamp}>Delete Bootcamp</button>
				</Link>
				<Link to="/index">
					<button>(TEMP) Home</button>
				</Link>
			</section>
		</div>
	);
}

export default SpesificBootcampPage;