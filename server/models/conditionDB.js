var connection = require('./db');

exports.insert_condition = function(req, res, cd){
    sql = 'INSERT INTO condition (condition_email, data, color) VALUES (?,?,?)';
    values = [req.session.email, req.query.data, req.query.color];

    // 같은 날짜에 값을 집어넣었는지 검사한다.
    connection.query(`SELECT * FROM 2020_project.condition where condition_email = ? and not exists (select date from 2020_project.condition where date = ?);`, 
    [req.session.email, req.session.date],
    function(err, result, fields){
        if(err){
            console.log('err');
        }
        else{
            connection.query(sql, values, function(err, results, fields){
                if(err){
                    console.log('condition db insert err : ' + err);
                }
                else{
                    console.log('condition insert success');
                }
            })
        }
    })
}

exports.select_todayColor = function(req, res, cd){
    
}