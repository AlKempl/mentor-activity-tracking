require('dotenv').config()

module.exports = {
    secret: process.env.AUTH_SECRET,
    token_ttl_sec: 14400 // 4 hours
};