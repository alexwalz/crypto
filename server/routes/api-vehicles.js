const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const vehiclesController    = require("../controllers/vehiclesController")
var passport                = require('passport');

require('../../config/passport')(passport);

mongoose.connect(db_url);


getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


router.get('/:id', function (req, res) {
    vehiclesController.findAllByCustomer(req, res)
});



router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);

    if (token) {
        if(req.user.role === 'admin'){
            vehiclesController.findAll(req, res)
        }else{
            res.json({success: false, message: "Unauthorized"})
        }
    }
})

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        vehiclesController.create(req, res)
    }else{
        res.json({success: false})
    }
})


router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        vehiclesController.remove(req, res)
    }else{
        res.json({success: false})
    }
})


module.exports = router;