

exports.getMyFriends = function(){
	return function(req,res){
		if (req.session.userId==null) {
			res.render('index');
		}
		else{
			var userModel = require('../model/user');
			userModel.findOne({_id:req.session.userId},function(err,doc){
				res.render('myFriends',{user:doc});
			})
			
		}
	}
}

exports.searchFriendByEmail = function(){
	return function(req,res){
			var userModel = require('../model/user');
			console.log("searchFriendByEmail controller");
			userModel.getUserByEmail(req.body.userEmail, function(err,doc) {
				console.log(doc);
				res.send(doc);
			})
		}
}

exports.searchFriendsByFullname = function(){
	return function(req,res){
			var userModel = require('../model/user');
			console.log("searchFriendByFullname controller");
			userModel.getUserByFullname(req.body.userFullname, function(err,doc) {
				console.log(doc[0]);
				res.send(doc);
			})
		}
}

exports.addFriendRequest = function(){
	return function(req,res){
		var friendMessageModel = require('../model/friendMessage');
		var friendMessage = new friendMessageModel({
			userId:req.body.requestToUserId,
			type:"friend-request", 
			time:new Date(), 
			content:"new friend request", 
			status:"unread", 
			friendId:req.session.userId,
			friendName:req.session.userName
		});
		friendMessage.save();

		console.log("added new friend message");
		res.send({"message":"added friend message successfully"});
	}
}
exports.getMyFriendsJson = function(){
	return function(req,res){
		var userModel = require('../model/user');
		userModel.getUserByUserId(req.session.userId,function(err,user){
			res.send(user.friends);
		});
	}
}