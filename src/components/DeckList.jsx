import { useState, useEffect } from "react";
import { fetchSingleJoke } from "../fetching";

export default function DeckList() {
    const [dadJoke, setDadJoke] = useState([]);
    //TODO async function to pull in decks from database

    //first, an async function to test display with a single random joke from dad jokes
    useEffect(() => {
        async function getAJoke() {
            try {
                const response = await fetchSingleJoke();
                // let result = response;
                console.log("response in decklist getAJoke", response);
                if (response) {
                    // setDadJoke(response);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getAJoke();
    }, []);

    //map over the decks to display
    return (
        <div>
            <h2>Decklist</h2>
            <p>{dadJoke}</p>
        </div>
    );
}
