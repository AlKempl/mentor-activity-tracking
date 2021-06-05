
module.exports = (sequelize, Sequelize) => {
    let df = require("sequelize").Deferrable;
    let dt = require("sequelize").DataTypes;
    let User = require("../models/user.model.js")(sequelize, Sequelize);
    let Block = require("../models/block.model.js")(sequelize, Sequelize);

    const Lesson = sequelize.define("lessons", {
        mentorId: {
            type: dt.INTEGER,

            references: {
                // This is a reference to another model
                model: User,

                // This is the column name of the referenced model
                key: 'id',

                // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
                deferrable: df.INITIALLY_IMMEDIATE
                // Options:
                // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
                // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
                // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            }
        },

        blockId: {
            type: dt.INTEGER,

            references: {
                // This is a reference to another model
                model: Block,

                // This is the column name of the referenced model
                key: 'id',

                // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
                deferrable: df.INITIALLY_IMMEDIATE
                // Options:
                // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
                // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
                // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            }
        },

        student_name: {
            type: dt.STRING
        },

        status: {
            type: dt.INTEGER,
            defaultValue: 0
        },

        lesson_date: {
            type: dt.DATE,
            defaultValue: dt.NOW
        }
    });

    return Lesson;
};