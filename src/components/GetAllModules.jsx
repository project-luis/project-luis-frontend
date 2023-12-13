import axios from 'axios';
import { useEffect, useState } from 'react';

function GetAllModules() {
	const [bootcampsArray, setBootcampsArray] = useState([]);

	const getBootcampsFromAPI = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setBootcampsArray(response.data);
				console.log(response.data);
				console.log('Bootcamp fetching success!');
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getBootcampsFromAPI();
	}, []);

	return (
		<div>
			{bootcampsArray.map((bootcamp, i) => (
				<div key={i}>
					<h2>{bootcamp.name}</h2>
					<ul>
						{bootcamp.modules.map((module, i) => (
							<li key={i}>{module.name}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default GetAllModules;
