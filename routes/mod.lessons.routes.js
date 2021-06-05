let express = require('express');
let router = express.Router();

const controller = require("../controllers/mod.lessons.controller");
const {body, validationResult} = require('express-validator')
const {authJwt} = require("../middleware");

router.get(
    "/",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.list
);

router.get(
    "/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getOne
);

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.addNew
);

router.post(
    "/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateOne
);

router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOne
);


module.exports = router;
