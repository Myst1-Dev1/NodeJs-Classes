const db = require('../db/db');

async function countPostsByUser() {
    const countPostsByUserQuery = `
        SELECT users.username, COUNT(posts.id) AS post_count
        FROM users
        LEFT JOIN posts ON users.id = posts_user_id
        GROUP BY users.id, users.username
    `;

    try {
        const res = await db.query(countPostsByUserQuery);
        console.log('Post counts by user:', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function averagePostsperUser() {
    const averagePostsperUserQuery = `
            SELECT AVG(post_count) AS average_posts
            FROM(
            SELECT COUNT(posts.id) AS post_count
            FROM users
            LEFT JOIN posts ON users.id = posts.user_id
            GROUP BY users.id
            ) as user_per_counts
        `
    try {
        const res = await db.query(averagePostsperUserQuery);
        console.log('Average posts per user:', res.rows[0].average_posts);
        return res.rows[0].average_posts;

    } catch (error) {
        console.error('Error executing query:', error);
    }
}

module.exports = {
    countPostsByUser,
    averagePostsperUser
};