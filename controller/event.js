exports.createEvent = function() {
    return function(req, res) {
        
        console.log(req.body);
        console.log("get in to createEvent controller");
        var eventModel = require('../model/event');
        var userModel = require('../model/user');
        var eventAddressOptions=[];
        var eventAddressIndex=[];
        var eventAddressIndexTemp=[];
        var eventTimeOptions=[];
        var eventTimeIndex=[];
        var eventTimeIndexTemp=[];
        var eventCostDefalut=0;
        var eventRequireAgeMinDefault=0;
        var eventRequireAgeMaxDefault=200;
        var eventRequireNumberMinDefault=-1;
        var eventRequireNumberMaxDefault=100000000;
        var eventInvitesTemp=[];
        var eventOwnerNameTemp="";
        var eventJoinedNamesTemp=[req.session.userName];
        var eventInvitesNamesTemps=[];


        //console.log(eventInvites[0]);
        if(Array.isArray(req.body.eventAddress)){
            for (var i = 0; i < req.body.eventAddress.length; i++) {
                eventAddressOptions.push({option:req.body.eventAddress[i],userId:[req.session.userId]});
                eventAddressIndex.push(req.body.eventAddress[i]);
                eventAddressIndex.push(req.body.eventAddress[i]);
                eventAddressIndexTemp.push(req.body.eventAddress[i]);
            };
        }
        else{
            eventAddressOptions.push({option:req.body.eventAddress,userId:[req.session.userId]});
            eventAddressIndex.push(req.body.eventAddress);
            eventAddressIndexTemp.push(req.body.eventAddress);
        }

        if(Array.isArray(req.body.eventTime)){
            for (var i = 0; i < req.body.eventTime.length; i++) {
                eventTimeOptions.push({option:req.body.eventTime[i],userId:[req.session.userId]});
                eventTimeIndex.push(req.body.eventTime[i]);
                eventTimeIndexTemp.push(req.body.eventTime[i]);
            };
        }
        else{
            eventTimeOptions.push({option:req.body.eventTime,userId:[req.session.userId]});
            eventTimeIndex.push(req.body.eventTime);
            eventTimeIndexTemp.push(req.body.eventTime);
        }

       if (req.body.eventCost!="") {
            eventCostDefalut=req.body.eventCost;
       }
       if (req.body.eventRequireAgeMin!="") {
            eventRequireAgeMinDefault=req.body.eventRequireAgeMin;
       }
       if (req.body.eventRequireAgeMax!="") {
            eventRequireAgeMaxDefault=req.body.eventRequireAgeMax;
       }
       if (req.body.eventRequireNumberMin!="") {
            eventRequireNumberMinDefault=req.body.eventRequireNumberMin;
       }
       if (req.body.eventRequireNumberMax!="") {
            eventRequireNumberMaxDefault=req.body.eventRequireNumberMax;
       }
      

      var Q = require('q');
       userModel.findOne({ _id: req.session.userId})
            .exec()
            .then(function(owner) {
                eventOwnerNameTemp=owner.fullname;
                console.log(eventOwnerNameTemp)
                if (req.body.testInput!="") {
                    eventInvitesTemp=req.body.testInput.split(',');
                    return eventInvitesTemp.map(function(invite){
                        return userModel.findOne({ 
                            _id: invite
                        }).exec();
                    });
                }
            })
            .then(function(invitePromises){
               return Q.all(invitePromises);
            })
            .then(function(inviteUsers) {
                return inviteUsers.map(function(i){ return i.fullname });
            })
            .then(function(names) {

                eventInvitesNamesTemps=names;
                console.log(names);
                 var newEvent = new eventModel({
                        eventTitle: req.body.eventTitle,
                        eventType: [req.body.eventType1, req.body.eventType2],
                        eventTime: eventTimeOptions,
                        eventTimeSearchIndex: eventTimeIndex,
                        eventTimeSearchIndexTemp:eventTimeIndexTemp,
                        eventAddress:eventAddressOptions,
                        eventAddressSearchIndex:eventAddressIndex,
                        eventAddressSearchIndexTemp:eventAddressIndexTemp,
                        // eventEndTime: req.body.eventEndTime,
                        // eventAddress: req.body.eventAddress,
                        eventCost: eventCostDefalut,
                        eventDescription: req.body.eventDescription,
                        eventOwner:req.session.userId,
                        eventOwnerName:eventOwnerNameTemp,
                        eventInvites:eventInvitesTemp,
                        eventInvitesNames:eventInvitesNamesTemps,
                        eventJoined:[req.session.userId],
                        eventJoinedNames:eventJoinedNamesTemp,
                        eventCreateTime: new Date(),
                        eventStatus:"Under Discussion",
                        eventDeadline:req.body.eventDeadline,
                        eventRequireNumberMin:eventRequireNumberMinDefault,
                        eventRequireNumberMax:eventRequireNumberMaxDefault,
                        ifPublic: req.body.ifPublic,
                        eventRequireGender:req.body.gender,
                        eventRequireAgeMin:eventRequireAgeMinDefault,
                        eventRequireAgeMax:eventRequireAgeMaxDefault,
                    });
                    newEvent.save();
                    return newEvent;
            })
            .then(function(newEvent) {
                userModel.getUserByUserId(req.session.userId,function(err,eventOwner){
                    for (var i = 0; i < eventInvitesTemp.length; i++) {
                var friendMessageModel = require('../model/friendMessage');
                var friendMessage = new friendMessageModel({
                    userId:eventInvitesTemp[i],
                    type:"event-invite", 
                    time:new Date(), 
                    content:"You are invited to a new event!", 
                    status:"unread", 
                    friendId:req.session.userId,
                    friendName: eventOwner.fullname,
                    eventId: newEvent._id,
                    eventTitle: newEvent.eventTitle
                });
                friendMessage.save();
                };

                });
            });
        
        

        //console.log(newEvent._id);
        
        

        res.redirect("myEvents");
    }
}
exports.getAllEventTypes = function() {
    return function(req, res) {
        console.log("get in to getAllEventTypes controller");
        var eventTypeModel = require('../model/eventType');
        console.log("get type model");

        eventTypeModel.find({},function(err,doc){
        if(err){
            console.log("query error");
        }
        else{
        if (doc[0].children[0].children[0]==null) {
        console.log(doc[0].children[0].typeName);
        };
        res.send(doc);
        }
        })
    }
}

