const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/errorWrapper');
const redisClient = require('../config/redisConfig');

router.post('/exists', asyncHandler(async (req, res) => {
    const { uid } = req.body;
    const value = await redisClient.get(uid);
    res.send({uid, exists: !!value});
}));

router.post('/change', asyncHandler(async (req, res) => {
    const { uid, value } = req.body;
    await redisClient.set(uid, value);
    res.status(204).end();
}));


module.exports = router;