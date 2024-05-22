const express = require('express');
const router = express.Router();
const redisClient = require('../config/redisConfig');
const asyncHandler = require('../utils/errorWrapper');

router.get('', asyncHandler(async (req, res) => {
    let invalids = 0;
    const set = {};
    const keys = await redisClient.keys();
    for (let key of keys) {
        const value = redisClient.get(key);

        if (!(Number.isInteger(value) && value >= process.env.MIN_OPT && value <= process.env.MAX_OPT)) {
            invalids++; continue;
        }
        
        if (!set[value]) set[value] = 0;
        set[value]++;
    }
    res.send({set, invalids});
}))