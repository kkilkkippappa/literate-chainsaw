var connection = require('./db');

exports.insert_condition = function(req, res, cd){
    sql = 'INSERT INTO condition (condition_email, data, color) VALUES (?,?,?)';
    values = [req.session.email, req.query.data, req.query.color];

    connection.query(sql, values, function(err, results, fields){
        if(err){
            console.log('err!');
        }
        else{
            console.log('condition insert success');
        }
    })
}