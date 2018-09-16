const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const servicesController    = require('../controllers/servicesController')

mongoose.connect(db_url);

router.get('/services', function (req, res) {
    res.json({ message: 'Services API Initialized!' });
});

router.get('/test-services', function (req, res) {
    res.json({ message: 'It works!' });
});


module.exports = router;