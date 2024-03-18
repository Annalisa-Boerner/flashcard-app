import { useState, useEffect, useContext} from "react";
import BackendApi from "../api";
import UserContext from "../common/UserContext";

export default function DeckView() {
//hardcoded object version
const deckname = "crab-deck3"
const [cards, setCards] = ([])

//Construct username and deckname object for request body
const currentUser = useContext(UserContext);
const username = currentUser.username;

const userDecknameObj =  {
    "username": username,
    "deckname": deckname
}
    //fetch cards by deck FK
    useEffect(()=> {
        const fetchCards = async () => {
            try {
                console.log("entering fetchCards in front end; userDecknameObj:", userDecknameObj)
                const cardFetchRes = await BackendApi.cardsByUsernameAndDeckname(
                    userDecknameObj
                )
                console.log('cardFetchRes', cardFetchRes)
                setCards(cardFetchRes);
               
    
            } catch (error) {
                console.error("Error fetching cards:", error)

            }
        }
        fetchCards();
    })
//deckname dependency array once no longer hardcoded
console.log("cards in DeckView before return:", cards)

//loop through deck of cards
//display cardfront, then cardback onClick
//then go to next card
    return <div>
        <h2>Deckview</h2>
    </div>;
}