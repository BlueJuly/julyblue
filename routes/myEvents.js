var express = require('express');
var router = express.Router();
var allMyEvent=require('../controller/event');

// var db=require('../DBConnection');
/* GET users listing. */
router.get('/',allMyEvent.myEvents());
router.get('/eventList',allMyEvent.eventList());
router.get('/friendEvents',allMyEvent.friendEvents());
module.exports = router;
