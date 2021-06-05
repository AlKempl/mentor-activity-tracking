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

exports.getOne = (req, res) => {
    Block.findByPk(req.params.id).then(blocks => {
        res.status(200).send({
            blocks: blocks
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.addNew = (req, res) => {
    Block.create({
        name: req.body.name,
        description: req.body.description,
        active: req.body.active
    })
        .then(block => {
            res.status(200).send({message: "Block added"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


exports.deleteOne = (req, res) => {
    Block.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(blah => {
            res.status(200).send({message: 'Block deleted'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.switchActive = (req, res) => {
    Block.update({active: sequelize.literal('1 - active')}, {
        where: {
            id: req.params.id
        }
    }).then(blah => {
        res.status(200).send({message: 'Block enabled switch'});
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.updateOne = (req, res) => {

    console.log(req.body)
    Block.update({
        name: req.body.name,
        description: req.body.description,
        active: req.body.active
    }, {
        where: {
            id: req.params.id
        }
    }).then(blah => {
        res.status(200).send({message: 'Block updated'});
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}