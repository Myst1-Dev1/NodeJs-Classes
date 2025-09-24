const db = require('../db/db');

//Where clause

async function getUsersWhere(condition) {
    const getUsersQuery = `
        SELECT * FROM users WHERE ${condition};
    `

    try {
        const res = await db.query(getUsersQuery);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
    }
}

async function getSortedUsers(column, order = 'ASC') {
    const getSortedUsersQuery = `
        SELECT * FROM users ORDER BY ${column} ${order};
    `;

    try {
        const res = await db.query(getSortedUsersQuery);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
    }
}

async function getPaginatedUsers(limit, offset) {
    const getPaginatedQuery = `
        SELECT * FROM users LIMIT $1 OFFSET $2;
    `

    try {
        const res = await db.query(getPaginatedQuery, [limit, offset]);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getUsersWhere,
    getSortedUsers,
    getPaginatedUsers
};