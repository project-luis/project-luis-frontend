import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

import "../tempHomepageCss.css";

function Homepage(props) {
	const { user } = useContext(AuthContext);

	const getAccessFromApi = () => {
		useEffect(() => {
			const storedToken = localStorage.getItem('authToken');

			axios
				.get(`${import.meta.env.VITE_API_URL}/index`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					console.log(`API: Connection success!: ${response}`);
				})
				.catch((error) => {
					console.log(`API: Connection Failed: ${error}`);
				});
		}, []);
	};

	getAccessFromApi();

	return (
		<>
			<div className="homepage-hamburger-menu">
				<Link to={`/profile/${user?._id}`}>
					<button>My Profile</button>
				</Link>

				<Link to="/bootcamps">
					<button>Bootcamps</button>
				</Link>
			</div>

			<div className="homepage-full">
				<div className="homepage-sidebar-left">
					<p>Your Bootcamps sidebar</p>
				</div>

				<div className="homepage-content-right">
					<div className="welcome-banner">
						<h2>{`Hello ${user?.fullName}!`}</h2>
					</div>
				
					<section className="homepage-news-block">
						<h3>Bootcamp News</h3>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
							ligula felis, id varius arcu interdum ac. Curabitur non risus lorem.
							Mauris eget tristique ipsum. Vivamus aliquet bibendum ultrices. Duis
							auctor fringilla justo, vel tincidunt mi ullamcorper sed. Phasellus a
							magna eu turpis venenatis tincidunt. Morbi eu facilisis elit, ut
							maximus urna. Sed at iaculis tortor. Donec ullamcorper fringilla eros,
							ut pellentesque nulla dignissim ac. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Sed vitae tristique nisl, a tincidunt
							dolor. Integer augue sem, viverra nec feugiat at, gravida at libero.
							Suspendisse lobortis, est id cursus interdum, odio nunc fringilla
							erat, id cursus tellus dolor eu risus.
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

export default Homepage;
