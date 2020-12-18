var connection = require('./db');

exports.insert_condition = function(req, res, date, cd){
    console.log('db 함수에서 date : ' + date);

    // '2020-12-15'
    sql = `SELECT * FROM 2020_project.condition WHERE condition_email = ? and date IN (SELECT date FROM 2020_project.condition WHERE date = ?);`
    //sql = 'select * from 2020_project.condition;'
    values = [req.session.email, date];
    //values = ['2020-12-15'];

    connection.query(sql, values, function(err, results){
        if(err){
            console.log('컨디션 값 db 저장 오류 ' + err);
        }
        else{
            if(results.length == 0){
                // date 값 저장 ==> 이미 한 번저장했다. 
                // update로 color 값 변경
                console.log('값 null!');
                sql2 = 'update 2020_project.condition set color = ? where date = ?;'
                values2 = []

                connection.query(sql, values, function(err, results){
                    if(err){
                        console.log('컬러값 업데이트 하는데 err : ' + err);
                    }
                    else{
                        // update가 잘 됐다면..
                        
                    }
                })
            }
            else{
                // 값이 없으면 insert로 값 저장.
                console.log('값이 있습니다.! 다음 쿼리문 실행 필요');
                sql2 = 'insert into condition (condition_email, date, color) values (?,?,?)';
                //values2 = [req.session.email, nowDate, req.]; //  colorcode 값을 가져와야 한다.
            }
        }
    })


    // sql = 'INSERT INTO condition (condition_email, data, color) VALUES (?,?,?)';
    // values = [req.session.email, req.query.data, req.query.color];

    // // 같은 날짜에 값을 집어넣었는지 검사한다.
    // connection.query(`SELECT * FROM 2020_project.condition where condition_email = ? and not exists (select date from 2020_project.condition where date = ?);`, 
    // [req.session.email, req.session.date],
    // function(err, result, fields){
    //     if(err){
    //         console.log('err');
    //     }
    //     else{
    //         connection.query(sql, values, function(err, results, fields){
    //             if(err){
    //                 console.log('condition db insert err : ' + err);
    //             }
    //             else{
    //                 console.log('condition insert success');
    //             }
    //         })
    //     }
    // })
}

exports.select_todayColor = function(req, res, cd){
    
}