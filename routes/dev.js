'use strict';

let express = require('express');
let router = express.Router();


router.get('/mirror',
    async (req, res, next) => {
        let result = req.params;
        res.send(result);
    });

router.post('/mirror',
    async (req, res, next) => {

        let result = req.body;
        res.send(result);

    });
module.exports = router;
