var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/bluejuly');
var userModel = require('./model/user');
var messageModel = require('./model/friendMessage');
var eventModel = require('./model/event');
var ttModel = require('./model/tt');
var eventTypeModel= require('./model/eventType');
var userId = "56133b5efc1c4b0f187fa796";
var friendId = "560c1c6633b74fed69f80693";
var friendEmail = "liyoumeng@hotmail.com";
var name = "Youmeng Li";

// var tt = new ttModel({Title:["20","apple","banana"], Time:new Date(), Content:"shop meeting drink"});
// tt.save();
//eventModel.update({"_id":"569542c8b671f5a3ff95bfdb"},{eventStatus:"Event Expired"});
eventModel.update({_id:"569542c8b671f5a3ff95bfdb"},
            {eventStatus:"Under Discussion"},
            {},function(){}
            );
// db.events.update(
//                 {
//                     _id:"5697f3a9107a669e6cb20874"
//                 },
//                 {$pull:{
//                     "eventAddress.$.userId": "562ffae655df73604d05e00e",
//                     "eventTime.$.userId":"562ffae655df73604d05e00e",
//                     eventJoined:"562ffae655df73604d05e00e",
//                     eventJoinedNames:req.session.userName
//                     }},
//                 {},
//                 function(){}
//             )

// var sportsType={typeName:"Sports", children:[
// 	{typeName:"Soccer", children:[]},
// 	{typeName:"Basketball", children:[]},
// 	{typeName:"Baseball", children:[]},
// 	{typeName:"Football", children:[]},
// 	{typeName:"Ice hockey", children:[]},
// 	{typeName:"Tennis", children:[]},
// 	{typeName:"Table Tennis", children:[]},
// 	{typeName:"Lacrosse", children:[]},
// 	{typeName:"Bowling", children:[]},
// 	{typeName:"Golf", children:[]},
// 	{typeName:"Cycling", children:[]},
// 	{typeName:"Running", children:[]},
// 	{typeName:"General Exercise", children:[]},
// 	{typeName:"Others", children:[]}
// ]}
// var eventType= new eventTypeModel(sportsType);
//  eventType.save(sportsType);


// For event search:


// eventModel.schema.eachPath(function(path, i) {
// 	// console.log(i);
// });


// var helper = require('./helpers/queryHelper');

// var queryParams = { searchKey: 'shop',
//   eventRequireGender: [ 'General', 'Male', 'Female' ],
//   eventRequireAgeMin: '>=20',
//   eventRequireAgeMax: '<=45',
//   eventCost: [ '>=20', '<=50' ],
//   eventRequireNumberMin: '>=3',
//   eventRequireNumberMax: '<=6',
//   eventTimeFrom: '>=01/09/2016 10:24 PM',
//   eventTimeTo: '<=01/18/2016 10:24 PM' }
// ;

// var query = helper.buildQuery(queryParams, eventModel.schema)

// console.log(query)
// ttModel.find(
//    { $text: { $search: "shop meeting drink 20 70" } },
//    { score: { $meta: "textScore" } }
// ).sort( { score: { $meta: "textScore" } } ).exec(function(err,docs){
// 	console.log(docs)
// })











// userModel.update({
//     _id: userId
// }, {
//     $push: {
//         eventMessage: newMessage
//     }
// }, {}, function() {});



// userModel.update({_id:userId},{$push:{
// 	friends:
// 	 {userName:name, email:friendEmail, userId:friendId}
//     }
// },{},function(){

// })

// userModel.getUserByUserId(userId,function(err,user){
//             	var index=false;
//             	user.friends.map(function(friend){
//             		if(friend.userId==friendId){
//             			index=true;
//             		}
//             	})


//             	if ( index) {
//             		console.log("already exists friend")
//             	}
//             	else{
//             		console.log("new friend");
//             	}
//     }
//     )





// var eventModel = require('./model/event');

// var eventId = "5606f701c1c781291469d288";
// var userIda = "5604a8b6cd88d1e4222a8333";
// var userIdb = "5604a8b6cd88d1e4222a8444";
// var userIdc = "5604a8b6cd88d1e4222a8555";
// var timeOption = new Date();
// var addressOption = "Walmart";

// eventModel.findOne({_id:eventId},function(err,doc){
// 	var t1= doc.eventTime;
// 	var t2= doc.eventAddress;
// 	var t3 = [];
// for (var i = 0; i < t1.length; i++) {
//     for (var j = 0; j < t2.length; j++) {
//         var tempOption = {
//             option1: t1[i].option,
//             option2: t2[j].option,
//             uid: []
//         }
//         for (var x = 0; x < t1[i].userId.length; x++) {
//             for (var y = 0; y < t2[j].userId.length; y++) {
//             	console.log(t1[i].userId[x]+"******"+t2[j].userId[y]);
//                 if (t1[i].userId[x].equals(t2[j].userId[y]) ){
//                     console.log("same");
//                     tempOption.uid.push(t1[i].userId[x]);
//                 };
//             };
//         };

