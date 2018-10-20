const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const config = require('../../config');
const usersController = require('../controllers/usersController')
const db_url = process.env.MONGODB_URI || config.dbUri
mongoose.connect(db_url);



router.get('/confirm/:id', function (req, res) {
    usersController.confirm(req, res)
});

module.exports = router;





