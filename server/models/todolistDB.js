var connection = require('./db'); 

exports.insert_todolist = function(req, res, cd){
    sql = 'insert into todolist_calendar (todolist_email, content, ischeck) values (?,?,?);'
    values = [req.session.email, req.body.content]

    connection.query(sql, values, function(err, results){
        if(err){
            console.log(`insert_todolist err : ${err}`);
        }
        else{
            console.log(`insert_todolist 쿼리문 에러 없음`);
            cd();
        }
    })
}

exports.change_ischeck = function(req, res){
    sql = 'update todolist_calendar set ischeck = ? where idtodolist_calendar = ?;'
    values = []
}