//         t3.push(tempOption);
//     };
// };

// t3.sort(function(a, b) {
// 	return a.uid.length < b.uid.length
// });

// for (var i = 0; i < t3.length; i++) {
//     console.log(t3[i]);
//     for (var j = 0; j < t3[i].uid.length; j++) {
//         console.log(t3[i].uid[j])
//     };
// };
// })








// eventModel.update({_id:"5604a8b6cd88d1e4222a8289"},{eventTime:newEvent} function(err,doc){
// 	//console.log(doc);
// 	var added = false;
// 	doc.eventTime = doc.eventTime.map(function(time) {
// 		if (timeOption == time.option) {
// 			added = true;
// 			time.userId.push(userId);
// 		}
// 		return time;
// 	});
// 	if(!added){
// 		doc.eventTime=doc.eventTime.push({option:timeOption,userId:[userId]});
// 	}
// 	console.log(doc.eventTime);
// });

// function addTimeOption(timeOption) {
//     eventModel.update({
//             _id: "5604a8b6cd88d1e4222a8289"
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

// eventModel.update({
//     _id: "5604a8b6cd88d1e4222a8289",
//     "eventTime.option": timeOption
// }, {
//     $push: {
//         "eventTime.$.userId": userId
//     }
// }, {}, function(err, num) {
//     if (!num) {
//         addTimeOption(timeOption);
//     }
// });
// var tt = []
// var t1 = [{
//     option: "A",
//     id: [1, 5, 7]
// }, {
//     option: "B",
//     id: [1, 2, 4]
// }, {
//     option: "C",
//     id: [2, 3, 6]
// }];
// var t2 = [{
//     option: "D",
//     id: [1, 3, 6]
// }, {
//     option: "E",
//     id: [2, 4, 7]
// }, {
//     option: "G",
//     id: [1, 4]
// }];




// var t3 = [];
// for (var i = 0; i < t1.length; i++) {
//     console.log(t1[i].option);
//     for (var j = 0; j < t2.length; j++) {
//         var tempOption = {
//             option1: t1[i].option,
//             option2: t2[j].option,
//             uid: []
//         }
//         for (var x = 0; x < t1[i].id.length; x++) {
//             for (var y = 0; y < t2[j].id.length; y++) {
//                 if (t1[i].id[x] == t2[j].id[y]) {
//                     //console.log(t1[i].id[x]);
//                     tempOption.uid.push(t1[i].id[x]);
//                 };
//             };
//         };

//         t3.push(tempOption);
//     };
// };

// t3.sort(function(a, b) {
// 	return a.uid.length < b.uid.length
// });

// for (var i = 0; i < t3.length; i++) {
//     console.log(t3[i]);
//     for (var j = 0; j < t3[i].uid.length; j++) {
//         console.log(t3[i].uid[j])
//     };
// };


   // var test="562ecd778bb2ac60acde04a6,562ffae655df73604d05e00e"
   // var Q = require('q');
   //     userModel.find({ _id: "562ecd668bb2ac60acde04a5"})
   //          .exec()
   //          .then(function(owner) {
   //              eventOwnerNameTemp=owner.fullname;
   //              if (test!="") {
   //                  eventInvitesTemp=req.body.testInput.split(',');
   //                  return eventInvitesTemp.map(function(invite){
   //                      return userModel.find({ 
   //                          _id: invite
   //                      }).exec();
   //                  });
   //              }
   //          })
   //          .then(function(invitePromises){
   //             return Q.all(invitePromises);
   //          })
   //          .then(function(inviteUsers) {
   //              return inviteUsers.map(function(i){ return i.fullname });
   //          })
   //          .then(function(names) {
   //          	console.log(names)

   //          });




            // var newEvent = new eventModel({
            //             eventTitle: req.body.eventTitle,
            //             eventType: [req.body.eventType1, req.body.eventType2],
            //             eventTime: eventTimeOptions,
            //             eventTimeSearchIndex: eventTimeIndex,
            //             eventAddress:eventAddressOptions,
            //             eventAddressSearchIndex:eventAddressIndex,
            //             // eventEndTime: req.body.eventEndTime,
            //             // eventAddress: req.body.eventAddress,
            //             eventCost: eventCostDefalut,
            //             eventDescription: req.body.eventDescription,
            //             eventOwner:req.session.userId,
            //             eventOwnerName:eventOwnerNameTemp,
            //             eventInvites:eventInvitesTemp,
            //             eventInvitesNames:eventInvitesNamesTemps,
            //             eventCreateTime: new Date(),
            //             eventStatus:"ongoing",
            //             eventDeadline:req.body.eventDeadline,
            //             eventRequireNumberMin:eventRequireNumberMinDefault,
            //             eventRequireNumberMax:eventRequireNumberMaxDefault,
            //             ifPublic: req.body.ifPublic,
            //             eventRequireGender:req.body.gender,
            //             eventRequireAgeMin:eventRequireAgeMinDefault,
            //             eventRequireAgeMax:eventRequireAgeMaxDefault,
            //         });
            //         newEvent.save();
