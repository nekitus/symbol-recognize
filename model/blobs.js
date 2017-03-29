var mongoose = require('mongoose');
var blobSchema = new mongoose.Schema({
    name: String,
    data: String
});
mongoose.model('Symbol', blobSchema);