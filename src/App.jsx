import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import { jwtDecode } from "jwt-decode";
import UserContext from "./common/UserContext";
import useLocalStorageState from "./hooks/useLocalStorageState";
import LoadingSpinner from "./common/LoadingSpinner";
import BackendApi from "./api";

function App() {
    //github initial commit comment

    const [token, setToken] = useLocalStorageState("authToken");
    let [currentUser, setCurrentUser] = useState(null);
    let [deckIds, setDeckIds] = useState(null);
    const [userInfoLoaded, setUserInfoLoaded] = useState(false);

    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                try {
                    console.log("token in App.jsx: ", token);
                    let { username } = jwtDecode(token);
                    BackendApi.token = token;

                    let currentUser = await BackendApi.getCurrentUser(username);
                    currentUser.decks !== null
                        ? setDeckIds(new Set(currentUser.decks))
                        : setDeckIds(null);
                    setCurrentUser(currentUser);
                    console.log(
                        "currentUser inside of getCurrentUser function",
                        currentUser
                    );
                } catch (err) {
                    setCurrentUser(null);
                }
            }
            setUserInfoLoaded(true);
        }
        setUserInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    async function login(data) {
        try {
            let token = await BackendApi.login(data);
            setToken(token);
            return { loggedIn: true };
        } catch (errs) {
            return { loggedIn: false, errs: errs };
        }
    }

    async function signup(data) {
        try {
            let token = await BackendApi.signup(data);
            setToken(token);
            return { signedUp: true };
        } catch (errs) {
            return { signedUp: false, errs: errs };
        }
    }

    async function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    if (!userInfoLoaded) return <LoadingSpinner />;

    console.log("currentUser", currentUser);
    console.log("token", token);

    return (
        <>
            <div id="app-container">
                <UserContext.Provider value={currentUser}>
                    <BrowserRouter>
                        <NavBar logout={logout} />
                        <MainSection login={login} signup={signup} />
                    </BrowserRouter>
                </UserContext.Provider>
            </div>
        </>
    );
}

export default App;
