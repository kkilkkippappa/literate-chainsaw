var express = require('express');
var model = require('../models/signupDB');
var router = express.Router();

var login_check = false;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    isLogin: req.session.isLogin,
    email: req.session.email,
    name: req.session.name
  });
  console.log('get으로 메인접속');
});


module.exports = router;
