var express = require('express');
var router = express.Router();
var messages=require('../controller/messages');

/* GET home page. */
router.get('/', messages.userMessages());
router.get('/getAllMyMessages', messages.getAllMyMessages());
router.get('/getMessageUserInfo', messages.getUserInfo());
router.post('/declineFriendRequest', messages.declineFriendRequest());
router.post('/acceptFriendRequest', messages.acceptFriendRequest());
router.post('/readMessage',messages.readMessage());
router.post('/deleteMessage',messages.deleteMessage());
//router.post('/signup',indexController.signup());

module.exports = router;
