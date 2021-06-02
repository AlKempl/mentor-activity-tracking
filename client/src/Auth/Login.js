import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useAppContext } from "../Libs/contextLib";
import axios from 'axios';
import {FormLabel} from "react-bootstrap";


export default function Login() {
    const { isAuthenticated, userHasAuthenticated } = useAppContext();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return login.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            axios.post('/api/auth/login').then((res) => {
                const response = res.data;
                console.log(response);
            });
            //await Auth.signIn(login, password);
            userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <FormLabel>isAuthenticated: {isAuthenticated ? '1' : '0'}</FormLabel>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}