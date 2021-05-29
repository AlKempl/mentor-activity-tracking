import './App.css';
import AppNavbar from './AppNavbar'
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import React, { useState } from "react";

import Routes from "./Routes";
import { AppContext } from "./Libs/contextLib";
import {LinkContainer} from "react-router-bootstrap";


const _ = require('lodash');

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    function handleLogout() {
        userHasAuthenticated(false);
    }

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
                        <Nav.Link onClick={handleLogout}>{isAuthenticated ? '1' : '0'}</Nav.Link>
                        <Nav activeKey={window.location.pathname}>
                            {isAuthenticated ? (
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            ) : (
                                <>
                                    <LinkContainer to="/signup">
                                        <Nav.Link>Signup</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                    <Routes />
                </AppContext.Provider>
            </div>
    );
}

export default App;
