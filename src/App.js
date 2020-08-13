import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import firebdb from "./firebase";
import HomeApp from "./components/homeApp";
function App() {
    return (
        <div
            className="col-12"
            style={{ width: "100%", height: "100%", background: "white" }}
        >
            <HomeApp />
        </div>
    );
}

export default App;
