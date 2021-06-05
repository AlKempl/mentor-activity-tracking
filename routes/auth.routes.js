let express = require('express');
let router = express.Router();

const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");
const {check, validationResult} = require('express-validator')


router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
        check('username').trim().notEmpty().isAlpha('en-US').isLength({min: 3}).escape(),
        check('email').normalizeEmail().isEmail(),
        check('password').trim().notEmpty().escape()
    ],
    controller.signup
);

router.post("/signin", [
        check('username').trim().notEmpty().isAlpha('en-US').isLength({min: 3}).escape(),
        check('password').trim().notEmpty().escape()
    ],
    controller.signin);

router.get("/signup", controller.blockhead);

router.get("/signin", controller.blockhead);

module.exports = router;
