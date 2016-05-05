var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var userSchema = new Schema({

    fullname: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    address: String,
    friends: [{
        userName: String,
        email: String,
        userId: Schema.Types.ObjectId
    }],
    //flag addresses the status of the "friend", 1 is real friend,
    //2 means someone requested to be a "friend", but has not been accepted
    //3 means "friend" still waiting approval
    groups: [Schema.Types.ObjectId],
    eventsOwned: [Schema.Types.ObjectId],
    eventsJoined: [Schema.Types.ObjectId],
    eventsInvited: [Schema.Types.ObjectId],
    likes: [String],
    school: [Schema.Types.ObjectId],
    organization: [Schema.Types.ObjectId],
    friendMessage: [{
        eventType: String,
        time: Date,
        content: String,
        status: String,
        friendId: Schema.Types.ObjectId,
    }],
    eventMessage: [{
        eventType: String,
        time: Date,
        content: String,
        status: String,
        friendId: Schema.Types.ObjectId,
        friendName: String,
        eventId: Schema.Types.ObjectId,
        eventTitle: String

        
    }]
})

userSchema.statics.getUserProfileInfo = function(userId, callback) {
    this.model('user').findOne({
        _id: userId
    }, callback);
}
userSchema.statics.getUserByEmail = function(email, callback) {
    this.model('user').findOne({
        email: email
    }, callback);
}
userSchema.statics.getUserByUserId = function(userId, callback) {
    this.model('user').findOne({
        _id: userId
    }, callback);
}
userSchema.statics.getUserByFullname = function(fullname, callback) {

    this.model('user').find({
        fullname: {
            $regex: new RegExp('^' + fullname, 'i')
        }
    }, callback);
}
var user = mongoose.model('user', userSchema);
module.exports = user;
