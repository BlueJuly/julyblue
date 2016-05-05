var express = require('express');
var router = express.Router();
var singleEvent=require('../controller/event');

// var db=require('../DBConnection');
/* GET users listing. */
//router.get('/',singleEvent.singleEvent());
router.get('/',singleEvent.eventsSearch());
router.get('/advancedSearch', singleEvent.advancedSearch());
// router.post('/joinEvent', singleEvent.joinEvent());
//router.get('/eventAuthentication', singleEvent.eventAuthentication());
module.exports = router;
