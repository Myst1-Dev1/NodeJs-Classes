const db = require('../db/db');

async function createPostTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            content TEXT,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `

    //ON DELETE CASCADE will delete all posts related to a user if that user is deleted

    try {
        await db.query(createTableQuery);
        console.log('Posts table created successfully or already exists.');
    } catch (error) {
        console.error('Error creating posts table:', error);
    }
}

async function insertNewPost(title, content, userId) {
    const insertPostQuery = `
        INSERT INTO posts (title, content, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    try {
        const res = await db.query(insertPostQuery, [title, content, userId]);
        return res.rows[0];
    } catch (error) {
        console.error('Error inserting new post:', error);
    }
}

module.exports = {
    createPostTable,
    insertNewPost
}