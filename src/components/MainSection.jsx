import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import HomePage from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import NewDeckForm from "./NewDeckForm";
import Signup from "./Signup";
import SingleDeck from "./SingleDeck";

export default function MainSection() {
    return (
        <div id="main-section">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>

                <Route path="/decklist" element={<DeckList />}></Route>

                <Route path="/login" element={<Login />}></Route>

                <Route path="/logout" element={<Logout />}></Route>

                <Route path="/new-deck-form" element={<NewDeckForm />}></Route>

                <Route path="/signup" element={<Signup />}></Route>

                <Route path="/singledeck" element={<SingleDeck />}></Route>
            </Routes>
        </div>
    );
}
