var connection = require('./db');   // db.js에서 생성한 connect을 가져옴.

exports.insert_Login = function(req, res, cd){
    console.log('check');
    sql = 'INSERT INTO login (email, password, grade, class, class_num, name) VALUES(?, ?, ?, ?, ?, ?)';
    values = [req.body.email, req.body.password, req.body.grade, req.body.class, req.body.class_num, req.body.name];
    console.log(`signupDB.js 체크 : values - ${values}`);
    connection.query(sql, values, function(err, results, fields){
        if(err){
            console.log('mysql insert err-' + err);
        }
        else{
            cd();
            console.log('에러 없는지 확인');
        }
    })
}

exports.select_Login = function(req, res, cd){
    sql = 'select * from login where email = (select email from login where email = ?);';
    console.log('select_login 처리 하려고 함.');
    connection.query(sql, [req.body.login_id], function(err, results, fields){
        if(err){
            console.log('select ERROR');
        }else{
            cd(results);
        }
    })
}

exports.show_Login = function(body, cd){
    sql = 'SELECT * FROM login';
    connection.query(sql, function(err, results, fields){
        if(err){
            console.log('db 연결 자체가 이상함.');
        }else{
            cd();

        }
    })
}