import './App.css';
import {Nav, Navbar} from 'react-bootstrap';
import React, {Component} from "react";

import {LinkContainer} from "react-router-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import {Route, Switch} from "react-router-dom";
import NotFound from "./components/notfound.component";
import Redirect from "react-router-dom/es/Redirect";

const _ = require('lodash');

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            showUserBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MENTOR") || user.roles.includes("ROLE_SENIOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                showUserBoard: user.roles.includes("ROLE_USER"),
            });
        }
    }

    logOut() {
        this.setState({
            currentUser: null,
            showModeratorBoard: false,
            showAdminBoard: false,
            showUserBoard: false,
        });
        AuthService.logout();
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <div className="App">
                <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                    <LinkContainer to="/">
                        <Navbar.Brand className="font-weight-bold text-muted">
                            Scratch
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav activeKey={window.location.pathname}>
                            {showUserBoard && (
                                <LinkContainer to="/user">
                                    <Nav.Link>User Board</Nav.Link>
                                </LinkContainer>
                            )}

                            {showModeratorBoard && (
                                <LinkContainer to="/mod">
                                    <Nav.Link>Moderator Board</Nav.Link>
                                </LinkContainer>
                            )}

                            {showAdminBoard && (
                                <LinkContainer to="/admin">
                                    <Nav.Link>Admin Board</Nav.Link>
                                </LinkContainer>
                            )}

                            {showAdminBoard && (
                                <LinkContainer to="/user">
                                    <Nav.Link>User Board</Nav.Link>
                                </LinkContainer>
                            )}

                            {currentUser ? (
                                <div>
                                    <LinkContainer to="/profile">
                                        <Nav.Link>{currentUser.username}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link onSelect={this.logOut}>Logout</Nav.Link>
                                    </LinkContainer>
                                </div>
                            ) : (
                                <div>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Sign Up</Nav.Link>
                                    </LinkContainer>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path={["/", "/home"]}><Home/></Route>
                    <Route exact path="/login"> {currentUser ? <Redirect to="/" /> : <Login />}</Route>
                    <Route exact path="/register"> {currentUser ? <Redirect to="/" /> : <Register />}</Route>
                    <Route exact path="/profile"><Profile/></Route>
                    <Route exact path="/user"><BoardUser/></Route>
                    <Route exact path="/mod"><BoardModerator/></Route>
                    <Route exact path="/admin"><BoardAdmin/></Route>
                    {/* Finally, catch all unmatched routes */}
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
