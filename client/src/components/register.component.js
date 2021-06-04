import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./register.component.css";

import AuthService from "../services/auth.service";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <div className="Register">
                <Form onSubmit={e => this.handleRegister(e)} ref={c => {
                    this.form = c;
                }}>
                    {!this.state.successful && (<div>
                            <Form.Group size="lg" controlId="username">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    required
                                    autoFocus
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </Form.Group>
                        </div>
                    )}
                    <Button block size="lg" type="submit" disabled={this.state.loading}>
                        Sign Up
                    </Button>
                    {this.state.message && (
                    <div className="form-group">
                        <div
                            className={
                                this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {this.state.message}
                        </div>
                    </div>
                    )}
                </Form>
            </div>
        );
    }

}