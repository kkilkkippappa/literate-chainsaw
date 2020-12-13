// todolist web page
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('todolist');
});
router.post('/calendar/write', function(req, res, next){
    
});
module.exports = router;