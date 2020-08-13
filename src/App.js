import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import firebdb from "./firebase";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };

        this.authListener = this.authListener.bind(this);
        //this.handleDeleteId = this.handleDeleteId.bind(this);
    }
    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebdb.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    }
    render() {
        return (
            <div
                className="col-12"
                style={{ width: "100%", height: "100%", background: "white" }}
            >
                {this.state.user ? <Home /> : <Login />}
            </div>
        );
    }
}

export default App;
