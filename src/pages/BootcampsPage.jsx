import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddBootcampPopup from '../components/AddBootcampPopup';

function BootcampsPage() {
	const [bootcampsArray, setBootcampsArray] = useState([]);
	const [addButtonPopup, setAddButtonPopup] = useState(false);

	const getBootcampsFromApi = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const oneBootcamp = response.data;
				setBootcampsArray(oneBootcamp);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
			});
	};
	useEffect(() => {
		getBootcampsFromApi();
	}, []);

	return (
		<div className="bootcamps">
			<section className="bootcamp-list">
				{[...bootcampsArray].map((bootcamp, i) => {
					return (
						<div key={i} className="bootcamp">
							<Link to={`/bootcamps/${bootcamp._id}`}>
								<h2>{bootcamp.name}</h2>
							</Link>
							<p>{bootcamp.description}</p>
							<ul className="modules-list">
								{[...bootcamp.modules].map((module, i) => {
									return (
										<Link key={i} to={`/modules/${module._id}`}>
											<li className="single-module">
												<img
													className="bootcamps-module-logo"
													src={module.avatarUrl}
												/>
												{module.name}
											</li>
										</Link>
									);
								})}
							</ul>
						</div>
					);
				})}
			</section>

			<button
				onClick={() => {
					setAddButtonPopup(true);
				}}
			>
				Add Bootcamp
			</button>
			<AddBootcampPopup
				trigger={addButtonPopup}
				setTrigger={setAddButtonPopup}
				getBootcampsFromApi={getBootcampsFromApi}
			></AddBootcampPopup>
			<Link to="/index">
				<button>(TEMP) Home</button>
			</Link>
		</div>
	);
}

export default BootcampsPage;
