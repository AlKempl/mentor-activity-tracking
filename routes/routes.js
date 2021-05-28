const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

const auth = require('./auth');
express.use('/auth', auth);

router.get('/say-something', controllers.saySomething);

module.exports = router;