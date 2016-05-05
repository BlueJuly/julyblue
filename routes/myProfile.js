var express = require('express');
var router = express.Router();
var myProfile=require('../controller/myProfile');

/* GET home page. */
router.get('/', myProfile.userProfileInfo());
router.get('/getUserProfileInfo',myProfile.getUserProfileInfo())
router.post('/updateUserProfileInfo',myProfile.updateUserProfileInfo());
//router.post('/signup',indexController.signup());

module.exports = router;
