import { useState, useEffect } from "react";
import { fetchGlassTypes } from "../fetching";
import ViewDeckButton from "./ViewDeckButton";

export default function DeckList() {
    const [glasses, setGlasses] = useState([]);
    //TODO async function to pull in decks from database

    //PLACEHOLDER, an async function to test display with drink glasses
    useEffect(() => {
        async function getGlasses() {
            try {
                console.log("entering getGlasses");
                const glassTypes = await fetchGlassTypes();
                console.log("glassTypes.drinks", glassTypes.drinks);
                setGlasses(glassTypes.drinks);
                return glassTypes;
            } catch (error) {
                console.error(error);
            }
        }
        getGlasses();
    }, []);

    console.log(glasses);
    //map over the decks to display
    return (
        <div>
            <h2>Deck List</h2>
            <div id="deck-list-container">
                {glasses.map((glass) => {
                    return (
                        // TODO pass in props to ViewDeckButton to display correct deck
                        <div id="deck-list-card" key={glass.strGlass}>
                            <p>{glass.strGlass}</p>
                            <ViewDeckButton />
                            <br />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
