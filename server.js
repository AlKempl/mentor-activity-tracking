// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var flash = require('connect-flash');
let passport = require('passport');
let passport_local = require('passport-local');
let expressSession = require("express-session");
let bcrypt = require("bcrypt")

const user_model = require('./models/user');

// Create a new express application called 'app'
const app = express();

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
    extended: false
}));

// Set up the CORs middleware
app.use(cors());

// Passport
let LocalStrategy = passport_local.Strategy;

passport.serializeUser(function(user, done) {
    //In serialize user you decide what to store in the session. Here I'm storing the user id only.
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    //Here you retrieve all the info of the user from the session storage
    // using the user id stored in the session earlier using serialize user.
    user_model.findById(id).then(r => function(err, user)  {
        done(err, user);
    });
});

let loc = new LocalStrategy({passReqToCallback : true},
    function(username, password, done) {
    user_model.findOne( username).then(r => function (err, student) {
        if (err) return done(err, {message: message});//wrong roll_number or password;
        let pass_retrieved = student.password;
        bcrypt.compare(password, pass_retrieved, function (err3, correct) {
            if (err3) {
                message = [{"msg": "Incorrect Password!"}];
                return done(null, false, {message: message});  // wrong password
            }
            if (correct) {
                return done(null, student);
            }
        }) ;
    });
})

passport.use('local', loc);

//to make passport remember the user on other pages too.(Read about session store. I used express-sessions.)
app.use(expressSession({
    secret: "This is one hell of a secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// API
app.use('/api/auth/', require('./routes/auth'));

process.env.PWD = process.cwd()

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(process.env.PWD, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(process.env.PWD, 'client/build', 'index.html'));
    });
}

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Set our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));