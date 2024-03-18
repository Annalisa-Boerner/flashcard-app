import { useState, useEffect, useContext} from "react";
import BackendApi from "../api";
import UserContext from "../common/UserContext";


export default function DeckView() {
    //hardcoded test of object
    const deckname = "crab-deck3"
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)

//Construct username and deckname object
    const currentUser = useContext(UserContext);

    const username = currentUser.username;
    console.log("username in DeckView:", username, "deckname in DeckView:", deckname);


    const userDeckObj = { 
        "username": username, 
        "deckname": deckname
    }

//pass deckname fk in via props from ViewDeckButton
//it gets sent in the body, not as a url param

//fetch cards by deckname and username
useEffect(()=> {
    const fetchCards = async () => {
        try {
            const cardFetchRes = await BackendApi.cardsByUsernameAndDeckname(
                userDeckObj
            )
            console.log('cardFetchRes', cardFetchRes)
            setCards(cardFetchRes);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching cards:", error)
            setLoading(false)
        }
fetchCards();
    }
}, [deckname])


//loop through deck of cards
//display cardfront, then cardback onClick
//then go to next card

if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{deckname} Details</h1>
      {/* Display cards */}
      <ul>
        {cards.map(card => (
          <li key={card.id}>{card.front}</li>
        ))}
      </ul>
    </div>
  );
};