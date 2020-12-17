// 오늘의 컨디션 웹페이지 
var express = require('express');
var router = express.Router();

var isSave;
var cnt = 1;

router.get('/', function(req, res, next){
    console.log('conditino 확인.');
    console.log('condition isLogin : ' + req.session.isLogin);
    if(req.session.isLogin == true){
        console.log('condition 접속가능');
        res.render('condition');
        if(cnt == 1){
            isSave = false;
        }
        else{
            // 접속 여러번이면
            if(req.query.)
        }
        
    }
    else{
        console.log('condition 접속 불가');
        res.send(`<h2>로그인 필요 서비스!</h2>`);
    }
});
module.exports = router;