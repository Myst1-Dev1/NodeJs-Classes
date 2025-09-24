const db = require('../db/db');

// -> inner join returns only the rows that have matching values in both tables

async function getUsersWithPosts() {
    const getUsersWithPostsQuery = `
        SELECT users.id, users.username, posts.title
        FROM users
        INNER JOIN posts ON users.id = posts.user_id;
    `

    try {
        const res = await db.query(getUsersWithPostsQuery);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error executing query', error);
    }
}

async function getAllUsersAndTheirPosts() {
    const getAllUsersAndTheirPostsQuery = `
        SELECT users.id, users.username, posts.title
        FROM users
        LEFT JOIN posts ON users.id = posts.user_id;
    `

    try {
        const res = await db.query(getAllUsersAndTheirPostsQuery);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error executing query', error);
    }
}

module.exports = {
    getUsersWithPosts,
    getAllUsersAndTheirPosts
};