require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
const helmet = require('helmet');
const postRoutes = require('./routes/post-routes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./utils/logger.js');
const { connectRabbitMq } = require('./utils/rabbitmq.js');

const app = express();
const PORT = process.env.PORT || 3002;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info('Connected to mongodb'))
    .catch(e => logger.error('Mongo connection error',e));

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);

    next();
});

// Homework - Implement Ip based rate limiting for sensitive endpoints

//routes
app.use('/api/posts', (req, res, next) => {
    req.redisClient = redisClient;
    next();
}, postRoutes);

app.use(errorHandler);

async function startServer() {
    try {
        await connectRabbitMq();
        app.listen(PORT, () => {
            logger.info(`Post server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to connect to server', error);
        process.exit(1);
    }
}

startServer();

//unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at', promise, "reason:", reason);
});