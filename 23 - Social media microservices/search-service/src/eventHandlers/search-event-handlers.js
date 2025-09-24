const Search = require("../models/Search");
const logger = require("../utils/logger.js");

async function handlerPostCreated(event) {
    try {
        
        const newSearchPost = new Search({
            postId: event.postId,
            userId: event.userId,
            content: event.content,
            createdAt: event.createdAt
        });

        await newSearchPost.save();
        logger.info(`Search post created: ${event.postId}, ${newSearchPost._id.toString()}`);

    } catch (error) {
        logger.error(error, 'Error handling post creating event')
    }
}

module.exports = { handlerPostCreated };