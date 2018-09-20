const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const usersController       = require("../controllers/usersController")
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




router.get('/authenticate', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);

    if (token) {

        var authenticatedUser={
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            phoneNumber: req.user.phoneNumber,
            email: req.user.email,
            address: req.user.address,
            city: req.user.city,
            state: req.user.state,
            zip: req.user.zip,
            role: req.user.role,
            captainsClub: req.user.captainsClub,
            active: req.user.active
        }

        res.send({authenticatedUser: authenticatedUser })

    } else {

        return res.status(403).send({success: false, msg: 'Unauthorized.'});

    }

  });


  router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);

    if (token) {
        if(req.user.role === 'admin'){
          usersController.findAll(req, res);
        }else{
            res.json({success: false, message: "Unauthorized"})
        }
    }
})


router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
      usersController.remove(req, res)
  }else{
      res.json({success: false})
  }
})


router.get('/profile/:id', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);

    if(req.user.role !=='customer'){
        if (token) {
            usersController.findById(req, res)
        }else{
            res.json({success: false})
        }
    }else{
        res.json({success: false, errMessage: "You must be an Admin or Employee to view this information"})
    }

  })


router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        usersController.update(req, res)
    }else{
        res.json({success: false})
    }
  })



module.exports = router;