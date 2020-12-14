// 일기장 웹페이지를 담당함.
var express = require('express');
var model = require('../models/diaryDB');
var router = express.Router();

// diary main page
router.get('/', function(req, res, next) {
  res.render('diary');
  console.log('get으로 diary 접속');

  if(req.query.title && req.query.date && req.query.content){
    console.log(`일기장 확인 : ${req.query.title}, ${req.query.date}, ${req.query.content}, ${req.session.isLogin}, `);
    model.insert_diary(req, res, () => {
      console.log(`get 에서 diary_insery 콜백 함수 부름...`);
    });
    console.log('일기장 저장 성공!');
  }
});

// 일기장 저장 버튼을 누르고 난 후, post 방식으로 메인페이지를 넘겨준다.
router.post('/', function(req, res, next){
  res.render('diary');
  console.log('post으로 diary 접속');

  // 일기장 정보를 모두 받았다면...
  if(req.body.title && req.body.date && req.body.content){
    console.log(`1. diary_insert정보 - ${req.body.title}, ${req.body.date}, ${req.body.content}`);
    console.log('2. session.email 확인... : ' + req.session.email);
    
    model.insert_diary(req, res, () => {
      console.log(`diary_insery 콜백 함수 부름...`);
    });
  }
});

// diary write page
router.get('/write', function(req, res, next){
  res.render('diary_write');
  console.log('diary/write get으로 접속!');
});

router.get('/delete', function(req, res, next){
  
});
module.exports = router;