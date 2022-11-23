const express = require('express');
const letterRouter = express.Router();

letterRouter.get('/', (req, res) => {
    res.status(200).json({ msg : 'path test'});
});

module.exports = letterRouter;