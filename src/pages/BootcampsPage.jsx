import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function BootcampsPage() {
	const [bootcampsArray, setBootcampsArray] = useState([]);

	const getBootcampsFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');

			axios
				.get(`${API_URL}/bootcamps`, {
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
							<Link to={`/bootcamps/${bootcamp.id}`}>
								<h2>{bootcamp.name}</h2>
								<p>{bootcamp.description}</p>
								<ul className="modules-list">
									{[...bootcamp.modules].map((module, i) => {
										return <li key={i}>{module.name}</li>;
									})}
								</ul>
							</Link>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default BootcampsPage;
