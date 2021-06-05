const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcrypt");
const sequelize = require("sequelize");

exports.list = async (req, res) => {
    let users = await User.findAll({attributes: {exclude: ['password']}, include: [Role]});
    let result = [];

    console.log(users)
    for (let i = 0; i < users.length - 1; i++) {
        const user = users[i];
        const roles = await user.getRoles();

        const new_user = {
            id: user.id,
            username: user.username,
            email: user.email,
            enabled: user.enabled,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            roles: []
        };

        const authorities = [];
        roles.forEach(role => authorities.push(role.id));
        new_user.roles = authorities;
        result.push(new_user);
    }

    res.status(200).send({
        users: result
    });
}

exports.getOne = (req, res) => {
    User.findByPk(req.params.id, {attributes: {exclude: ['password']}, include: [Role]}).then(users => {
        res.status(200).send({
            users: users
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.addNew = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password ?? process.env.DEMO_PASS, 8),
        enabled: req.body.enabled
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        id: {
                            [sequelize.Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.status(200).send({message: "User was registered successfully!"});
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.status(200).send({message: "User was registered successfully!"});
                });
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


exports.deleteOne = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(blah => {
            res.status(200).send({message: 'User deleted'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.switchEnabled = (req, res) => {
    User.update({enabled: sequelize.literal('1 - enabled')}, {
        where: {
            id: req.params.id
        }
    }).then(res => {
        res.status(200).send({message: 'User enabled switch'});
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.updateOne = (req, res) => {

    User.update({email: req.body.email, enabled: req.body.enabled}, {
        where: {
            id: req.params.id
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });

    User.findByPk(req.params.id)
        .then(user => {
                user.setRoles(req.body.roles)
                res.status(200).send({message: "User updated"});
            }
        )
        .catch(err => {
            res.status(500).send({message: err.message});
        })
}

// User.update({email: req.body.email, enabled: req.body.enabled}, {
//     where: {
//         id: req.params.id
//     }
// }).then(user => {
//     if (req.body.roles) {
//         Role.findAll({
//             where: {
//                 id: {
//                     [sequelize.Op.or]: req.body.roles
//                 }
//             }
//         }).then(roles => {
//             user.setRoles(roles).then(() => {
//                 res.send({message: "User updated"});
//             });
//         });
//     } else {
//         user.setRoles(roles).then(() => {
//             res.send({message: "User updated"});
//         });
//     }
// }).catch(err => {
//     res.status(500).send({message: err.message});
// });