exports.myEvents = function() {
    return function(req, res) {
        console.log("get into my events router");
        if (req.session.userId == null) {
            res.render('index');
        } else {
            var eventModel = require('../model/event');
            // var collection = db.get('events');
            // collection.find({
            //     "eventOwner": req.session.userId
            // }, function(err, doc) {
            //     res.render("myEvents", {
            //         myEvents: doc
            //     });
            // });
            var promise = eventModel.find({eventOwner:req.session.userId}).sort({"_id":-1}).exec();
            promise.then(function(docs) {
            console.log(docs);
            var dateFormat = require('dateformat');
            res.render("myEvents", {myEvents: docs,dateFormat: dateFormat });
            });
        }
    }
}
exports.singleEvent = function() {
        return function(req, res) {
                if (req.session.userId == null) {
                    res.render('index');
                }else{
                    console.log("***** get into event controller******");
                    var eventModel = require('../model/event');
                    eventModel.getEventById(req.query.eventId, function(err, eventDoc) {
                        var userModel = require('../model/user');
                        userModel.getUserByUserId(req.session.userId, function(err, userDoc) {
                             var authenticationMessage;
                                    //check if the event is public and if the user is invited
                                    if (eventDoc.ifPublic == "No") {
                                        if (eventDoc.eventOwner == req.session.userId) {
                                            var dateFormat = require('dateformat');
                                            res.render("event", {
                                                singleEvent: eventDoc,
                                                dateFormat: dateFormat,
                                                userId: req.session.userId,
                                                userName: req.session.userName
                                            });
                                        
                                        }else {
                                                var invited = false;
                                                eventDoc.eventInvites.map(function(friend) {
                                                    if (friend == req.session.userId) {
                                                        invited = true;
                                                    }
                                                })
                                                if (!invited) {
                                                    authenticationMessage = "Sorry, this is a private event and you are not invited to join in this event."
                                                    res.render("eventAuthentication", {
                                                        message: authenticationMessage
                                                    })
                                                }
                                            }
                                        }



                                        //check if the user meet the gender requirement
                                        if (eventDoc.eventRequireGender != "General" && (userDoc.gender == null || eventDoc.eventRequireGender != userDoc.gender)) {
                                            authenticationMessage = "Sorry, you do not match the gender requirement of this event."
                                            res.render("eventAuthentication", {
                                                message: authenticationMessage
                                            });
                                        }

                                        if (eventDoc.eventRequireAgeMin != 0 || eventDoc.eventRequireAgeMax != 200) {
                                            var maxAge = parseInt(eventDoc.eventRequireAgeMax);
                                            var minAge = parseInt(eventDoc.eventRequireAgeMin);
                                            if (userDoc.age == null) {
                                                authenticationMessage = "Sorry, you do not match the age requirement of this event."
                                                res.render("eventAuthentication", {
                                                    message: authenticationMessage
                                                });
                                            } else {
                                                var userAge = parseInt(userDoc.age);
                                                if (userAge < minAge || userAge > maxAge) {
                                                    authenticationMessage = "Sorry, you do not match the age requirement of this event."
                                                    res.render("eventAuthentication", {
                                                        message: authenticationMessage
                                                    });
                                                } else {
                                                    var dateFormat = require('dateformat');
                                                    console.log(eventDoc+"********** this is the event");
                                                    res.render("event", {
                                                        singleEvent: eventDoc,
                                                        dateFormat: dateFormat,
                                                        userId: req.session.userId,
                                                        userName: req.session.userName
                                                    });
                                                }
                                            }
                                        } else {
                                            var dateFormat = require('dateformat');
                                            console.log(eventDoc+"********** this is the event");
                                            res.render("event", {
                                                singleEvent: eventDoc,
                                                dateFormat: dateFormat,
                                                userId: req.session.userId,
                                                userName: req.session.userName
                                            });
                             }
                        })
                    })
                }           

    }
}
                    
                


