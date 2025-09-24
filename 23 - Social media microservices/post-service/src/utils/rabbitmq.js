const amqp = require('amqplib');
const logger = require('./logger.js');

let connection = null;
let channel = null;

const EXCHANGE_NAME = 'facebook_events';

async function connectRabbitMq() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'topic', {durable: false});
        logger.info('Connected to rabbit mq');
        return channel;

    } catch (error) {
        logger.error('Error connecting to rabbit mq', error);
    }
}

async function publishEvent(routingKey, message) {
    if(!channel) {
        await connectRabbitMq();
    }

    channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));

    logger.info(`Event published: ${routingKey}`);
}

module.exports = { connectRabbitMq, publishEvent };