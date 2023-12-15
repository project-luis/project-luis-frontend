import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

import Navbar from '../components/Navbar';
import '../HomepageProfilePage.css';

function Homepage(props) {
	const [profile, setProfile] = useState('');
	const { user } = useContext(AuthContext);

	const getProfileData = () => {
		const storedToken = localStorage.getItem('authToken');

		axios
			.get(`${import.meta.env.VITE_API_URL}/profile/${user?._id}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const profile = response.data;
				setProfile(profile);
			})
			.catch((error) => {
				console.log(`API: Connection Failed: ${error}`);
			});
	};

	useEffect(() => {
		getProfileData(profile);
	}, []);

	return (
		<>
			<Navbar />

			<div className="homepage-full">
				<div className="homepage-sidebar-left">
					<h3>Your Bootcamps</h3>
				</div>

				<div className="homepage-content-right">
					<div className="welcome-banner">
						<h2>Welcome home, {profile.fullName}!</h2>
					</div>

					<section className="homepage-news-block">
						<h2>Tech News</h2>
						<div className="news">
							<img
								src="https://images.idgesg.net/images/article/2023/03/shutterstock_2231537301-100938356-large.jpg?auto=webp&quality=85,70"
								alt=""
							/>
							<h3>TypeScript 5.3 arrives with support for import attributes</h3>
							<p>
								ECMAScript import attributes will support additional types of
								modules in a common way across JavaScript environments, starting
								with JSON modules.
								<br />
								TypeScript 5.3, an upgrade to Microsoft’s strongly typed
								JavaScript variant that adds support for import attributes for
								ECMAScript modules, is now available as a production release.
							</p>
						</div>
						<hr />
						<div className="news">
							<img
								src="https://digitalfutures.cio.com/wp-content/uploads/sites/55/2023/11/Using-AI-to-strengthen-cybersecurity-shutterstock_510397921-1000x565.jpg.webp"
								alt=""
							/>
							<h3>Using AI to strengthen cybersecurity</h3>
							<p>
								It’s a grim reality: Bad actors are harnessing artificial
								intelligence (AI) to improve the effectiveness of their attacks.
								It’s time for IT and business leaders to put AI to work
								defending their data. The best place to start is speeding up
								attack detection.
								<br />
								“When it comes to discovering attacks, it’s all about the data.
								The faster you can analyze it, the better,” says Rita Jackson,
								senior vice president of product marketing at OpenText.
								<br />
								“Although the sheer quantity of data that must be scanned is
								steadily increasing, there’s more processing power than ever —
								plenty for AI to discern trends and patterns that might betray a
								breach,” says Jeff Healey, vice president of analytics and AI
								product marketing at OpenText.
							</p>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

export default Homepage;
