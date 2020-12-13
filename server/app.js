var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var favicon = require('serve-favicon');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var diaryRouter = require('./routes/diary');
var conditionRouter = require('./routes/condition');
var todolistRouter = require('./routes/todolist');
var timetableRouter = require('./routes/timetable');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mysql 
var options = {
  host : 'localhost',
  port : 3306, 
  user : 'root',
  password : '1111',
  database : '2020_project'
};

var sessionStore = new MySQLStore(options);

// mysql 접속이 안된다.
app.use(session({
  HttpOnly:true,
  secret: 'subin',
  store: sessionStore,  // store 저장을 하지 않으면 메모리에 저장.
  resave: false,
  saveUninitialized: true     // 세션이 필요하기 전까지는 세션을 구동시키지 않는다(true)
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/diary', diaryRouter);
app.use('/condition', conditionRouter);
app.use('/todolist', todolistRouter);
app.use('/timetable', timetableRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// process.on('exit', function(){
//   console.log('프로그램 종료 이벤트 발생, 강제 로그아웃 합니다!');
// })

module.exports = app;
app.listen(8080, function(req, res){
  console.log('8080번 포트로 접속 중..');
});