import React, {Component} from "react";
import "./login.component.css";

import AuthService from "../services/auth.service";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {CopyToClipboard} from "react-copy-to-clipboard";

require('dotenv').config()

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;

        return (
            <Jumbotron>
                <CardDeck>
                    <Card style={{width: '30rem'}}>
                        <Card.Header>
                            <h3><strong>Security</strong></h3>
                        </Card.Header>
                        <Card.Body style={{textAlign: "left"}}>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <strong>Environment: </strong>
                                    {
                                        ['production', 'staging'].includes(process.env.NODE_ENV) ?
                                            'Production' :
                                            'Development'
                                    }
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Token: </strong>{
                                    ['production', 'staging'].includes(process.env.NODE_ENV) ?
                                        currentUser.accessToken.substring(0, 6)
                                        + " **** " +
                                        currentUser.accessToken.substr(currentUser.accessToken.length - 6)
                                        :
                                        <CopyToClipboard text={currentUser.accessToken}
                                                         onCopy={() => this.setState({copied: true})}>
                                            <div>{currentUser.accessToken}</div>
                                        </CopyToClipboard>
                                }
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Id:</strong>{" "}
                                    {currentUser.id}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Authorities: </strong>
                                    {currentUser.roles &&
                                    currentUser.roles.join(', ')}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '30rem'}}>
                        <Card.Header>
                            <h3><strong>{currentUser.username}</strong> Profile</h3>
                        </Card.Header>
                        <Card.Body style={{textAlign: "left"}}>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <strong>Username:</strong>{" "}
                                    {currentUser.username}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Email:</strong>{" "}
                                    {currentUser.email}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>Authorities: </strong>
                                    {currentUser.roles &&
                                    currentUser.roles.join(', ')}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Jumbotron>
        );
    }

}