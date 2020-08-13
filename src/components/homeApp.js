import React from "react";
import firebdb from "../firebase";
import Login from "./login";
import Home from "./home";

class HomeApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
        this.authListener = this.authListener.bind(this);
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
                {" "}
                {this.state.user ? <Home /> : <Login />}
            </div>
        );
    }
}

export default HomeApp;
