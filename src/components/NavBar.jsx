import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../common/UserContext';
// import "./navbar.css";

function NavBar({ logout }) {
	const auth = useContext(UserContext);

	const loggedInNavBar = (
		<nav className="NavBar">
			<div>
				<NavLink to="/">AppName</NavLink>

				<div>
					<ul>
						<li>
							<NavLink to="/new-deck-form">New Deck</NavLink>
						</li>

						<li>
							<NavLink to="/" onClick={logout}>
								Logout {auth && auth.currentUser && auth.currentUser.username}
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);

	const loggedOutNavBar = (
		<nav className="NavBar">
			<div>
				<NavLink to="/">AppName</NavLink>

				<div>
					<ul>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/signup">Signup</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);

	return loggedOutNavBar;
	// return currentUser ? loggedInNavBar : loggedOutNavBar;
}

export default NavBar;
