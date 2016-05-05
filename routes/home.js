var express = require('express');
var router = express.Router();
var singleEvent=require('../controller/event');
var indexController = require('../controller/index');
//var indexController = require('../controller/index');
/* GET home page. */
router.get('/', indexController.homePage());
//router.post('/signup',indexController.signup());
router.post('/eventsSearch', singleEvent.eventsSearch());
module.exports = router;
