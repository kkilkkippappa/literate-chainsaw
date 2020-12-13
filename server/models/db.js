// 우리가 사용할 db 연결하는 작업!
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
     password : '1111',
    database : '2020_project'
});

connection.connect(function(err){
    console.log(`db.js 체크 : env - ${process.env.DATABASE}`);
    if(err){
        console.error('DB connect error :  ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;