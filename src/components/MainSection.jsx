import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import HomePage from "./Home";
import Login from "./Login";
import NewDeckForm from "./NewDeckForm";
import Signup from "./Signup";
import DeckView from "./DeckView"

export default function MainSection({ login, signup }) {
    return (
        <div id="main-section">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>

                <Route path="/decklist" element={<DeckList />}></Route>
                
                <Route path="/cards/:deckname" element={<DeckView />}></Route>

                <Route path="/login" element={<Login login={login} />}></Route>

                <Route path="/newdeckform" element={<NewDeckForm />}></Route>

                <Route path="/signup" element={<Signup signup={signup} />}></Route>

            </Routes>
        </div>
    );
}
