

exports.userProfileInfo = function(){
	return function(req,res){
		if (req.session.userId==null) {
			res.render('index');
		}
		else{
			res.render('myProfile');
		}
	}
}

exports.getUserProfileInfo = function(){
	return function(req,res){
			var userModel = require('../model/user');
			console.log("user profile controller");
			// userModel.findOne({_id:req.session.userId},function(err,doc){
			// 	console.log(doc);
			// });
			// userModel.getUserProfileInfo(req.session.userId).then(function(data){
			// 	console.log(data);
			
			userModel.getUserProfileInfo(req.session.userId, function(err,doc) {
				console.log(doc);
				res.send(doc);
			})
		}
	}

exports.updateUserProfileInfo = function(){
	return function(req,res){
	console.log(req.body);
	var userModel = require('../model/user');
	var condition = {};
	condition[req.body.field] = req.body.value;
 
	console.log(condition, req.session.userId);

	userModel.update({_id:req.session.userId}, condition, {} ,function(err, raw){
		console.log("update message"+err+raw);
	});
	}
}