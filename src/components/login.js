import React, { Component } from "react";

import firebdb from "../firebase";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        //this.handleDeleteId = this.handleDeleteId.bind(this);
    }

    submit() {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        firebdb
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((u) => {
                console.log("Successfully Signed Up");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            });
    }

    submitSignUp() {
        firebdb
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then((u) => {
                console.log("Successfully Signed Up");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            });
    }

    render() {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#1c8ef9",
                }}
            >
                <div
                    className="col-md-8"
                    style={{
                        alignItems: "center",
                        alignContent: "center",
                        width: "100%",
                    }}
                >
                    <form
                        style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            alignItems: "center",
                            alignContent: "center",
                            paddingLeft: "10%",
                        }}
                    >
                        <h3>Sign In</h3>

                        <div
                            className="form-group"
                            style={{
                                width: "80%",
                                alignItems: "center",
                                alignContent: "center",
                                paddingLeft: "10%",
                            }}
                        >
                            <label>Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                            />
                        </div>

                        <div
                            className="form-group"
                            style={{
                                width: "80%",
                                alignItems: "center",
                                alignContent: "center",
                                paddingLeft: "10%",
                            }}
                        >
                            <label>Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                            />
                        </div>

                        <div
                            className="form-group"
                            style={{
                                width: "80%",
                                alignItems: "center",
                                alignContent: "center",
                                paddingLeft: "10%",
                            }}
                        >
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customCheck1"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            style={{ width: "80%", paddingLeft: "10%" }}
                            onClick={this.submit}
                        >
                            Sign In
                        </button>

                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
