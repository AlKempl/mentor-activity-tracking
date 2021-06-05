require('dotenv').config()

module.exports = {
    secret: process.env.AUTH_SECRET,
    demo_pass: process.env.DEMO_PASS,
    token_ttl_sec: 14400 // 4 hours
};