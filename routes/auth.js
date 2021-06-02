'use strict';

let express = require('express');
let router = express.Router();
let passport = require('passport');

const bcrypt = require("bcrypt")
const saltRounds = 10

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        badRequestMessage: 'Please enter your account credentials to login.'
    }), function (req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect('/');
});

// router.post(
//     '/login',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true,
//         badRequestMessage: 'Please enter your account credentials to login.'
//     }),
//     function(req, res) {
//         console.log(req.body.remember);
//         if(req.isAuthenticated(req, res)) {
//             res.redirect('/');
//         } else {
//             var errors = req.flash('error');
//             if(errors) {
//                 assign['errors'] = errors;
//             }
//             res.render('login.html', {errors: errors});
//         }
//     }
// );


router.get('/',
    async (req, res, next) => {
        let result = {message: 'fsdfdsf'};
        res.send(result);
    });

router.post('/hash',
    async (req, res, next) => {
        let pass_to_hash = req.body.password;
        if (!pass_to_hash)
            pass_to_hash = 'none';

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                throw err
            } else {
                bcrypt.hash(pass_to_hash, salt, function (err, hash) {
                    if (err) {
                        throw err
                    } else {
                        let result = {hash: hash};
                        res.send(result);
                    }
                })
            }
        })
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
