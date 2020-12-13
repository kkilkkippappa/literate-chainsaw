var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('timetable');
  console.log('get으로 타임테이블 접속');
});

module.exports = router;