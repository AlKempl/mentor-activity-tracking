const db = require("../models");
const config = require("../config/auth.config");
const Lesson = db.lesson;

exports.list = (req, res) => {
    Lesson.findAll({}).then(lessons => {
        res.status(200).send({
            lessons: lessons
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getOne = (req, res) => {
    Lesson.findByPk(req.params.id).then(lesson => {
        res.status(200).send({
            lesson: lesson
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.addNew = (req, res) => {
    Lesson.create({
        mentorId: req.body.mentorId,
        blockId: req.body.blockId,
        student_name: req.body.student_name,
        lesson_date: req.body.lesson_date,
        status: req.body.status
    })
        .then(blah => {
            res.status(200).send({message: "Lesson added"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


exports.deleteOne = (req, res) => {
    Lesson.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(blah => {
            res.status(200).send({message: 'Lesson deleted'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.updateOne = (req, res) => {

    //console.log(req.body)
    Lesson.update({
        mentorId: req.body.mentorId,
        blockId: req.body.blockId,
        student_name: req.body.student_name,
        lesson_date: req.body.lesson_date,
        status: req.body.status
    }, {
        where: {
            id: req.params.id
        }
    }).then(blah => {
        res.status(200).send({message: 'Lesson updated'});
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}