var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VehiclesSchema = new Schema({
        user: String,
        type: String,
        year: Number,
        make: String,
        model: String,
        license: String
});


module.exports = mongoose.model('Vehicle', VehiclesSchema);