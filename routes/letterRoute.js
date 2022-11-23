const express = require('express');
const letterRouter = express.Router();

letterRouter.post('/', (req, res) => {
    res.status(200).json({ msg : 'path test'});
});

module.exports = letterRouter;