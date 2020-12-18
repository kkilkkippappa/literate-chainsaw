// 일기장 웹페이지를 담당함.
var express = require('express');
var model = require('../models/diaryDB');
var router = express.Router();

// diary main page
router.get('/', function(req, res, next) {

  console.log('로그인 확인 : ' + req.session.isLogin);
  // 로그인 후에 이용하게 만들기!
  if(req.session.isLogin == true){
    res.render('diary');
    console.log('get으로 diary 접속');
  }
  // 로그인을 하지 않았을 때
  else{
    console.log('diary 접속 불가');
    res.send(`<h2>로그인 필요 서비스!</h2>`);
    //res.send(`<a href="/">메인 페이지로 가기</a>`);
    //res.redirect('/');
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


router.get('/list', function(req, res){
  res.redirect('/diary/list/1');
})

router.get('/list/:page', function(req, res, next){
  var page = req.params.page;
  model.show_diary(req, res, page);
});

// 다이어리 각 항목 보여주기
router.get('/show/:iddiary', function(req, res, next){
  let id = req.params.iddiary;
  model.click_diary(req, res, id);
})

// 다이어리 수정하기
router.post('/modify/:iddiary', function(req, res){
  var id = req.params.iddiary;
  console.log(`다이어리 수정 post id : ${id}`);
  model.modify_select_diary(req, res, id);

})

router.post('http://localhost:8080/diary/modify/:iddiary/save', function(req, res){
  var id = req.params.iddiary;
  console.log(`다이어리 수정 저장 post id : ${id}`);
  model.modify_update_diary(req, res, id, ()=>{
    res.redirect('http://localhost:8080/diary');
  });
})

router.post('/delete/:iddiary', function(req, res){
  var id = req.params.iddiary;
  console.log('다이어리 삭제 post로 받음. : ' + id);

  
});
module.exports = router;