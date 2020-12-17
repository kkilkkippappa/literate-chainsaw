var express = require('express');
var model = require('../models/signupDB');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
  res.send('<h2>users</h2>');
});

// 여기서 로그인 처리.
router.post('/login', function(req, res){
  // 로그인 아이디, pw 정보를 모두 받았다면
  console.log(`login 들어왔는지 확인 : ${req.body.login_id}, ${req.body.login_password}`);
  if(req.body.login_id && req.body.login_password ){

    model.select_Login(req, res, (results) => {
    console.log(`로그인 하는 함수 - results : ${results}`);
    console.log(`results 값 확인 : ${results[0]}, ${results[0].email}, ${results[0].password}`);

      // email과 password 두 개 다 db에 저장된 값과 같다면...
      if(req.body.login_id == results[0].email && req.body.login_password == results[0].password){
        console.log('로그인 처리 if 문 들어옴. 성공!');
        req.session.isLogin = true;
        req.session.email = req.body.login_id;
        req.session.name = results[0].name;

        console.log(`세션값 확인 : ${req.session.isLogin}, ${req.session.email}, ${req.session.name}`);
        res.redirect('http://localhost:8080');
      }
      else{
        res.send('<h2>로그인 실패!</h2>');
      }
    });
  }
  else{
    console.log('아이디나 비밀번호를 다시 입력해주세요');
  }
});

// 회원가입 처리
router.get('/signup', function(req, res){
  console.log('signup (get)');
  res.render('signup');
});

router.post('/signup', function(req, res) {
  console.log('signup (post)');

 // 회원가입 때 반드시 기재해야 할 게 다 들어있다면..
 if(req.body.email && req.body.password && req.body.grade && req.body.class && req.body.class_num && req.body.name){
  console.log('회원가입 성공');
  model.insert_Login(req, res, ()=>{
    console.log('에러 잡히는지 확인.');
    console.log('진짜 성공!!');
  });
  
}
else{
  res.send('<h2>회원가입 실패</h2>');
  console.log(`회원가입 에러 확인 : ${req.body.email},  ${req.body.class_num}`);
  res.redirect('http://localhost:8080');
}
res.redirect('/');
  });

// 로그아웃 처리
router.get('/logout', function(req, res){
  // 로그인 되어있으면 로그아웃 처리
  if(req.session.isLogin){
    console.log('로그아웃 처리 시작!');
    req.session.destroy(
      function(err){
        if(err){
          console.log('로그아웃 - 세션 삭제 에러!');
          return;
        }
        console.log('세션 삭제 성공!');
        res.redirect('/');
      }
    )
  }
  else{
    console.log('로그인 안됨!');
  }
});
module.exports = router;