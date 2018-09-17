var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PurchasesSchema = new Schema({
        serviceName: String,
        price: Number,
        status: String
});


module.exports = mongoose.model('Purchase', PurchasesSchema);