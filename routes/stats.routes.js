let express = require('express');
let router = express.Router();

const {authJwt} = require("../middleware");
const controller = require("../controllers/stats.controller");

router.get(
    "/",
    [authJwt.verifyToken],
    controller.getData
);

module.exports = router;
