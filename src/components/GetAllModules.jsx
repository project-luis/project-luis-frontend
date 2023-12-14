import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function GetAllModules(props) {
	const [bootcampsArray, setBootcampsArray] = useState([]);

	const getBootcampsFromAPI = () => {
		const storedToken = localStorage.getItem('authToken');
		axios
			.get(`${import.meta.env.VITE_API_URL}/bootcamps`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				setBootcampsArray(response.data);
				console.log('Bootcamp fetching success!');
			})
			.catch((error) => console.log(error));
	};

	const getRelatedBootcampFromAPI = async () => {
		try {
			const storedToken = localStorage.getItem('authToken');
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/bootcamps/${props.bootcampId}`,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error('Error fetching related bootcamp:', error);
			return null;
		}
	};

	const handleModuleClick = async (moduleId) => {
		try {
			// PUT /bootcamps/addModule/:bootcampId/ {moduleId}
			const storedToken = localStorage.getItem('authToken');
			// Make an API request to associate the module with the bootcamp
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/bootcamps/addModule/${
					props.bootcampId
				}`,
				{ moduleId },
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			);
			// const response = await axios.put(
			// 	// Use bootcampId and moduleId consistently here
			// 	`${
			// 		import.meta.env.VITE_API_URL
			// 	}/modules/${moduleId}/associate/${bootcampId}`,
			// 	{},
			// 	{
			// 		headers: { Authorization: `Bearer ${storedToken}` },
			// 	}
			// );
			console.log(`Module added to bootcamp: ${response.data}`);
			// Refresh the list of bootcamps to reflect the changes
			getBootcampsFromAPI();
			getRelatedBootcampFromAPI();
		} catch (error) {
			console.error('Error adding module to bootcamp:', error);
		}
	};

	useEffect(() => {
		getBootcampsFromAPI();
		getRelatedBootcampFromAPI();
	}, []);

	return (
		<div className="existing-modules">
			<h3>Choose Existing Module</h3>
			<small>Click submit after you are done with the selection</small>
			{bootcampsArray.map((bootcamp, i) => (
				<div key={bootcamp._id}>
					<h2>{bootcamp.name}</h2>
					<ul key={i}>
						{bootcamp.modules.map((module, i) => (
							<li key={module._id}>
								<Link
									key={i}
									to="#"
									onClick={() => {
										console.log('Bootcamp:', bootcamp);
										console.log('Module:', module);
										console.log('Bootcamp ID:', bootcamp._id);
										console.log('Module ID:', module._id);
										handleModuleClick(module._id);
									}}
								>
									<img
										className="bootcamp-module-logo"
										src={module.avatarUrl}
									/>
									{module.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default GetAllModules;
