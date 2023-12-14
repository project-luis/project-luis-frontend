import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import AddBootcampPopup from '../components/AddBootcampPopup';

import "../tempProfileCss.css";

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
		<>
			<Navbar />
			<div className="bootcamps">
				<section className="bootcamp-list">
					{[...bootcampsArray].map((bootcamp, i) => {
						return (
							<div key={i} className="bootcamp">
								<Link to={`/bootcamps/${bootcamp._id}`}>
									<h2>
										<img
											className="bootcamps-module-logo"
											src={bootcamp.avatarUrl}
										/>
										{bootcamp.name}
									</h2>
								</Link>
								<p>{bootcamp.description}</p>
								<ul className="modules-list">
									{[...bootcamp.modules].map((module, i) => {
										return (
											<div className="module-logo-tester">
												<Link key={i} to={`/modules/${module._id}`}>
													<li className="single-module">
														<img
															className="bootcamps-module-logo"
															src={module.avatarUrl}
														/>
														{module.name}
													</li>
												</Link>
											</div>
										);
									})}
								</ul>
							</div>
						);
					})}
				</section>

				<button
					className="add-bootcamp-button"
					onClick={() => {
						setAddButtonPopup(true);
					}}
				>
					+
				</button>
				<AddBootcampPopup
					trigger={addButtonPopup}
					setTrigger={setAddButtonPopup}
					getBootcampsFromApi={getBootcampsFromApi}
				></AddBootcampPopup>

			</div>
		</>
	);
}

export default BootcampsPage;
