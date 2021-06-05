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
import NavDropdown from "react-bootstrap/NavDropdown";
import Stats from "./components/stats.component";

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
            isLoggedIn: false
        };
    }

    async componentDidMount() {
        const user = await AuthService.getCurrentUser();
        const isLoggedIn = await AuthService.isLoggedIn();
        const checkLevelAdmin = await AuthService.checkLevel("ROLE_ADMIN");
        const checkLevelModer = await AuthService.checkLevel("ROLE_MENTOR")
            || await AuthService.checkLevel("ROLE_SENIOR");

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: checkLevelModer,
                showAdminBoard: checkLevelAdmin,
                showUserBoard: isLoggedIn,
                isLoggedIn: isLoggedIn
            });
        } else {
            this.state = {
                showModeratorBoard: false,
                showAdminBoard: false,
                showUserBoard: false,
                currentUser: undefined,
                isLoggedIn: isLoggedIn
            };
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
        const {currentUser, showModeratorBoard, showAdminBoard, showUserBoard, isLoggedIn} = this.state;
        return (
            <div className="App">
                <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                    <LinkContainer to="/">
                        <Navbar.Brand className="font-weight-bold text-muted">
                            BI Bootcamp
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav activeKey={window.location.pathname}>
                            {showUserBoard && (
                                <LinkContainer to="/stats">
                                    <Nav.Link>Stats</Nav.Link>
                                </LinkContainer>
                            )}

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
                        </Nav>

                        {currentUser ? (
                            <Nav>
                                <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/login" onClick={this.logOut}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>Sign Up</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path={["/", "/home"]}><Home/></Route>
                    <Route exact path="/login"> {currentUser ? <Redirect to="/"/> : <Login/>}</Route>
                    <Route exact path="/register"> {currentUser ? <Redirect to="/"/> : <Register/>}</Route>
                    <Route exact path="/profile"> {<Profile/>}</Route>
                    <Route exact path="/user">{showUserBoard ? <BoardUser/> : <Redirect to="/"/>}</Route>
                    <Route exact path="/stats">{showUserBoard ? <Stats/> : <Redirect to="/"/>}</Route>
                    <Route exact path="/mod">{(showModeratorBoard) ? <BoardModerator/> : <Redirect to="/"/>}</Route>
                    <Route strict path="/admin">{<BoardAdmin/>}</Route>
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
