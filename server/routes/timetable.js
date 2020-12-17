var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLogin == true){
    console.log('timetable 접속가능');
    res.render('timetable');
}
else{
    console.log('timetable 접속 불가');
    res.send(`<h2>로그인 필요 서비스!</h2>`);
    //res.send(`<a href="/">메인 페이지로 가기</a>`);
    //res.redirect('/');
}
});

module.exports = router;