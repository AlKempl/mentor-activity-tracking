let express = require('express');
let router = express.Router();

const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");
const {body, validationResult} = require('express-validator')


router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
        body('username').trim().notEmpty().isAlpha('en-US').isLength({min: 3}).escape(),
        body('email').normalizeEmail().isEmail(),
        body('password').trim().notEmpty().escape()
    ],
    controller.signup
);

router.post("/signin", [
            body('username').trim().notEmpty().isAlpha('en-US').isLength({min: 3}).escape(),
            body('password').trim().notEmpty().escape()
    ],
    controller.signin);

module.exports = router;
