const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

exports.list = (req, res) => {
    User.findAll({attributes: { exclude: ['password'] }, include: [Role]}).then(users => {
        res.status(200).send({
            users: users
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};