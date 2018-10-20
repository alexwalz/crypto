const db            = require('../models/Users')
var bcrypt          = require('bcrypt-nodejs');
var nodemailer      = require('nodemailer')

module.exports = {
    findAll: function (req, res) {
        db
            .find({})
            .then(function (dbModel) {
                res.json(dbModel);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    findById: function (req, res) {
        db
            .findById(req.params.id)
            .then(function (dbModel) {

                res.json(dbModel)

            })
            .catch(function (err) {
                res.json({success: false, errMessage: "unable to find user"});
            });
    },


    confirm: function (req, res) {
        db
            .findOneAndUpdate({activeHash: req.params.id}, {active: true})
            .then(dbModel => res.json({confirm: true}))
            .catch(err => res.status(422).json({confirm: false}));
    },
    
    create: function (req, res) {
        db
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);

            });
    },
    update: function (req, res) {
        db
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    updatePassword: function (req, res) {
            var userPassword = req.body.password;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(userPassword, salt, null, function (err, hash) {

                    if (err) {
                        return next(err);
                    }

                    db
                    .findOneAndUpdate({_id: req.params.id}, {password: hash})
                    .then(dbModel => res.json({success: true}))
                    .catch(err => res.status(422).json({success: false}));
                });
            });


    },


    unknownUpdatePassword: function (req, res) {
        console.log(req.body)

        let hash = Math.random().toString(36).slice(2)

        db
        .findOneAndUpdate({username: req.body.username}, {resetPasswordHash: hash})

        .then(dbModel => {

            if(dbModel === null){

                res.status(422).json({success: false})

            }else{

                    console.log(dbModel.email)

                    nodemailer.createTestAccount((err, account) => {
                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            auth: {
                                user: process.env.EMAIL_USER || 'marinacovestorageutah@gmail.com',
                                pass: process.env.EMAIL_PASS || 'marinacovepassword123'
                            }
                        });
        
                        let resetLink =`https://marina-cove.herokuapp.com/password-reset/${hash}`
                        let mailOptions = {
                            from: `"Marina Cove Storage" <marinacovestorageutah@gmail.com>`, // sender address
                            to: `${dbModel.email}`, // list of receivers
                            subject: 'Password Reset!', // Subject line
                            html: `<div>
                            <div style="height: 200px; background-color: #ef1b36; position: relative;">
                            <div style="margin: auto; text-align: center;">
                            <h1 style="color: white; font-size: 2.5rem; padding-top: 70px;">Marina Cove Storage</h1>
                            </div>
                            </div>
                            <div style="padding: 20px;">
                            <p>&nbsp;</p>
                            <p>${dbModel.firstName}</p>
                            <p>Sorry to hear that you forgot your password! You can reset your password by clicking on <a href='${resetLink}'>This Link.</a></p>
                            <p>If you did not request this password reset, please contact us immediately</p>
                            <br/>
                            <br/>
                            <p>Sincerely,</p>
                            <p>Marina Cove Storage Team</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </div>
                            <div style="margin-top: 60px;">
                            <div style="height: 100px; background-color: #1e1e1e; color: white; padding: 20px;">
                            <p>Marina Cove Storage</p>
                            <p>22 E 1500 S<br />American Fork, UT 84003<br />(801) 230-7452</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </div>
                            </div>
                            </div>` 
                        };
        
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {console.log(error)}
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            res.json({success: true})
                        });
        
                    });
        

            }
        })
        .catch(err => res.status(422).json({success: false}));

    },  


    updatePasswordHash:function(req,res){

        let passwordHash = req.params.hash
        var userPassword = req.body.password;


        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(userPassword, salt, null, function (err, hash) {

                if (err) {
                    return next(err);
                }

                db
                .findOneAndUpdate({resetPasswordHash: passwordHash}, {password: hash, resetPasswordHash: ''})
                .then(dbModel => res.json({success: true, name: dbModel.firstName}))
                .catch(err => res.status(422).json({success: false}));
            });
        });

    },

    verifyHash: function (req, res) {

        db
            .findOne({resetPasswordHash: req.params.hash})
            .then(function (dbModel) {

                res.json({success: true, name: dbModel.firstName})

            })
            .catch(function (err) {
                res.json({success: false, errMessage: "unable to find user"});
            });
    },

    remove: function (req, res) {
        db
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
