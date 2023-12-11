import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Homepage(props) {

    const [teacher, setTeacher] = useState('');
    const { teacherId } = useParams();

    const getOneTeacher = () => {

        axios
            .get(`${API_URL}/profile/${teacherId}`)
            .then((response) => {
                setTeacher(response.data);
            })
            .catch((error) => console.log(error))

    };

    getOneTeacher();

    return (
        <>

            <div className="hamburger">

                <Link to="/profile/:profileId">
                    <button>My Profile</button>
                </Link>

                <Link to="/bootcamps">
                    <button>Bootcamps</button>
                </Link>

            </div>

            <div className="sidebar-left">
                <h3>--This is the sidebar -- Your Bootcamps</h3>
            </div>

            <div className="welcome-banner">
                Welcome {teacher.name}
            </div>

            <section>
                <h2>Bootcamp News</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet ligula felis, id varius arcu interdum ac. Curabitur non risus lorem. Mauris eget tristique ipsum. Vivamus aliquet bibendum ultrices. Duis auctor fringilla justo, vel tincidunt mi ullamcorper sed. Phasellus a magna eu turpis venenatis tincidunt. Morbi eu facilisis elit, ut maximus urna. Sed at iaculis tortor. Donec ullamcorper fringilla eros, ut pellentesque nulla dignissim ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tristique nisl, a tincidunt dolor. Integer augue sem, viverra nec feugiat at, gravida at libero. Suspendisse lobortis, est id cursus interdum, odio nunc fringilla erat, id cursus tellus dolor eu risus.</div>
            </section>
        </>
    );
}

export default Homepage;