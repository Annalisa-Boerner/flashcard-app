import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import DeckView from "./DeckView"
import HomePage from "./Home";
import Login from "./Login";
import NewDeckForm from "./NewDeckForm";
import Signup from "./Signup";
import SingleDeck from "./SingleDeck";

export default function MainSection({ login, signup }) {
    return (
        <div id="main-section">
            <Routes>
                <Route path="/" element={<HomePage />}/>


             <Route path='/decklist' element={DeckList} />

            <Route path="/cards/:deckname" element={DeckView} />
                 


            <Route path="/login" element={<Login login={login} />}/>

                <Route path="/newdeckform" element={<NewDeckForm />}/>

                <Route path="/signup" element={<Signup signup={signup} />}/>

                <Route path="/singledeck" element={<SingleDeck />}/>
            </Routes>
        </div>
    );
}
