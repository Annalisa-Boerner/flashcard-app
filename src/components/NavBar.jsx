import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../common/UserContext";
// import "./navbar.css";

function NavBar({ logout }) {
    const currentUser = useContext(UserContext);
    // console.log("currentUser top of nav", currentUser);
    const loggedInNavBar = (
        <nav className="NavBar">
            <div>
                <NavLink to="/">Home</NavLink>

                <div>
                    <ul>
                        <li>
                            <NavLink to="/newdeckform">New Deck</NavLink>
                        </li>

                        <li>
                            <NavLink to="/" onClick={logout}>
                                Logout {currentUser && currentUser.username}
                            </NavLink>
                        </li>
                        <li><NavLink to="/decklist">My Decks</NavLink></li>
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

    return currentUser ? loggedInNavBar : loggedOutNavBar;
}

export default NavBar;
