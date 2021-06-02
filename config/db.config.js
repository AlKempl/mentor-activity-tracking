require('dotenv').config()

var pg = require('pg');
pg.defaults.ssl = {
    rejectUnauthorized: false
};

module.exports = {
    connectionString: process.env.DATABASE_URL,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};