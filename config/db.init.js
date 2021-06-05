const db = require("../models");
const Role = db.role;
const User = db.user;
const Block = db.block;
const Lesson = db.lesson;
var bcrypt = require("bcrypt");
require('dotenv').config()
const Op = db.Sequelize.Op;

function createUser(username, displayname, email, password = '', role = 'user') {
    User.create({
        username: username,
        displayname: displayname,
        email: email,
        password: bcrypt.hashSync(password, 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.eq]: role
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                console.log('User', user.username, 'created successfully')
            });
        })
    })
        .catch(err => {
            console.log('db.init.js', 'user', 'something went wrong')
        });
}

function createBlock(name, description = '', active = 1) {
    Block.create({
        name: name,
        description: description,
        active: active
    }).then(() => {
        console.log('Block', name, 'created successfully')
    })
        .catch(err => {
            console.log('db.init.js', 'block', 'something went wrong')
        });
}

function createRole(id, name) {
    Role.create({
        id: id,
        name: name,
    }).then(() => {
        console.log('Role', name, 'created successfully')
    })
        .catch(err => {
            console.log('db.init.js', 'role', 'something went wrong')
        });
}

async function createLesson(mentorId, blockId, student_name, lesson_date, status = 1) {
    Lesson.create({
        mentorId: mentorId,
        blockId: blockId,
        student_name: student_name,
        lesson_date: lesson_date,
        status: status
    }).then(blah => {
        console.log('Lesson', mentorId, blockId, lesson_date, 'created successfully')
    })
        .catch(err => {
            console.log('db.init.js', 'lesson', 'something went wrong')
        });
}

function initial() {
    let demo_roles = [
        {id: 1, name: 'user'},
        {id: 2, name: 'mentor'},
        {id: 3, name: 'senior'},
        {id: 4, name: 'admin'},
    ];

    demo_roles.forEach(function (role) {
        createRole(role.id, role.name);
    });

    let demo_users = [
        {
            username: 'alkempl',
            displayname: 'Alexander Kempl',
            email: 'alkempled@gmail.com',
            password: process.env.DEMO_PASS,
            role: 'admin'
        },
        {
            username: 'unlocosenior',
            displayname: 'Mr. Un Loco Senior',
            email: 'unlocosenior@example.com',
            password: process.env.DEMO_PASS,
            role: 'senior'
        },
        {
            username: 'unlocomentor',
            displayname: 'Mr. Un Loco Mentor',
            email: 'unlocomentor@example.com',
            password: process.env.DEMO_PASS,
            role: 'mentor'
        },
        {
            username: 'dr.mysterio',
            displayname: 'Dr. John Mysterio',
            email: 'dr.mysterio@example.com',
            password: process.env.DEMO_PASS,
            role: 'user'
        },
    ];

    demo_users.forEach(function (user) {
        createUser(user.username, user.displayname, user.email, user.password, user.role);
    });

    let demo_blocks = [
        {name: 'DWH'},
        {name: 'GP+NoGP'},
        {name: 'SAP'},
        {name: 'SQL'},
        {name: 'Tableau'},
        {name: 'Zeppelin'},
        {name: 'Business analysis'},
        {name: 'Tool selection & data profiling'},
        {name: 'Report publishing'},
        {name: 'Python'},
    ];

    demo_blocks.forEach(function (block) {
        createBlock(block.name);
    })

    let demo_lessons = [
        {mentorId: 1, blockId: 1, student_name: 'Сергей Тихонов', lesson_date: "2021-06-05"},
        {mentorId: 1, blockId: 2, student_name: 'Игнатий Филиппов', lesson_date: "2021-06-04"},
        {mentorId: 1, blockId: 3, student_name: 'Таисия Степанова', lesson_date: "2021-06-02"},
        {mentorId: 1, blockId: 3, student_name: 'Алла Цветкова', lesson_date: "2021-06-04"},
        {mentorId: 1, blockId: 4, student_name: 'Людмила Воробьева', lesson_date: "2021-06-03"},
        {mentorId: 1, blockId: 6, student_name: 'Николай Сергеев', lesson_date: "2021-06-04"},
        {mentorId: 1, blockId: 8, student_name: 'Зоя Николаева', lesson_date: "2021-06-05"},
        {mentorId: 1, blockId: 8, student_name: 'Анжела Чернова', lesson_date: "2021-06-03"},
        {mentorId: 1, blockId: 9, student_name: 'Татьяна Ермакова', lesson_date: "2021-06-02"},
        {mentorId: 1, blockId: 9, student_name: 'Ольга Савина', lesson_date: "2021-06-04"},
        {mentorId: 1, blockId: 9, student_name: 'Евгения Архипова', lesson_date: "2021-06-03"},

        {mentorId: 2, blockId: 2, student_name: 'Елена Давыдова', lesson_date: "2021-06-03"},
        {mentorId: 2, blockId: 2, student_name: 'Игнатий Тарасов', lesson_date: "2021-06-02"},
        {mentorId: 2, blockId: 3, student_name: 'Анна Белоусова', lesson_date: "2021-06-03"},
        {mentorId: 2, blockId: 4, student_name: 'Анфиса Попова', lesson_date: "2021-06-04"},
        {mentorId: 2, blockId: 5, student_name: 'Римма Уварова', lesson_date: "2021-06-05"},
        {mentorId: 2, blockId: 6, student_name: 'Регина Богданова', lesson_date: "2021-06-04"},

        {mentorId: 3, blockId: 1, student_name: 'Мария Красильникова', lesson_date: "2021-06-05"},
        {mentorId: 3, blockId: 1, student_name: 'Иван Иванов', lesson_date: "2021-06-03"},
        {mentorId: 3, blockId: 2, student_name: 'Регина Шилова', lesson_date: "2021-06-04"},
        {mentorId: 3, blockId: 3, student_name: 'Ксения Шарапова', lesson_date: "2021-06-02"},
        {mentorId: 3, blockId: 4, student_name: 'Лука Анисимов', lesson_date: "2021-06-04"},
        {mentorId: 3, blockId: 4, student_name: 'Борис Дмитриев', lesson_date: "2021-06-03"},
        {mentorId: 3, blockId: 5, student_name: 'Дмитрий Самойлов', lesson_date: "2021-06-05"},
        {mentorId: 3, blockId: 6, student_name: 'Вячеслав Горбунов', lesson_date: "2021-06-03"},
        {mentorId: 3, blockId: 7, student_name: 'Олег Емельянов', lesson_date: "2021-06-04"},

    ]

    demo_lessons.forEach(function (lesson) {
        createLesson(lesson.mentorId, lesson.blockId, lesson.student_name, lesson.lesson_date);
    })
}

const dbInit = {
    init: initial
};
module.exports = dbInit;