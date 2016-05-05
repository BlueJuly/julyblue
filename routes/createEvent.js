var express = require('express');
var router = express.Router();
var myEvent = require('../controller/event');
//var indexController = require('../controller/index');
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userId!=null) {
		res.render('createEvent');
	}
	else{
	    res.render('createEvent', { title: 'Home' });	
	    console.log("render createEvent");
	}
});
router.post('/',myEvent.createEvent());
//router.post('/signup',indexController.signup());
router.get('/getAllEventTypes',myEvent.getAllEventTypes());
module.exports = router;
