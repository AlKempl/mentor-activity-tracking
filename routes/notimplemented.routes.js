let express = require('express');
let router = express.Router();

const {authJwt} = require("../middleware");
const controller = require("../controllers/notimplemented.controller");

router.all(
    "*",
    [authJwt.verifyToken],
    controller.default
)

module.exports = router;
