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

// With bootstrap:

// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import UserContext from "../common/UserContext";
// import "./navbar.css";

// function NavBar({ logout }) {
//   const { currentUser } = useContext(UserContext);

//   const loggedInNavBar = (
//     <nav className="navbar navbar-expand-md navbar-light bg-light">
//       <div className="container-fluid">
//         <NavLink to="/" className="navbar-brand">
//           AppName
//         </NavLink>

//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <NavLink to="/new-deck-form" className="nav-link">
//                 New Deck
//               </NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/" onClick={logout} className="nav-link">
//                 Logout {currentUser && currentUser.username}
//               </NavLink>
//             </li>

//           </ul>
//         </div>
//       </div>
//     </nav>
//   );

//   const loggedOutNavBar = (
//     <nav className="navbar navbar-expand-md navbar-light bg-light">
//       <div className="container-fluid">
//         <NavLink to="/" className="navbar-brand">
//           AppName
//         </NavLink>

//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <NavLink to="/login" className="nav-link">
//                 Login
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/signup" className="nav-link">
//                 Signup
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );

//   return currentUser ? loggedInNavBar : loggedOutNavBar;
// }

// export default NavBar;
