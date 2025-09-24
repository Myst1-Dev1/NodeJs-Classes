require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./utils/logger.js');
const { connectRabbitMq, consumeEvent } = require('./utils/rabbitmq.js');
const searchRoutes = require('./routes/search-routes.js');
const { handlerPostCreated } = require('./eventHandlers/search-event-handlers.js');

const app = express();
const PORT = process.env.PORT || 3004;

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

app.use('/api/search', searchRoutes);

app.use(errorHandler);

async function startServer() {
    try {
        await connectRabbitMq();

        //consume the events / subscribe to the events
        await consumeEvent('post.created', handlerPostCreated);

    } catch (error) {
        logger.error(error, 'Failed to start search service');
        process.exit(1);
    }
}

startServer();