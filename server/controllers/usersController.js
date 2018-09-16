const db = require('../models/Users')

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
        console.log(req.params)
        db
            .findById({username: req.params.username})
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
    }
};