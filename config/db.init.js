const db = require("../models");
const Role = db.role;
const User = db.user;
var bcrypt = require("bcrypt");
require('dotenv').config()
const Op = db.Sequelize.Op;

function createRoles() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "mentor"
    });

    Role.create({
        id: 3,
        name: "senior"
    });

    Role.create({
        id: 4,
        name: "admin"
    });
}

function createUser(username, email, password = '', role = 'user') {
    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.eq]: role
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                console.log('User', user.username, 'created successfully')
            });
        })
    })
        .catch(err => {
            console.log('db.init.js', 'something went wrong')
        });
}

function initial() {
    createRoles();

    let demo_users = [
        {username: 'alkempl', email: 'alkempled@gmail.com', password: process.env.DEMO_PASS, role: 'admin'},
        {username: 'unlocosenior', email: 'unlocosenior@example.com', password: process.env.DEMO_PASS, role: 'senior'},
        {username: 'unlocomentor', email: 'unlocomentor@example.com', password: process.env.DEMO_PASS, role: 'mentor'},
        {username: 'dr.mysterio', email: 'dr.mysterio@example.com', password: process.env.DEMO_PASS, role: 'user'},
        ];

    demo_users.forEach(function (user) {
        createUser(user.username, user.email, user.password, user.role);
    })
}

const dbInit = {
    init: initial
};
module.exports = dbInit;