// const Person = require("../helpers/person.helper");

const db = require("../models");
const config = require("../config/auth.config");
const Block = db.block;
const Users = db.user;
const Lessons = db.lesson;
const faker = require('faker');
const _ = require('lodash');

faker.locale = "ru";

function generateFakeUserData(columns, users) {
    let persons = []
    for (let i = 0; i < users.length - 1; i++) {
        let temp_data = []
        for (let j = 0; j < columns.length; j++) {
            let lessons = [];
            for(let l = 0; l < Math.floor(Math.random() * 4); l++){
                lessons.push({
                    id:i+j+l,
                    student_name: faker.name.findName(),
                    senior_mentor: faker.name.findName(),
                    date: faker.date.recent(),
                    status: 1,
                })
            }

            temp_data[j] = {key: j,
                id:columns[j].id,
                label: columns[j].name,
                lessons: lessons
            }
        }
        persons.push({
            user: {id:users[i].id, username:users[i].username, displayname:users[i].displayname},
            data: temp_data
        });
    }
    return persons;
}

exports.getData = async (req, res) => {

    let columns = await Block.findAll();

    let users = await Users.findAll();

    let data = await Lessons.findAll({attributes: {exclude: ['password']}})
    let grouped = _.groupBy(data, 'mentorId');
    // data = data.map();

    //console.log(users)

    let persons = generateFakeUserData(columns, users);

    res.status(200).send({stats: grouped});
};

exports.getFakeData = async (req, res) => {

    let columns = await Block.findAll();

    let users = await Users.findAll();

    let persons = generateFakeUserData(columns, users);

    res.status(200).send({stats: persons});
};
