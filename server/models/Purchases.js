var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PurchasesSchema = new Schema({
        serviceName: String,
        price: Number,
        status: String,
        submitDate: Date,
        dueDate: Date,
});


module.exports = mongoose.model('Purchase', PurchasesSchema);