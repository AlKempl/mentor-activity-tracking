import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.component.css";
import { withRouter } from 'react-router-dom';

import AuthService from "../services/auth.service";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            username: "",
            password: "",
            loading: false,
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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={e => this.handleLogin(e)} ref={c => {
                    this.form = c;
                }}>
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
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={this.state.loading}>
                        Login
                    </Button>
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        );
    }
}
withRouter(Login);

