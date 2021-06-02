// Import dependencies
const express = require('express');
const session = require("express-session");
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const db = require("./models");

// Create a new express application called 'app'
const app = express();

// Set up the CORs middleware
app.use(cors());

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

app.use(flash());

// This application level middleware prints incoming requests to the servers console
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Set up the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    db.sequelize.sync();
}else if(process.env.RECREATE_DB === '1'){
    let init = require('./config/db.init');
    console.log('Drop and Resync Db');
    db.sequelize.sync({force: true}).then(() => {
        init.init();
    });
}


// API
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/test', require('./routes/user.routes'));

process.env.PWD = process.cwd()

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(process.env.PWD, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(process.env.PWD, 'client/build', 'index.html'));
    });
}else{

// Catch any bad requests
    app.get('*', (req, res) => {
        res.status(200).json({
            msg: 'Catch All'
        });
    });
}


// Set our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));