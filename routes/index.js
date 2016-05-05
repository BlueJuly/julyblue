var express = require('express');
var router = express.Router();
var indexController = require('../controller/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup',indexController.signup());
router.post('/signin',indexController.signin());
module.exports = router;
