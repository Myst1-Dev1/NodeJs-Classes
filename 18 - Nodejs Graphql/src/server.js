require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const connectDB = require('./database/db.js');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');

async function startServer() {
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT }
    });

    console.log('Server is now running on', url);
};

startServer();