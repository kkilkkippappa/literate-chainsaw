var express = require('express');
var model = require('../models/signupDB');
var router = express.Router();

var login_check = false;
var check = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(check === 1){
    
  req.session.isLogin = false;
  check++;
  }
  res.render('index', { 
    title: 'Express',
    isLogin: req.session.isLogin,
    email: req.session.email,
    name: req.session.name
  });
  console.log('get으로 메인접속');
  console.log(`isLogin : ${req.session.isLogin}`);
});

router.post('/', function(req, res, next){
  console.log('메인화면 post 접속');
})

module.exports = router;
