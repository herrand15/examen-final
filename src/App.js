import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import firebdb from "./firebase";

function App() {
    const user = null;
    componentDidMount(() => {
        authListener();
    });

    authListener(() => {
        firebdb.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    });

    return (
        <div
            className="col-12"
            style={{ width: "100%", height: "100%", background: "white" }}
        >
            <Home />
            {/* {this.state.user ? <Home /> : <Login />} */}
        </div>
    );
}

export default App;
