const Redis = require('ioredis');
//redis client library for node js

const redis = new Redis();

async function ioRedisDemo() {
    try {
        await redis.set('key', 'value');
        const value = await redis.get('key');
        console.log(value);
        
    } catch (error) {
        console.log(error);
    } finally {
        redis.quit();
    }
}

ioRedisDemo();