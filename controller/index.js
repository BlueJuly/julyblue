exports.signup = function() {
    return function(req, res) {
        console.log("signup");
        var fullnameTemp = req.body.fullname;
        var emailTemp = req.body.email;
        var passwordTemp = req.body.password;

        console.log("db is up");
        var userModel = require('../model/user');
        var user = new userModel({
            fullname: fullnameTemp,
            email: emailTemp,
            password: passwordTemp
        });

        userModel.find({
            email: emailTemp
        }, function(err, doc) {
            console.log(doc.length);
            if (doc.length == 0) {
                var session=req.session;
                user.save(function(err, user) {
                    session.userId=user._id;
                    session.email=user.email;
                    session.userName=user.fullname;
                    console.log(req.session)
                    //Register Info 1 means the info is valid (email has not been registered yet)
                    res.send({
                        registerInfo: 1
                    });
                });
                
            } else {
                //Register Info 2 means the info is not valid(email has been registered)
                res.send({
                    registerInfo: 2
                });
            }
        });
        // collection.insert(
        // {
        // 	"fullname":fullname,
        // 	"email":email, 
        // 	"password":password
        // }, function(err,doc)
        // {
        // 	if (err) {
        // 		res.send("Problem with the connection of DB");
        // 	}
        // 	else
        // 	{
        // 		res.location("user");
        // 		res.redirect("user");
        // 	}
        // });
    }
}


exports.signin = function() {
    return function(req, res) {
        console.log("sign in");
        var emailTemp = req.body.email;
        var passwordTemp = req.body.password;

        console.log("db is up");
        var userModel = require('../model/user');
        userModel.find({
            email: emailTemp
        }, function(err, doc) {
            console.log("find " + doc.length + "user");
            if (doc.length == 0) {
                //Register Info 1 means the info is invalid (email has not been registered yet)
                res.send({
                    signinInfo: 1
                });

                console.log("user does not exist");
            } else if (doc[0].password != passwordTemp) {
                //Register Info 2 means password is not correct
                res.send({
                    signinInfo: 2
                });

                console.log("password is not correct");
                console.log(doc);
                console.log(doc[0].email);
            } else {
            	var session=req.session;
			    session.userId=doc[0]._id;
			    session.email=doc[0].email;
                session.userName=doc[0].fullname;
                res.send({
                    signinInfo: 3
                });
                console.log("log in successful");
            };
        });

    }
}

exports.homePage = function() {
    return function(req, res) {
        if (req.session.userId == null) {
            res.render('index');
        } else {
            var eventModel = require('../model/event');
            var dateFormat = require('dateformat');
            console.log("get into public events")
            // var collection = db.get('events');
            // collection.find({
            //     "eventOwner": req.session.userId
            // }, function(err, doc) {
            //     res.render("myEvents", {
            //         myEvents: doc
            //     });
            // });
            var promise = eventModel.find({ifPublic:"Yes"}).sort({"_id":-1}).exec();
            promise.then(function(docs) {
            console.log(docs);
            res.render("home", {publicEvents: docs,dateFormat: dateFormat, });
            });
        }

    }
}