exports.joinEvent = function() {
    return function(req, res) {
           req.body = JSON.parse(req.body.data);
           console.log("***** get into join event controller******");
           console.log(req.body)
           var eventModel = require('../model/event');
           var eventOptionCalculater = require('../helpers/eventOptionCalculater');
           var generateEventMessage = require('../helpers/generateEventMessage');
           for (var i = 0; i < req.body.addressOption.length; i++) {
               eventModel.addAddressOption(req.body.eventId,req.body.addressOption[i],req.session.userId);
           }
           for (var i = 0; i < req.body.timeOption.length; i++) {
               //var timeTemp= new Date(req.body.timeOption[i]);
               eventModel.addTimeOption(req.body.eventId,req.body.timeOption[i],req.session.userId);
           }
           eventModel.update({_id:req.body.eventId},
            {$addToSet:{"eventJoined":req.session.userId,
            "eventJoinedNames":req.session.userName}},
            {},function(){
                eventModel.findOne({_id:req.body.eventId},function(err,doc){
                    console.log(doc);
                    var agreeMent=eventOptionCalculater.optionCalculate(doc);
                    if (agreeMent.uid.length>=doc.eventRequireNumberMin&&doc.eventRequireNumberMin!=-1&&agreeMent.uid.length<doc.eventRequireNumberMax) {
                        var userModel = require('../model/user');
                        var fixedNamesTemp=[];
                        userModel.find({_id:{$in:agreeMent.uid}},function(err,docs){
                                    for (var i = 0; i < docs.length; i++) {
                                        fixedNamesTemp.push(docs[i].fullname);
                                    }

                                    eventModel.update({_id:req.body.eventId},{
                                        eventTimeFixed:agreeMent.option1,
                                        eventTimeSearchIndex:[agreeMent.option1],
                                        eventAddressFixed:agreeMent.option2,
                                        eventAddressSearchIndex:[agreeMent.option2],
                                        eventJoinedFixed:agreeMent.uid,
                                        eventJoinedFixedNames:fixedNamesTemp,
                                        eventStatus:"Ongoing"
                                    },{},function(){})
                                    generateEventMessage.eventOngoingMessage(doc);
                                    })
                            }
                    if (agreeMent.uid.length==doc.eventRequireNumberMax) {
                        var userModel = require('../model/user');
                        var fixedNamesTemp2=[];
                        console.log("initial"+fixedNamesTemp2)
                        userModel.find({_id:{$in:agreeMent.uid}},function(err,docs){
                                    for (var i = 0; i < docs.length; i++) {
                                        fixedNamesTemp2.push(docs[i].fullname);
                                        console.log(i)
                                    }
                                    console.log(fixedNamesTemp2)
                                    eventModel.update({_id:req.body.eventId},{
                                        eventTimeFixed:agreeMent.option1,
                                        eventTimeSearchIndex:[agreeMent.option1],
                                        eventAddressFixed:agreeMent.option2,
                                        eventAddressSearchIndex:[agreeMent.option2],
                                        eventJoinedFixed:agreeMent.uid,
                                        eventJoinedFixedNames:fixedNamesTemp2,
                                        eventStatus:"Event Fixed"
                                    },{},function(){})
                                    generateEventMessage.eventFixedMessage(doc);
                                    })
                            }
                        }
                    )
                res.send("join in successful");
                })

            }
           
        }


exports.quitEvent = function() {
    return function(req, res) {
           req.body = JSON.parse(req.body.data);
           console.log("***** get into quit event controller******");
           console.log(req.body)
           var eventModel = require('../model/event');
           var eventOptionCalculater = require('../helpers/eventOptionCalculater');
           var generateEventMessage = require('../helpers/generateEventMessage');
           eventModel.findOne({_id:req.body.eventId},function(err,doc){
                var timeTemp=doc.eventTime;
                var addressTemp=doc.eventAddress;
                for (var i = 0; i < timeTemp.length; i++) {
                    var index=timeTemp[i].userId.indexOf(req.session.userId);
                    if (index>-1) {
                        timeTemp[i].userId.splice(index,1);
                    }
                }
                for (var i = 0; i < addressTemp.length; i++) {
                    var index=addressTemp[i].userId.indexOf(req.session.userId);
                    if (index>-1) {
                        addressTemp[i].userId.splice(index,1);
                    }
                }
                eventModel.update({_id:req.body.eventId},{
                    eventTime:timeTemp,
                    eventAddress:addressTemp,
                    $pull:{
                        eventJoined:req.session.userId, 
                        eventJoinedNames:req.session.userName,
                        eventJoinedFixed:req.session.userId,
                        eventJoinedFixedNames:req.session.userName
                    }
                },
                {},function(){
                    eventModel.findOne({_id:req.body.eventId},
                        function(err,doc){
                        console.log(doc);
                        var agreeMent=eventOptionCalculater.optionCalculate(doc);
                        if (doc.eventRequireNumberMin!=-1) {
                            if (agreeMent.uid.length<doc.eventRequireNumberMin) {
                                if (doc.eventDeadline!=null) {

                                    var currentTime= new Date();
                                    if (currentTime>doc.eventDeadline) {
                                        eventModel.update({"_id":req.body.eventId},
                                          {eventStatus:"Event Cancalled",
                                           eventAddressFixed:[],
                                           eventAddressSearchIndex:doc.eventAddressSearchIndexTemp,
                                           eventTimeFixed:[],
                                           eventTimeSearchIndex:doc.eventTimeSearchIndexTemp,
                                           eventJoinedFixed:[],
                                           eventJoinedFixedNames:[]},
                                          {},
                                          function(){}
                                          )

                                       generateEventMessage.eventExpiredMessage(doc);
                                       res.send("quit successful");
                                    }
                                    else{
                                        eventModel.update({"_id":req.body.eventId},
                                          {eventStatus:"Under Discussion",
                                           eventAddressFixed:[],
                                           eventAddressSearchIndex:doc.eventAddressSearchIndexTemp,
                                           eventTimeFixed:[],
                                           eventTimeSearchIndex:doc.eventTimeSearchIndexTemp,
                                           eventJoinedFixed:[],
                                           eventJoinedFixedNames:[]},
                                          {},
                                          function(){}
                                          )

                                       generateEventMessage.eventUnderDiscussionMessage(doc);
                                       res.send("quit successful");
                                    }

                                }

                            }
                            if (agreeMent.uid.length>=doc.eventRequireNumberMin) {
                                var userModel = require('../model/user');
                                var fixedNamesTemp=[];
                                userModel.find({_id:{$in:agreeMent.uid}},function(err,docs){
                                            for (var i = 0; i < docs.length; i++) {
                                                fixedNamesTemp.push(docs[i].fullname);
                                            }

                                            eventModel.update({_id:req.body.eventId},{
                                                eventTimeFixed:agreeMent.option1,
                                                eventTimeSearchIndex:[agreeMent.option1],
                                                eventAddressFixed:agreeMent.option2,
                                                eventAddressIndex:[agreeMent.option2],
                                                eventJoinedFixed:agreeMent.uid,
                                                eventJoinedFixedNames:fixedNamesTemp,
                                                eventStatus:"Ongoing"
                                            },{},function(){})
                                            generateEventMessage.eventOngoingMessage(doc);
                                            res.send("quit successful");
                                            })
                            };
                        };
                        })

                });
           })
           // eventModel.update({_id:req.body.eventId},
           //  {$addToSet:{"eventJoined":req.session.userId,
           //  "eventJoinedNames":req.session.userName}},
           //  {},function(){
           //      eventModel.findOne({_id:req.body.eventId},function(err,doc){
           //          console.log(doc);
           //          var agreeMent=eventOptionCalculater.optionCalculate(doc);
           //          if (agreeMent.uid.length>=doc.eventRequireNumberMin) {
           //              var userModel = require('../model/user');
           //              var fixedNamesTemp=[];
           //              userModel.find({_id:{$in:agreeMent.uid}},function(err,docs){
           //                          for (var i = 0; i < docs.length; i++) {
           //                              fixedNamesTemp.push(docs[i].fullname);
           //                          }

           //                          eventModel.update({_id:req.body.eventId},{
           //                              eventTimeFixed:agreeMent.option1,
           //                              eventAddressFixed:agreeMent.option2,
           //                              eventJoinedFixed:agreeMent.uid,
           //                              eventJoinedFixedNames:fixedNamesTemp,
           //                              eventStatus:"Ongoing"
           //                          },{},function(){})


           //                          })
           //                  }
           //              }
           //          )
           //      })

            }
           res.send("quit successful");
        }



exports.eventList = function(db) {
    return function(req, res) {
        var eventModel = require('../model/event');
            // var collection = db.get('events');
            // collection.find({
            //     "eventOwner": req.session.userId
            // }, function(err, doc) {
            //     res.render("myEvents", {
            //         myEvents: doc
            //     });
            // });
            eventModel.getAllMyEvents(req.session.userId,function(err, doc){
            console.log(doc);
            res.send({eventList: doc});
        });
    }
}

exports.eventsSearch = function() {
    return function(req, res) {
        var eventModel = require('../model/event');
        // if (req.query.searchKey=="") {
        //     console.log("empty"); 
        //     eventModel.find({ifPublic:"yes"},function())
        // }
        // else{

            console.log(req.query);
            if (req.query.searchKey=="") {
                var dateFormat = require('dateformat');
                eventModel.find({ifPublic:"Yes"},function(err,docs){
                    res.render("eventsSearch",{searchResults: docs, 
                    dateFormat:dateFormat,
                    searchKey:req.query.searchKey,
                    gender:"General",
                    eventRequireAgeMin:"",
                    eventRequireAgeMax:"",
                    eventRequireNumberMin:"",
                    eventRequireNumberMax:"",
                    eventCostMin:"",
                    eventCostMax:"",
                    eventTimeFrom:"",
                    eventTimeTo:""});
                })
            }
            else{
                var dateFormat = require('dateformat');
                eventModel.find(
                    { $text: { $search: req.query.searchKey },
                     ifPublic:"Yes",
                     },
                       { score: { $meta: "textScore" }
                        }
                    ).sort( { score: { $meta: "textScore" } } ).exec(function(err,docs){
                        res.render("eventsSearch",{searchResults: docs, 
                            dateFormat:dateFormat,
                            searchKey:req.query.searchKey,
                            gender:"General",
                            eventRequireAgeMin:"",
                            eventRequireAgeMax:"",
                            eventRequireNumberMin:"",
                            eventRequireNumberMax:"",
                            eventCostMin:"",
                            eventCostMax:"",
                            eventTimeFrom:"",
                            eventTimeTo:""});
                    })
            }
            
        // }
        
    }
}
exports.advancedSearch = function() {
    return function(req, res) {
        var eventModel = require('../model/event');
        // if (req.query.searchKey=="") {
        //     console.log("empty"); 
        //     eventModel.find({ifPublic:"yes"},function())
        // }
        // else{

            //console.log(req.query);

            var helper = require('../helpers/queryHelper');

            var queryParams = req.query;

            var query = helper.buildQuery(queryParams, eventModel.schema)
  
            if (req.query.searchKey!=null) {
                query[0]['$text'] = { $search: req.query.searchKey };
            };
            query[0]['ifPublic']="Yes";
            //console.log(query[0]);
            eventModel.find(query[0],function(err,docs){

                if (req.query.eventTimeFrom!=null) {
                    var eventTimeFrom=new Date(req.query.eventTimeFrom);
                    docs = docs.filter(function(doc) {
                        if (doc.eventStatus=="Under Discussion"||doc.eventStatus=="Event Cancalled") {
                            console.log('processing...', doc.eventTitle);
                            return doc.eventTime.reduce(function(a, b){
                                console.log('processing...', 'option:', b.option);
                                return a || (b.option >= eventTimeFrom);
                            }, false);
                        }
                        if (doc.eventStatus=="Ongoing"||doc.eventStatus=="Event Fixed") {
                            if (doc.eventTimeFixed>=eventTimeFrom) {
                                return doc;
                            };
                        };
                        
                    });
                };

                if (req.query.eventTimeTo!=null) {
                    var eventTimeTo=new Date(req.query.eventTimeTo);
                    docs = docs.filter(function(doc) {
                        if (doc.eventStatus=="Under Discussion"||doc.eventStatus=="Event Cancalled") {
                            console.log('processing...', doc.eventTitle);
                            return doc.eventTime.reduce(function(finalResult, curentOption){
                                return finalResult || (curentOption.option <= eventTimeTo);
                            }, false);
                        }
                        if (doc.eventStatus=="Ongoing"||doc.eventStatus=="Event Fixed") {
                            if (doc.eventTimeFixed<=eventTimeTo) {
                                return doc;
                            };
                        };
                        
                    });
                };
                var dateFormat = require('dateformat');
            res.render("eventsSearch",{searchResults: docs, 
                    dateFormat:dateFormat,
                    searchKey:req.query.searchKey,
                    gender:req.query.searchGenderTag,
                    eventRequireAgeMin:query[1].eventRequireAgeMin,
                    eventRequireAgeMax:query[1].eventRequireAgeMax,
                    eventRequireNumberMin:query[1].eventRequireNumberMin,
                    eventRequireNumberMax:query[1].eventRequireNumberMax,
                    eventCostMin:query[1].eventCostMin,
                    eventCostMax:query[1].eventCostMax,
                    eventTimeFrom:req.query.eventTimeFrom,
                    eventTimeTo:req.query.eventTimeTo});
            });
           //  eventModel.find(
           //     { $text: { $search: req.query.searchKey },
           //     ifPublic:"Yes",
           // },
           //     { score: { $meta: "textScore" }
           //      }
           //  ).sort( { score: { $meta: "textScore" } } ).exec(function(err,docs){
           //      res.render("eventsSearch",{searchResults: docs, 
           //          searchKey:req.query.searchKey,
           //          gender:"general"});
           //  })
        // }
        
    }
}



exports.friendEvents = function() {
    return function(req, res) {
        if (req.session.userId == null) {
            res.render('index');
        } else {
            var eventModel = require('../model/event');
            var dateFormat = require('dateformat');
            console.log("get into my friends events")
            // var collection = db.get('events');
            // collection.find({
            //     "eventOwner": req.session.userId
            // }, function(err, doc) {
            //     res.render("myEvents", {
            //         myEvents: doc
            //     });
            // });
            eventModel.find({eventOwner:req.query.friendId, ifPublic:"Yes"},function(err, doc){
            console.log(doc);
            res.render("friendEvents", {friendEvents: doc,dateFormat: dateFormat });
        });
        }
    }
}





exports.deleteEvent = function() {
    return function(req, res) {
           req.body = JSON.parse(req.body.data);
           console.log("***** get into delete event controller******");
           console.log(req.body)
           var eventModel = require('../model/event');
            eventModel.remove({_id:req.body.eventId},function(){

            });
           var friendMessageModel = require('../model/friendMessage');
           friendMessageModel.remove({eventId:req.body.eventId},function(){

           });
        }
           res.send("delete successful");
        }


