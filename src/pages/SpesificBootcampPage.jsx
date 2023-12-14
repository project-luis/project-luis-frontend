import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditBootcampPopup from '../components/EditBootcampPopup';
import AddmodulePopup from '../components/AddModulePopUp';
import { AuthContext } from '../context/auth.context';

function SpesificBootcampPage() {
	const [modulesArray, setModulesArray] = useState([]);
	const [addButtonPopup, setAddButtonPopup] = useState();
	const [bootcamp, setBootcamp] = useState('');
	const [editButtonPopup, setEditButtonPopup] = useState(false);
	const [profile, setProfile] = useState('');
	const { bootcampId } = useParams();
	const { user } = useContext(AuthContext);

	const getBootcampFromApi = () => {
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
				console.log(bootcampId);
			});
	};

	const getProfileFromApi = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${import.meta.env.VITE_API_URL}/profile/${user?._id}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setProfile(response.data);
				console.log(`API: User connection success: ${response}`);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
			});
	};
	useEffect(() => {
		getBootcampFromApi();
		getProfileFromApi(profile);
	}, []);

	const deleteBootcamp = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.delete(`${import.meta.env.VITE_API_URL}/bootcamps/${bootcampId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => {
				navigate('/bootcamps');
			})
			.catch((err) => console.log(err));
	};
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
					onClick={() => {
						setAddButtonPopup(true);
					}}
				>
					Add Module
				</button>
			</section>
			<AddmodulePopup
				trigger={addButtonPopup}
				setTrigger={setAddButtonPopup}
				getBootcampFromApi={getBootcampFromApi}
			></AddmodulePopup>
			<section className="description-and-teacher">
				<h1>{bootcamp.name}</h1>
				<p>{profile?.fullName}</p>
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
					getBootcampFromApi={getBootcampFromApi}
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
