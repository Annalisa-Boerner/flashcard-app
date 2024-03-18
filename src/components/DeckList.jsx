import { useState, useEffect, useContext } from "react";
import BackendApi from "../api";
import UserContext from "../common/UserContext";
import ViewDeckButton from "./ViewDeckButton";

export default function DeckList() {
    //View decks
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

    // //set up currentDeck props for ViewDeckButton and DeckView
    // const [currentDeck, setCurrentDeck] = useState('')

    // const handleViewDeck = (deckname) => {
    //     setCurrentDeck(deckname)
    // }

    //map over the decks to display
    //only names of decks are being returned as "decks"
    return (
        <div>
            <h2>Deck List</h2>
            <div id="deck-list-container">
                {deckNames.map((deckname) => {
                    return (
                        <div id="deck-list-card" key={deckname}>
                            <p >{deckname}</p>
                            {/* <ViewDeckButton deckname={deckname}/> */}

                        </div>
                    );
                })}
            </div>
        </div>
    );
}


