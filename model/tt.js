var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ttSchema = new Schema({

	Title : [String],
	Time : Date,
	Content : String,
	})







ttSchema.index({Title:'text',Content: 'text'});

ttSchema.methods.createEvent = function(){
	this.model('tt').save();
}

var tt = mongoose.model('tt',ttSchema);
module.exports = tt;