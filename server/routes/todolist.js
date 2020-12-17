// todolist web page
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    if(req.session.isLogin == true){
        console.log('todolist 접속가능');
        res.render('todolist');
    }
    else{
        console.log('todolist 접속 불가');
        res.redirect('/');
        res.send(`<h2>로그인 필요 서비스!</h2>`);
        //res.send(`<a href="/">메인 페이지로 가기</a>`);
    }
});
router.post('/calendar/write', function(req, res, next){
    
});
module.exports = router;