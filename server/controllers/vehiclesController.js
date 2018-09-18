const db        = require('../models/Vehicles')
const usersDb   = require('../models/Users')

module.exports = {
    findAllByCustomer: function (req, res) {
        db
            .find({user: req.params.id})
            .then(function (dbModel) {
                res.json(dbModel);
            })
            .catch(function (err) {
                res.json(err);
            });
    },

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
                res.json(err);
            });
    },
    
    create: function (req, res) {
        db
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel);
                return usersDb.findOneAndUpdate({_id: req.body.user}, { $push: { vehicles: dbModel._id } }, { new: true });
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
    remove: function (req, res) {
        db
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    removeAll: function (req, res) {
        db
            .deleteMany({user: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};