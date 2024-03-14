import { useState, useEffect, useContext } from "react";
// import { fetchGlassTypes } from "../fetching";
import BackendApi from "../api";
import UserContext from "../common/UserContext";
// import ViewDeckButton from "./ViewDeckButton";

export default function DeckList() {
    const [decks, setDecks] = useState([]);
    const currentUser = useContext(UserContext);

    const username = currentUser.username;
    console.log("username from useContext:", username);
    const userObj = { "username": username }

    //TODO async function to pull in decks from database
    useEffect(() => {
        async function fetchDecks() {
            try {
                console.log("entering fetchDecks");
                const fetchDeckRes = await BackendApi.allDecksByUsername(
                    userObj
                );
                console.log("fetchDeckRes", fetchDeckRes);
                setDecks(fetchDeckRes.decks);
                return fetchDeckRes;
            } catch (error) {
                console.error("Error fetching decks by username:", error);
            }
        }
        fetchDecks();
    }, []);

    console.log("decks above the return", decks)
    //map over the decks to display
    return (
        <div>
            <h2>Deck List</h2>
            <div id="deck-list-container">
                {decks.map((deck) => {
                    return (
                        <div id="deck-list-card" key="deck.id">
                            <p>{deck}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// {glasses.map((glass) => {
//     return (
//         // TODO pass in props to ViewDeckButton to display correct deck
//         <div id="deck-list-card" key={glass.strGlass}>
//             <p>{glass.strGlass}</p>
//             <ViewDeckButton />
//             <br />
//         </div>
//     );
// })}
