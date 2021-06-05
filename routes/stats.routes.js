let express = require('express');
let router = express.Router();

const {authJwt} = require("../middleware");
const controller = require("../controllers/stats.controller");

router.get(
    "/real",
    [authJwt.verifyToken],
    controller.getData
);

router.get(
    "/",
    [authJwt.verifyToken],
    controller.getFakeData
);

module.exports = router;
