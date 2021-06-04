
module.exports = (sequelize, Sequelize) => {
    let dt = require("sequelize").DataTypes;

    const User = sequelize.define("users", {
        username: {
            type: dt.STRING
        },
        email: {
            type: dt.STRING
        },
        password: {
            type: dt.STRING
        },
        enabled: {
            type: dt.INTEGER,
            defaultValue: 1
        }
    });

    return User;
};