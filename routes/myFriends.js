var express = require('express');
var router = express.Router();
var myFriends = require('../controller/myFriends');
/* GET home page. */
router.get('/', myFriends.getMyFriends());
//router.post('/signup',indexController.signup());
router.post('/searchFriendByEmail',myFriends.searchFriendByEmail());
router.post('/searchFriendsByFullname',myFriends.searchFriendsByFullname());
router.post('/addFriendRequest',myFriends.addFriendRequest());
router.get('/getMyFriendsJson', myFriends.getMyFriendsJson());
module.exports = router;
