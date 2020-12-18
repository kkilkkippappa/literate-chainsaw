// todolist web page
var express = require('express');
var model = require('../models/todolistDB');
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
        }
});
router.post('/save', function(req, res){
    console.log('save 확인ㅇ!');
    console.log(`으아악 : ${req.body.title}, ${req.body.content}`);
    if(req.body.title && req.body.content){
        console.log('hi');
        model.insert_todolist(req, res, () => {
            res.redirect('http://localhost:8080/todolist');
        });
    }
})
module.exports = router;