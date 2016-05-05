var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var friendMessageSchema = new Schema({

	userId:Schema.Types.ObjectId,
	type:String, 
	time:Date, 
	content:String, 
	status:String, 
	friendId:Schema.Types.ObjectId,
	friendName:String,
	eventId:Schema.Types.ObjectId,
	eventTitle:String
		 
	})

friendMessageSchema.statics.getFriendMessages = function(user_Id, callback){
	this.model('friendmessage').find({userId:user_Id}, callback);
}
// userSchema.statics.getUnreadUserMessages = function(email, callback){
// 	this.model('friendMessage').find({email:email}, callback);
// }
friendMessageSchema.methods.createFriendMessage = function(){
	this.model('friendmessage').save();
}
var friendMessage = mongoose.model('friendmessage',friendMessageSchema);
module.exports = friendMessage;