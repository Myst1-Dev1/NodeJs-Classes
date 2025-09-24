const db = require('../db')/

async function createUsersTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username varchar(50) UNIQUE NOT NULL,
            email varchar(255) UNIQUE NOT NULL,
            created_at TIMESTAMP WITH TIMEZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await db.query(createTableQuery)
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
}

async function insertUser(username, email) {
    const insertUserQuery = `
        INSERT INTO users (username, email)
        VALUES ($1, $2)
        RETURNING *
    `;

    try {
        const res = await db.query(insertUserQuery, [username, email]);
        console.log("User inserted successfully", res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error("Error inserting users table:", error);
    }
}

async function fetchAllUsers() {
    const getAllUsersQuery = `
        SELECT * FROM users
    `; 

    try {
        
        const result = await db.query(getAllUsersQuery);
        console.log("All users:", result.rows);
        return result.rows;
    } catch (error) {
        console.error("Error fetching users from users table:", error);
    }
}

//update -> sangam@gmai.com to raj@gmail.com wherre user email is Sangam murkerjhee

async function updateUserInfo(userId, newEmail) {
    const updateUserQuery = `
        UPDATE users
        SET email = $2
        WHERE username = $1
        RETURNING *
    `

    try {
        const res = await db.query(updateUserQuery, [userId, newEmail]);
        
        if(res.rows.length === 0) {
            console.log('User updated successfully', res.rows[0]);
            return res.rows[0];
        } else {
            console.log('No user found with the given username');
            return null;
        }           
    } catch (error) {
        console.error("Error updating user email:", error);
    }
}

async function deleteInfo(username) {
    const deletedQuery = `
        DELETE FROM users
        WHERE username = $1
        RETURNING *
    `

    try {
        const res = await db.query(deletedQuery, [username]);
        
        if(res.rows.length === 0) {
            console.log('User deleted successfully', res.rows[0]);
            return res.rows[0];
        } else {
            console.log('No user found with the given username');
            return null;
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

module.exports = { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo };