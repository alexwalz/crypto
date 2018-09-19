var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PurchasesSchema = new Schema({
        user: String,
        vehicle: String,
        serviceName: String,
        paid: Boolean,
        price: Number,
        status: String,
        submitDate: Date,
        dueDate: Date,
});


module.exports = mongoose.model('Purchase', PurchasesSchema);