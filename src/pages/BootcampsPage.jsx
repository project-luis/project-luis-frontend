import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BootcampsPage() {
	const [bootcampsArray, setBootcampsArray] = useState([]);

	const getBootcampsFromApi = () => {
		useEffect(() => {
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
		}, []);
	};

	getBootcampsFromApi();

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
										<Link key={i} to={`/bootcamps/modules/${module._id}`}>
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
			
			<Link to="/index">
				<button>(TEMP) Home</button>
			</Link>
			
		</div>
	);
}

export default BootcampsPage;
