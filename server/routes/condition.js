// 오늘의 컨디션 웹페이지 
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('condition');
});
module.exports = router;