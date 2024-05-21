const redisClient = require('../config/redisConfig');
const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/errorWrapper');

router.post('/exists', asyncHandler(async (req, res) => {
    const uid = String(req.body.uid);

    const value = await redisClient.get(uid);

    res.send({uid, exists: !!value});
}));

router.post('/change', asyncHandler(async (req, res) => {
    const uid = String(req.body.uid);
    const value = Number(req.body.value);

    if (!(Number.isInteger(value) && value >= process.env.MIN_OPT && value <= process.env.MAX_OPT)) {
        res.status(400).send("Invalid Data."); 
        return;
    }

    await redisClient.set(uid, value);

    res.send({uid, value})
}));

module.exports = router;

crypto.ra