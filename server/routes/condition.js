// 오늘의 컨디션 웹페이지 
var express = require('express');
var model = require('../models/conditionDB');
var nowDate = require('moment');
var router = express.Router();

var isSave;
var cnt = 1;


router.get('/', function(req, res, next){
    var date = nowDate().format("YYYY-MM-DD");
    //var date = nowDate();
    console.log('date 형 확인 : ' + typeof(date));
    console.log('conditino 확인. : '  + date);
    console.log('condition isLogin : ' + req.session.isLogin);
    if(req.session.isLogin == true){
        console.log(`condition_range 체크 : ` + req.query.condition_range);
        if(req.query.condition_range){
            console.log('하이하이');
            model.insert_condition(req, res, date, () =>{
                console.log('얼마 안남았어!');
            })
        }
        console.log('condition 접속가능');
        res.render('condition');
    }
    else{
        console.log('condition 접속 불가');
        res.send(`<h2>로그인 필요 서비스!</h2>`);
    }
});
module.exports = router;