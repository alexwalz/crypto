var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VehiclesSchema = new Schema({
        user: String,
        type: String,
        year: Number,
        make: String,
        model: String,
        license: {
                type: String,
                uppercase: true,
            }
});


module.exports = mongoose.model('Vehicle', VehiclesSchema);