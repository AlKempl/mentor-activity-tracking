import './App.css';
import AppNavbar from './AppNavbar'
import {Container, Row, Col} from 'react-bootstrap';
import React, { useState } from "react";

import Routes from "./Routes";
import { AppContext } from "./Libs/contextLib";


const _ = require('lodash');

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
            <div className="App">
                <AppNavbar/>
                <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                    <Routes />
                </AppContext.Provider>
            </div>
    );
}

export default App;
