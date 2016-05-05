var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var eventSchema = new Schema({

	eventTitle : String,
	eventType : [String],
	eventContry: [{option:String,userId:[Schema.Types.ObjectId]}],
	eventAddress: [{option:String,userId:[Schema.Types.ObjectId]}],
	eventAddressFixed:String,
	eventAddressSearchIndex: [String],
	eventAddressSearchIndexTemp:[String],
	eventTime : [{option:Date, userId:[Schema.Types.ObjectId]}],
	eventTimeFixed:Date,
	eventTimeSearchIndex:[String],
	eventTimeSearchIndexTemp:[String],
	eventStartTime : Date,
	eventEndTime : Date,
	eventDeadline:Date,
	eventInvites : [Schema.Types.ObjectId],
	eventInvitesNames :[String],
	eventJoined : [Schema.Types.ObjectId],
	eventJoinedFixed:[Schema.Types.ObjectId],
	eventJoinedNames:[String],
	eventJoinedFixedNames:[String],
	eventCost : Number,
	eventRequireNumberMin:Number,
	eventRequireNumberMax:Number,
	eventDescription : String,
    eventOwner : Schema.Types.ObjectId,
    eventOwnerName:String,
    eventCreateTime : Date,
    ifPublic: String,
    eventStatus:String,
    eventRequireGender:String,
    eventRequireAgeMin:Number,
    eventRequireAgeMax:Number,
	})

// eventSchema.statics.addNewTimeOption= function(eventId,timeOption, userId){
//     this.model('event').update({
//             _id: eventId
//         }, {
//             $push: {
//                 eventTime: {
//                     option: timeOption,
//                     userId: [userId]
//                 }
//             }
//         }, {},
//         function() {

//         }
//     )
// };

// function addNewAddressOption(eventId, addressOption, userId) {
//     this.model('event').update({
//             _id: eventId
//         }, {
//             $push: {
//                 eventAddress: {
//                     option: addressOption,
//                     userId: [userId]
//                 }
//             }
//         }, {},
//         function() {}
//     )
// };

eventSchema.index({ 
	eventTitle: 'text', 
	eventType:'text', 
	eventAddressSearchIndex: 'text', 
	eventTimeSearchIndex: 'text', 
	eventDescription: 'text'});
eventSchema.statics.getAllMyEvents = function( user_Id, callback){
	this.model('event').find({eventOwner:user_Id}, callback);
}
eventSchema.statics.getEventById = function( eventId, callback){
	this.model('event').findOne({_id:eventId}, callback);
}


eventSchema.statics.addTimeOption= function(eventId,timeOption, userId){
	
			var self=this;
			this.model('event').update({
			    _id: eventId,
			    "eventTime.option": timeOption
			}, {
			    $push: {
			        "eventTime.$.userId": userId
			    }
			}, {}, function(err, num) {
			    if (!num) {
						self.model('event').update({
			            _id: eventId
			        }, {
			            $push: {
			                eventTime: {
			                    option: timeOption,
			                    userId: [userId]
			                }
			            }
			        }, {},
			        function() {

			        }
			    )
			    }
			});

}

eventSchema.statics.addAddressOption= function(eventId,addressOption, userId){

			var self=this;
			this.model('event').update({
			    _id: eventId,
			    "eventAddress.option": addressOption
			}, {
			    $push: {
			        "eventAddress.$.userId": userId
			    }
			}, {}, function(err, num) {
			    if (!num) {
					self.model('event').update({_id: eventId}, 
					{
			            $push: {
			                eventAddress: {
			                    option: addressOption,
			                    userId: [userId]
			                }
			            }
			        }, {},
			        function() {}
			    )
			    }
			});

}
// eventSchema.statics.optionCalculate= function(eventId){

// 			this.model('event').find({_id:eventId}, callback);

// }
eventSchema.methods.createEvent = function(){
	this.model('event').save();
}

var event = mongoose.model('event',eventSchema);
module.exports = event;