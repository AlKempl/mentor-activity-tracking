'use strict';
require('dotenv').config()

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const API_KEY = process.env.API_KEY;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

db.simpleQuery = async function (query, data=[], defaultValue=null, errorValue='err'){
    try {
        const res = await db.query(query, data);
        if (res.rows.length === 0)
            return defaultValue;
        else
            return res;
    } catch (e) {
        console.log(e.stack);
        return errorValue;
    }
}

module.exports = {db, API_KEY}
