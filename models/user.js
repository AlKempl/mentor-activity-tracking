'use strict';

let {db} = require('../controllers/db');

async function list() {
    let res = await db.query('select * from Grade_get()', []);
    return res.rows;
}

async function add({num, degree}) {
    let res = await db.query('select * from Grade_add($1, $2) as res', [num, degree]);
    return res.rows[0];
}

async function del(id) {
    let res = await db.query('select * from Grade_delete($1)', [id]);
    return res.rows[0];
}

async function upd(id, {num, degree}) {
    let res = await db.query('select * from Grade_update($1, $2, $3)', [id, num, degree]);
    return res.rows[0];
}

async function findById(id) {
    let res = await db.query('select * from users where id = $1 limit 1', [id]);
    return res.rows[0];
}

async function findOne(username) {
    let res = await db.query('select * from users where login = $1 limit 1', [username]);
    return res.rows[0];
}

module.exports = {list, add, del, upd, findById, findOne};
