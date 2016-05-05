var express = require('express');
var router = express.Router();
var singleEvent=require('../controller/event');

// var db=require('../DBConnection');
/* GET users listing. */
//router.get('/',singleEvent.singleEvent());
router.get('/',singleEvent.singleEvent());
router.post('/joinEvent', singleEvent.joinEvent());
router.post('/quitEvent', singleEvent.quitEvent());
router.post('/deleteEvent', singleEvent.deleteEvent());

//router.get('/eventAuthentication', singleEvent.eventAuthentication());
module.exports = router;
