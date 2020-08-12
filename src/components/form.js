import React from "react";
import firebdb from "../firebase";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editingId: "",
            fieldOne: "",
            fieldTwo: "",
            fieldThree: "",
            fieldFour: "",
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.repopulate = this.repopulate.bind(this);
        this.clearF = this.clearF.bind(this);
        //this.handleDeleteId = this.handleDeleteId.bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.beingEdited == "") {
            console.log(this.props.beingEdited);
            console.log("esto esta entrando");
        } else {
            if (this.props.beingEdited == prevProps.beingEdited) return;
            this.setState({ editingId: this.props.beingEdited });
            this.repopulate();
            //this.props.beingEdited = "";
        }
    }

    handleInput = (event) => {
        var { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.operation(this.state);
        this.setState({
            fieldOne: "",
            fieldTwo: "",
            fieldThree: "",
            fieldFour: "",
            editingId: "",
        });
    };

    clearF() {
        this.setState({
            fieldOne: "",
            fieldTwo: "",
            fieldThree: "",
            fieldFour: "",
            editingId: "",
        });
    }

    repopulate() {
        console.log("ESTO ES " + this.props.beingEdited);
        this.setState({
            fieldOne: this.props.registers[this.props.beingEdited].fieldOne,
            fieldTwo: this.props.registers[this.props.beingEdited].fieldTwo,
            fieldThree: this.props.registers[this.props.beingEdited].fieldThree,
        });
    }

    onDelete(id) {
        if (this.state.editingId == "") {
            window.confirm(
                "No esta editando ningun registro, por lo que no puede eliminar"
            );
        } else if (
            window.confirm("Esta seguro que desea ELIMINAR este registro?")
        ) {
            firebdb.child(`registers/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({ editingId: "" });
                }
            });
        }
    }

    render() {
        return (
            // <div className="panel panel-primary">
            //     <div className="panel-heading">Contact Form</div>
            //     <div className="panel-body">
            <form id="myform" autoComplete="off" onSubmit={this.handleSubmit}>
                {/* <div className="panel-group"> */}
                <b>First Name</b>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    <input
                        className="form-control"
                        placeholder="John"
                        name="fieldOne"
                        value={this.state.fieldOne}
                        onChange={this.handleInput}
                    />
                </div>
                {/* <div className="form-row"> */}
                <b>Last Name</b>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>

                    <input
                        className="form-control"
                        placeholder="Lee"
                        name="fieldTwo"
                        value={this.state.fieldTwo}
                        onChange={this.handleInput}
                    />
                </div>
                <b>Email</b>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="lee@gmail.com"
                        name="fieldThree"
                        value={this.state.fieldThree}
                        onChange={this.handleInput}
                    />
                </div>
                <b>Mobile #</b>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="233-23333"
                        name="fieldFour"
                        value={this.state.fieldFour}
                        onChange={this.handleInput}
                    />
                </div>
                {/* </div> */}

                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-warning btn-block"
                                onClick={() => this.clearF()}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="col">
                            <input
                                type="submit"
                                value={
                                    this.state.editingId == ""
                                        ? "Save"
                                        : "Update"
                                }
                                className={
                                    this.state.editingId == ""
                                        ? "btn btn-success btn-block"
                                        : "btn btn-primary btn-block"
                                }
                            />
                        </div>
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={() =>
                                    this.onDelete(this.state.editingId)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </form>
            //     </div>
            // </div>
        );
    }
}

export default Form;
