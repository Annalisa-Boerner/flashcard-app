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
        <div id="MainSection">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
            </Routes>
            <Routes>
                <Route path="/decklist" element={<DeckList />}></Route>
            </Routes>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <Routes>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
            <Routes>
                <Route path="/new-deck-form" element={<NewDeckForm />}></Route>
            </Routes>
            <Routes>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
            <Routes>
                <Route path="/singledeck" element={<SingleDeck />}></Route>
            </Routes>
        </div>
    );
}
