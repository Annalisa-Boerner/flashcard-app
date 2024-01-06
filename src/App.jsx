import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";

function App() {
    //github initial commit comment
    return (
        <>
            <div id="app-container">
                <NavBar />
                <BrowserRouter>
                    <MainSection />
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
