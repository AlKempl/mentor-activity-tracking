const db = require("../models");
const config = require("../config/auth.config");
const Block = db.block;

exports.list = (req, res) => {
    Block.findAll({}).then(blocks => {
        res.status(200).send({
            blocks: blocks
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};