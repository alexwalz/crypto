var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ServicesSchema = new Schema({
        serviceName: String,
        size: String,
        price: Number,
        discount: Boolean,
        discountPrice: Number,
});


module.exports = mongoose.model('Service', ServicesSchema);