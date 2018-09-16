const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const vehiclesController    = require("../controllers/vehiclesController")

mongoose.connect(db_url);

router.get('/vehicles', function (req, res) {
    res.json({ message: 'Vehicles API Initialized!' });
});




module.exports = router;