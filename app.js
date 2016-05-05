var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var createEvent = require('./routes/createEvent');
var myEvents = require('./routes/myEvents');
var myProfile = require('./routes/myProfile');
var myFriends = require('./routes/myFriends');
var messages = require('./routes/messages');
var singleEvent = require('./routes/event');
var eventsSearch = require('./routes/eventsSearch');
var eventModel = require('./model/event');
var friendMessageModel = require('./model/friendMessage');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat', resave: true,
    saveUninitialized: true}));

app.use(function(err, req, res, next) {
  console.log('****************');
  console.log(req.body)
  console.log('****************');
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/home', home);
app.use('/createEvent', createEvent);
app.use('/myEvents',myEvents);
app.use('/myProfile', myProfile);
app.use('/myFriends', myFriends);
app.use('/messages', messages);
app.use('/event', singleEvent);
app.use('/eventsSearch',eventsSearch);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

mongoose.connect('mongodb://localhost:27017/bluejuly');
// error handlers
 
mongoose.connection.on('error',function(err){
  console.log(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var eventOptionCalculater = require('./helpers/eventOptionCalculater');
var generateEventMessage = require('./helpers/generateEventMessage');
setInterval(function(){
  console.log("timer")
  eventModel.find({eventStatus:{$in:["Under Discussion","Ongoing"]}},function(err, docs){
    for (var i = 0; i < docs.length; i++) {
      var agreeMent = eventOptionCalculater.optionCalculate(docs[i]);
      if (docs[i].eventDeadline!=null) {
        var currentTime = new Date();
        console.log(currentTime);
        console.log(docs[i].eventDeadline);
        if (currentTime>=docs[i].eventDeadline) {
          console.log("time passed");
          if (agreeMent.uid.length<docs[i].eventRequireNumberMin) {
            console.log("event cancalled");

            eventModel.update({"_id":docs[i]._id},
              {eventStatus:"Event Cancalled",
            eventAddressSearchIndex:docs[i].eventAddressSearchIndexTemp,
            eventTimeSearchIndex:docs[i].eventTimeSearchIndexTemp,},
              {},
              function(){}
              )

           generateEventMessage.eventExpiredMessage(docs[i]);
          }

          else if(docs[i].eventRequireNumberMin==-1||agreeMent.uid.length>=docs[i].eventRequireNumberMin){
            var timeOption=agreeMent.option1;
            var eventId=docs[i]._id;
            var addressOption=agreeMent.option2;
            var eventJoinedFixedTemp=agreeMent.uid;
            var fixedNamesTemp2=[];
            var userModel = require('./model/user');
            userModel.find({_id:{$in:agreeMent.uid}},function(err,users){
                        for (var j = 0; j < users.length; j++) {
                            fixedNamesTemp2.push(users[j].fullname);
                        }
                        eventModel.update({"_id":eventId},
                        {eventStatus:"Event Fixed", 
                        eventTimeFixed:timeOption,
                        eventAddressFixed:addressOption,
                        eventAddressSearchIndex:[addressOption],
                        eventTimeSearchIndex:[timeOption],
                        eventJoinedFixed:eventJoinedFixedTemp,
                        eventJoinedFixedNames:fixedNamesTemp2},
                        {},
                        function(){}
                        );
                      })
            
           generateEventMessage.eventFixedMessage(docs[i]);
          }
        }
        // if (agreeMent.uid.length>=docs[i].eventRequireNumberMin&&docs[i].eventRequireNumberMin!=-1) {
        //   console.log("Event meets requirement");
        //   var timeOption=[{option:agreeMent.option1,userId:agreeMent.uid}];
        //   var addressOption=[{option:agreeMent.option2,userId:agreeMent.uid}];
        //   eventModel.update({"_id":docs[i]._id},
        //       {eventStatus:"Event Ongoing"},
        //       {},
        //       function(){}
        //       )
        // };
      }
      
    };
  })
 }, 60* 1000);

module.exports = app;
