'use strict';

let express = require('express');
let router = express.Router();
let passport = require('passport');

router.post('/auth', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect('/');
});


router.get('/auth',
    async (req, res, next) => {
        let result = {message:'fsdfdsf'};
        res.send(result);
    });
//
// router.get('/list',
//     async (req, res, next) => {
//         let result = await grade.list();
//         res.send(result);
//     });
//
// router.put('/',
//     async (req, res, next) => {
//         auth.checkRights(req, res);
//
//         let info = req.body;
//         let result = await grade.add(info);
//         res.send(result);
//     });
//
// router.delete('/:gradeID',
//     async (req, res, next) => {
//         auth.checkRights(req, res);
//
//         let info = req.params.gradeID;
//         let result = await grade.del(info);
//         res.send(result);
//     });
//
// router.post('/:gradeID',
//     async (req, res, next) => {
//         auth.checkRights(req, res);
//
//         let info = [req.params.gradeID, req.body];
//         let result = await grade.upd(info[0], info[1]);
//         res.send(result);
//     });

module.exports = router;
