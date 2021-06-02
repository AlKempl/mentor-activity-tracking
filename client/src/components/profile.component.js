import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.component.css";
import {FormLabel} from "react-bootstrap";

import AuthService from "../services/auth.service";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Jumbotron>
                <Card style={{ width: '30rem' }}>
                    <Card.Header>
                        <h3><strong>{currentUser.username}</strong> Profile</h3>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <strong>Token:</strong>{" "}
                                {currentUser.accessToken.substring(0, 5)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 5)}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Id:</strong>{" "}
                                {currentUser.id}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Authorities: </strong>
                                    {currentUser.roles &&
                                    currentUser.roles.join()}
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Jumbotron>
        );
    }

}