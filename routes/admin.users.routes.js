let express = require('express');
let router = express.Router();

const controller = require("../controllers/admin.users.controller");
const {body, validationResult} = require('express-validator')
const {authJwt} = require("../middleware");

router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.list
);

module.exports = router;
