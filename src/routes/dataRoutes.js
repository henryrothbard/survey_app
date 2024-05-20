const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/errorWrapper');
const redisClient = require('../config/redisConfig');

router.post('/exists', asyncHandler(async (req, res) => {
    const { uid } = req.body;
    if (typeof uid !== 'string') {
        res.status(400).send('Bad Request');
        return;
    }
    const value = await redisClient.get(uid);
    res.send({uid, exists: !!value});
}));

router.post('/change', asyncHandler(async (req, res) => {
    const { uid, value } = req.body;
    if (typeof uid !== 'string' || typeof value !== 'number') {
        res.status(400).send('Bad Request');
        return;
    }
    await redisClient.set(uid, value);
    res.send({uid, value})
}));


module.exports = router;