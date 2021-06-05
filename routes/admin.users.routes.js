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

router.get(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOne
);

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addNew
);

router.post(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateOne
);

router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOne
);

router.patch(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.switchEnabled
);

module.exports = router;
