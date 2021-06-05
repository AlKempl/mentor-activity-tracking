const db = require("../models");
const Role = db.role;
const User = db.user;
const Block = db.block;
var bcrypt = require("bcrypt");
require('dotenv').config()
const Op = db.Sequelize.Op;

function createUser(username, displayname, email, password = '', role = 'user') {
    User.create({
        username: username,
        displayname: displayname,
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
            console.log('db.init.js', 'user', 'something went wrong')
        });
}

function createBlock(name, description='', active=1) {
    Block.create({
        name: name,
        description: description,
        active: active
    }).then(() => {
        console.log('Block', name, 'created successfully')
    })
        .catch(err => {
            console.log('db.init.js', 'block', 'something went wrong')
        });
}

function createRole(id, name) {
    Role.create({
        id: id,
        name: name,
    }).then(() => {
        console.log('Role', name, 'created successfully')
    })
        .catch(err => {
            console.log('db.init.js', 'role', 'something went wrong')
        });
}

function initial() {
    let demo_roles = [
        {id: 1, name: 'user'},
        {id: 2, name: 'mentor'},
        {id: 3, name: 'senior'},
        {id: 4, name: 'admin'},
    ];

    demo_roles.forEach(function (role) {
        createRole(role.id, role.name);
    });

    let demo_users = [
        {username: 'alkempl', displayname: 'Alexander Kempl', email: 'alkempled@gmail.com', password: process.env.DEMO_PASS, role: 'admin'},
        {username: 'unlocosenior', displayname: 'Mr. Un Loco Senior', email: 'unlocosenior@example.com', password: process.env.DEMO_PASS, role: 'senior'},
        {username: 'unlocomentor', displayname:'Mr. Un Loco Mentor', email: 'unlocomentor@example.com', password: process.env.DEMO_PASS, role: 'mentor'},
        {username: 'dr.mysterio', displayname:'Dr. John Mysterio', email: 'dr.mysterio@example.com', password: process.env.DEMO_PASS, role: 'user'},
    ];

    demo_users.forEach(function (user) {
        createUser(user.username, user.displayname, user.email, user.password, user.role);
    });

    let demo_blocks = [
        {name: 'DWH'},
        {name: 'GP+NoGP'},
        {name: 'SAP'},
        {name: 'SQL'},
        {name: 'Tableau'},
        {name: 'Zeppelin'},
        {name: 'Business analysis'},
        {name: 'Tool selection & data profiling'},
        {name: 'Report publishing'},
        {name: 'Python'},
    ];

    demo_blocks.forEach(function (block) {
        createBlock(block.name);
    })
}

const dbInit = {
    init: initial
};
module.exports = dbInit;