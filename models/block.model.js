
module.exports = (sequelize, Sequelize) => {
    let dt = require("sequelize").DataTypes;

    const Block = sequelize.define("blocks", {
        name: {
            type: dt.STRING
        },
        description: {
            type: dt.STRING
        },
        active: {
            type: dt.INTEGER,
            defaultValue: 1
        }
    });

    return Block;
};