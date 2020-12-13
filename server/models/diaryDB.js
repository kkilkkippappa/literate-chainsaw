var connection = require('./db');

exports.insert_diary = function(req, res){
    //console.log('3. insert_diary???');
    //console.log(`3. insert_diary 되는지 확인.. : ${req.session.email}, ${ req.query.title}, ${req.query.date}, ${req.query.content}`);
    sql = 'INSERT INTO diary (diary_email, title, date, content) VALUES(?,?,?,?)';
    console.log('4. insert_diary session 확인 ' + req.session.email);
    values = [req.session.email, req.query.title, req.query.date, req.query.content];
    connection.query(sql, values, function(err, results, fields){
        if( result.affectedRows > 0){
            console.log('insert_diary 되는지 확인2..');
        }  
        else{
            console.log('diary insert err!');
        }
    });
}


exports.delete_diary = function(res, req){
    sql = 'DELETE FROM ';
}
