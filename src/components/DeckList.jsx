import { useState, useEffect, useContext } from "react";
import BackendApi from "../api";
import UserContext from "../common/UserContext";
// import ViewDeckButton from "./ViewDeckButton";

export default function DeckList() {
    const [deckNames, setDeckNames] = useState([]);
    const currentUser = useContext(UserContext);

    const username = currentUser.username;
    const userObj = { "username": username }

    //Async function to pull in decks from database
    useEffect(() => {
        async function fetchDecks() {
            try {
                console.log("entering fetchDecks");
                const fetchDeckRes = await BackendApi.allDecksByUsername(
                    userObj
                );
                console.log("fetchDeckRes", fetchDeckRes);
                setDeckNames(fetchDeckRes.decks);
                return fetchDeckRes;
            } catch (error) {
                console.error("Error fetching decks by username:", error);
            }
        }
        fetchDecks();
    }, []);

    console.log("deckNames above the return", deckNames)
    
    //map over the decks to display
    return (
        <div>
            <h2>Deck List</h2>
            <div id="deck-list-container">
                {deckNames.map((deckname) => {
                    return (
                        <div id="deck-list-card" key={deckname}>
                            <p >{deckname}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

