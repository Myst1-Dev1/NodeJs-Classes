const Search = require("../models/Search.js");
const logger = require("../utils/logger.js");

const searchPostController = async(req, res) => {
    logger.info('searchPostController endpoint hit...')
    
    try {
        const { query } = req.query;

        const results = await Search.find(
            {
            $text: {$search: query}
        },
        {
            score: {$meta: 'textScore'}
        }
    )
        .sort({score: {$meta: 'textScore'}})
        .limit(10);
    
        res.json(results);
    
    } catch (error) {
        logger.error('Error while searching post', error);
        res.status(500).json({
            success: false,
            message: "Error while searching post"
        });
    }
}


module.exports = { searchPostController };