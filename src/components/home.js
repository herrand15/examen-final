import React from "react";
import Form from "./form";
import firebdb from "../firebase";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registers: {},
            beingEdited: "",
        };

        this.operation = this.operation.bind(this);
        this.editId = this.editId.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.logOut = this.logOut.bind(this);
        //this.handleDeleteId = this.handleDeleteId.bind(this);
    }

    componentDidMount() {
        firebdb
            .database()
            .ref()
            .child("registers")
            .on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    this.setState({ registers: snapshot.val() });
                } else {
                    this.setState({ registers: {} });
                }
            });
    }

    operation = (obj) => {
        if (this.state.beingEdited == "") {
            firebdb
                .database()
                .ref()
                .child("registers")
                .push(obj, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({ beingEdited: "" });
                    }
                });
        } else {
            firebdb
                .database()
                .ref()
                .child(`registers/${this.state.beingEdited}`)
                .set(obj, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({ beingEdited: "" });
                    }
                });
        }
    };

    editId(ide) {
        this.setState({ beingEdited: ide });
        console.log("SE EDITO " + this.state.beingEdited);
    }

    logOut() {
        firebdb.auth().signOut();
    }

    onDelete(id) {
        if (window.confirm("Esta seguro que desea ELIMINAR este registro?")) {
            firebdb
                .database()
                .ref()
                .child(`registers/${id}`)
                .remove((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({ beingEdited: "" });
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Registro</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div
                            className="card"
                            style={{ width: "100%", borderColor: "blue" }}
                        >
                            <div className="card-header text-white bg-primary mb-2">
                                Contact Form
                            </div>

                            <Form
                                // operation={this.operation}
                                // registers={this.state.registers}
                                // editingId={this.state.beingEdited}
                                {...{
                                    operation: this.operation,
                                    registers: this.state.registers,
                                    beingEdited: this.state.beingEdited,
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <button
                            className="btn btn-secondary"
                            onClick={this.logOut}
                        >
                            Sign Out
                        </button>
                        <table className="table table-borderless table-stripped">
                            <thead className="thead-light">
                                <tr>
                                    <th>No</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.state.registers).map(
                                    (id, idx) => {
                                        return (
                                            <tr id={id} key={id}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    {
                                                        this.state.registers[id]
                                                            .fieldOne
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.registers[id]
                                                            .fieldTwo
                                                    }
                                                </td>
                                                <a
                                                    href={`mailto: ${this.state.registers[id].fieldThree}`}
                                                >
                                                    <td>
                                                        {
                                                            this.state
                                                                .registers[id]
                                                                .fieldThree
                                                        }
                                                    </td>
                                                </a>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-block"
                                                        onClick={() =>
                                                            this.editId(id)
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-block"
                                                        onClick={() =>
                                                            this.onDelete(id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
