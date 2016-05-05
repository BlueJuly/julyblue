

exports.userMessages = function(){
	return function(req,res){
		if (req.session.userId==null) {
			res.render('index');
		}
		else{
			var messageModel = require('../model/friendMessage');
			console.log("get friend message model");

			var promise = messageModel.find({userId:req.session.userId}).sort({"_id":-1}).exec();
            promise.then(function(docs) {
            res.render("messages", {friendMessages: docs });
			})
	}
}
}
exports.readMessage = function(){
	return function(req,res){
		if (req.session.userId==null) {
			res.render('index');
		}
		else{
			var messageModel = require('../model/friendMessage');
			console.log("get read message controller");

			messageModel.update({_id:req.body.messageId},{status:"read"},
				{},function(){
					res.send("read messages");
				})
			}
	}
}
exports.deleteMessage = function(){
	return function(req,res){
		if (req.session.userId==null) {
			res.render('index');
		}
		else{
			var messageModel = require('../model/friendMessage');
			console.log("get delete message controller");

			messageModel.remove({_id:req.body.messageId},
				function(){
					res.send("read messages");
				})
			}
	}
}
exports.getAllMyMessages = function(){
	return function(req,res){
			var messageModel = require('../model/friendMessage');
			console.log("get all my messages");
			// userModel.findOne({_id:req.session.userId},function(err,doc){
			// 	console.log(doc);
			// });
			// userModel.getUserProfileInfo(req.session.userId).then(function(data){
			// 	console.log(data);
			
			messageModel.getFriendMessages(req.session.userId, function(err,doc) {
				console.log(doc);
				res.send(doc);
			})
		}
	}
exports.getUserInfo = function(){
	return function(req,res){
		    console.log("Get Message User Info");
			var userModel = require('../model/user');
			console.log(req.query.messageUserId);
			userModel.getUserProfileInfo(req.query.messageUserId, function(err,doc) {
				res.send(doc);
			})
		}
	}
exports.declineFriendRequest = function(){
	return function(req,res){
			var messageModel = require('../model/friendMessage');
			messageModel.update({_id:req.body.messageId},{status:"declined"},{}, function(err,doc) {
			});
			res.send("update decline info success");
		}
		
	}

exports.acceptFriendRequest = function(){
	return function(req,res){
			var messageModel = require('../model/friendMessage');
			var userModel = require('../model/user');
			// messageModel.update({_id:req.body.messageId},{status:"accepted"},{}, function(err,doc) {
			// });
			//console.log(req.body.requestUserId);
			messageModel.update({_id:req.body.messageId},{status:"accepted"},{}, function(err,doc) {
			});
            //userModel.getUserByUserId(req.session.userId,function(err,user){
            	
     //        	if (user.friends.indexOf(req.body.requestUserId) === -1) {
     //        		//console.log("New friend");
	    //         	userModel.update({_id:req.session.userId},{$push:{friends:req.body.requestUserId}},{},
					//     function(){
					// userModel.update({_id:req.body.requestUserId},{$push:{friends:req.session.userId}},{},
					// 	function(){
					// res.send("Added new Friend");
					// });
					// });
     //        	} else {
     //        		//console.log("Added friend");
     //        		res.send("You have this friend");
     //        	}
     		userModel.getUserByUserId(req.session.userId,function(err,user){
            	var index=false;
            	user.friends.map(function(friend){
            		if(friend.userId==req.body.requestUserId){
            			index=true;
            		}
            	})
            	console.log("session id"+req.session.userId);
            	console.log("request id"+req.body.requestUserId);
            	if ( index) {
            		console.log("already exists friend");
            		res.send("You already have this friend");
            	}
            	else{
            		console.log("new friend");
            		userModel.update({_id:req.body.requestUserId},{$push:{
							friends:
							 {userName:req.session.userName, email:req.session.email, userId:req.session.userId}
						    }
						},{},function(){
						}
					)

					userModel.getUserByUserId(req.body.requestUserId,function(err,friendUser){
						userModel.update({_id:req.session.userId},{$push:{
							friends:
							 {userName:friendUser.fullname, email:friendUser.email, userId:req.body.requestUserId}
						    }
						},{},function(){
						}
					)
					})
					var friendMessageModel = require('../model/friendMessage');
					var friendMessage = new friendMessageModel({
						userId:req.body.requestUserId,
						type:"friend-added", 
						time:new Date(), 
						content:req.session.userName+" has added you as a friend!", 
						status:"unread", 
						friendId:req.session.userId,
						friendName:req.session.userName
					});
					friendMessage.save();

					res.send("aded new friend");
            	}
		    }
		    )
            
            //});
			
		}
		
	}