module.exports = {

eventExpiredMessage:function(eventDoc, userId){
	  var friendMessageModel = require('../model/friendMessage');
	  for (var i = 0; i < eventDoc.eventJoined.length; i++) {
	    var friendMessage = new friendMessageModel({
	                    userId:eventDoc.eventJoined[i],
	                    type:"event-cancelled", 
	                    time:new Date(), 
	                    content:"The event "+eventDoc.eventTitle+" has been cancalled!", 
	                    status:"unread", 
	                    eventId: eventDoc._id,
	                    eventTitle: eventDoc.eventTitle
	                });
	    friendMessage.save();

	  };
  
},

eventFixedMessage:function(eventDoc, userId){
  var friendMessageModel = require('../model/friendMessage');
  for (var i = 0; i < eventDoc.eventJoined.length; i++) {
    var friendMessage = new friendMessageModel({
                    userId:eventDoc.eventJoined[i],
                    type:"event-determined", 
                    time:new Date(), 
                    content:"The event "+eventDoc.eventTitle+" has been fixed!", 
                    status:"unread", 
                    eventId: eventDoc._id,
                    eventTitle: eventDoc.eventTitle
                });
    friendMessage.save();

  }
  
},

eventOngoingMessage:function(eventDoc, userId){
  var friendMessageModel = require('../model/friendMessage');
  for (var i = 0; i < eventDoc.eventJoined.length; i++) {
    var friendMessage = new friendMessageModel({
                    userId:eventDoc.eventJoined[i],
                    type:"event-ongoing", 
                    time:new Date(), 
                    content:"The event "+eventDoc.eventTitle+" is ongoing!", 
                    status:"unread", 
                    eventId: eventDoc._id,
                    eventTitle: eventDoc.eventTitle
                });
    friendMessage.save();

  };
  
},
eventUnderDiscussionMessage:function(eventDoc, userId){
  var friendMessageModel = require('../model/friendMessage');
  for (var i = 0; i < eventDoc.eventJoined.length; i++) {
    var friendMessage = new friendMessageModel({
                    userId:eventDoc.eventJoined[i],
                    type:"under-discussion", 
                    time:new Date(), 
                    content:"The event "+eventDoc.eventTitle+" is under Discussion!", 
                    status:"unread", 
                    eventId: eventDoc._id,
                    eventTitle: eventDoc.eventTitle
                });
    friendMessage.save();

  };
  
}
}