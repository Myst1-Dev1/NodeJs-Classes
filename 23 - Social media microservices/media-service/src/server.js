require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');
const mediaRoutes = require('./routes/media-routes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./utils/logger.js');
const { connectRabbitMq, consumeEvent } = require('./utils/rabbitmq.js');
const { handlerPostDeleted } = require('./eventHandlers/mediaEventHandlers.js');

const app = express();
const PORT = process.env.PORT || 3003;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info('Connected to mongodb'))
    .catch(e => logger.error('Mongo connection error',e));

app.use(cors());
app.use(helmet());
app.use(express.json());


app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);

    next();
});

// Homework - Implement Ip based rate limiting for sensitive endpoints


app.use('/api/media', mediaRoutes);

app.use(errorHandler);

async function startServer() {
    try {
        await connectRabbitMq();

        await consumeEvent('post.deleted', handlerPostDeleted);

        app.listen(PORT, () => {
            logger.info(`Media server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to connect to server', error);
        process.exit(1);
    }
}

startServer();

app.listen(PORT, () => {
    logger.info(`Media server running on port ${PORT}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at', promise, "reason:", reason);
});