require('dotenv').config();

const { averagePostsperUser } = require('./concepts/aggregation');
const { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo } = require('./concepts/basic-queries');
const { getUsersWhere } = require('./concepts/filtering-sorting');
const { getUsersWithPosts } = require('./concepts/joins');
const { insertNewPost } = require('./concepts/relationships');

//test basic queries
async function testBasicQueries() {
    try {
        
        //await createUsersTable();

        //insert new users
        // await insertUser('john_doe', 'johndoe@gmail.com');
        // await insertUser('jane_doe', 'janedoe@gmail.com');

        // console.log('All users');
        // const allUsers =  await fetchAllUsers();
        // console.log(allUsers);

        // const updatedUser = await updateUserInfo('john_doe', 'johndoe22gmail.com' );
        // console.log(updatedUser);

        const deletedUser = await deleteInfo('jane_doe');
        console.log(deletedUser);
        
    } catch (error) {
        console.error("Error", error);
    }
}

async function testFilterAndSortQueries() {
    try {
        //get users with a username whose username starting with z
        const zFilteredUsers = await getUsersWhere("username LIKE 'Z%'");

        console.log(zFilteredUsers);

        //get users sorted by created_at in descending order
        const sortedUsers = await getUsersWhere("created_at", "DESC");
        console.log(sortedUsers);

        //get first 2 users (pagination)
        const paginatedUsers = await getUsersWhere(2, 0);
        console.log(paginatedUsers);

    } catch (error) {
        console.error("Error", error);
    }
}

async function testRelationshipsQueries() {
    try {
        
        // await createPostTable();
        await insertNewPost('My First Post', 'This is the content of my first post', 1);

    } catch (error) {
        console.error("Error", error);
    }
}

async function testJoinQueries() {
    try {
        // const usersWithPost =  await getUsersWithPosts();
        // console.log(usersWithPost);

        const allUsersAndAllPosts = await getAllUsersAndTheirPosts();
        console.log(allUsersAndAllPosts);
    } catch (error) {
        console.error("Error", error);
    }
}

async function testAggregateQueries() {
    try {
        // const postCount = await countPostsByUser();
        // console.log(postCount);

        const averagePostsPerUserInfo = await averagePostsperUser();
        console.log(averagePostsPerUserInfo);
    } catch (error) {
        console.error("Error", error);
    }
}

async function testAllQueries() {
    // await testBasicQueries();
    // await testFilterAndSortQueries();
    // await testRelationshipsQueries();
    // await testJoinQueries();
    await testAggregateQueries();
}

testAllQueries();