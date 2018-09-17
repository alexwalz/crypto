const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const vehiclesController    = require("../controllers/vehiclesController")

mongoose.connect(db_url);

router.get('/:id', function (req, res) {
    vehiclesController.findAll(req, res)
});

router.post('/', function (req, res) {
    vehiclesController.create(req, res)
});




module.exports = router;