const redis = require('redis');

const client = redis.createClient({
    host : 'localhost',
    port : 6379
});

//event listener
client.on('error', (error) => {
    console.log('Redis client error', error);
});

async function redisDataStructures() {
    try {
        await client.connect();
        // String -> SET, GET, MSET, MGET

        await client.set('user:name', 'Peter');
        const name = await client.get('user:name');
        // console.log(name);

        await client.mSet(["user:email", "peter@gmail.com", "user:age", "23", "user:country", "Brazil"]);
        const [email, age, country] = await client.mGet(['user:email', 'user:age', 'user:country']);
        // console.log(email, age, country);

        // Lists => LPUSH, RPUSH, LRANGE, LPOP, RPOP

        // await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
        // const extractAllNotes = await client.lRange('notes', 0, -1);
        // console.log(extractAllNotes);
        
        // const firstNotes = await client.lPop('notes');
        // console.log(firstNotes);
        
        // const remainingNotes = await client.lRange('notes', 0, -1);
        // console.log(remainingNotes);

        // sets -> SADD, SMEMBERS, SISMEMBER, SREM

        // await client.sAdd('user:nickname', ['john', 'varun', 'xyz']);
        // const extractUserNickNames = await client.sMembers('user:nickname');
        // console.log(extractUserNickNames);
        
        // const isVarumIsOneOfUserNickName = await client.sIsMember('user:nickname', 'varun');
        // console.log(isVarumIsOneOfUserNickName);
        
        // await client.sRem('user:nickname', 'xyz');
        // const getUpdatedUserNickNames = await client.sMembers('user:nickname');
        // console.log(getUpdatedUserNickNames);
        
        // sorted sets
        //ZADD, ZRANGE, ZRANK, ZREM

        // await client.zAdd('cart', [
        //     {
        //         score: 100, value: 'Cart 1'
        //     },
        //     {
        //         score: 150, value: 'Cart 2'
        //     },
        //     {
        //         score: 10, value: 'Cart 3'
        //     },
        // ]);

        // const getTopCartItems = await client.zRange('cart', 0, -1);
        // console.log(getTopCartItems);

        // const extractAllCartItems = await client.zRangeWithScores('cart', 0, -1);
        // console.log(extractAllCartItems);
        
        // const cartTwoRank = await client.zRank('cart', 'Cart 2');
        // console.log(cartTwoRank);
        
        //hashes -> HSET, HGET, HGETALL, HDEL

        await client.hSet('product:1', {
            name: 'Product 1',
            description: 'product one description',
            rating: '5'
        })

        const getProductRating = await client.hGet('product:1', 'rating');
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll('product:1');
        console.log(getProductDetails);
        
        await client.hDel('product:1', 'rating');
        const updatedProductDetaisl = await client.hGetAll('product:1');
        console.log(updatedProductDetaisl);
        
    } catch (error) {
        console.log(error);
    } finally {
        client.quit();
    }
}

redisDataStructures();