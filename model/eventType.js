var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var eventTypeSchema = new Schema({
	typeName : String,
	children : [],	
	})

var eventType = mongoose.model('eventtype',eventTypeSchema);
module.exports = eventType;