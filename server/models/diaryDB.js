var connection = require('./db');

exports.insert_diary = function(req, res, cd){
    sql = 'INSERT INTO diary (diary_email, title, date, content) VALUES(?,?,?,?)';
    console.log('4. insert_diary session 확인 ' + req.session.email);
    console.log('5. 이름 확인 : ' + req.session.name);
    console.log(`6. 내용 확인 : ${req.body.title}, ${req.body.date}, ${req.body.content}`);
    values = [req.session.email, req.body.title, req.body.date, req.body.content];
    connection.query(sql, values, function(err, results){
        console.log('되니');
        if(err){
            console.log('diary insert err!');
        }  
        else{
            console.log('insert_diary 되는지 확인2..');
            cd();
        }
    });
}

exports.show_diary = function(req, res, page){
    sql = 'SELECT * FROM diary, login WHERE diary_email = ? and login.email = ?';
    value = [req.session.email, req.session.email];

    connection.query(sql, value, function(err, rows){
        if(err){
            console.log('show diary err : ' + err);
        }
        else{
            console.log(`value : ${value}, email : ${req.session.email}`);
            res.render('diary_list', {title : '게시판 리스트', rows : rows, page : page, 
            length : rows.length-1, page_num : 10, pass : true});
            console.log('rows : ' + rows);
            console.log(`rows 파헤치기 : ${rows[0]}, ${rows[1]}`);   // row는 해당 조건에 맞는 sql문 행.
            console.log(`length : ${rows.length - 1}`);
        }
    })
}

exports.count_diary = function(req, res, cnt){
    sql = 'SELECT count(*) AS cnt FROM diary, login WHERE diary_email = ? and login.email = ?';
    value = [req.session.email, req.session.email];

    connection.query(sql, value, function(err, results){
        if(err){
            console.log(`count_diary err : ${err}`);
        }
        else{
            cnt = results[0].cnt;
            console.log('count_diary cnt : ' + results[0].cnt);
        }
    })
}

exports.click_diary = function(req, res, id){
    sql = 'select * from diary, login where iddiary = ? and login.email = ?';
    value = [id, req.session.email];
    console.log(`click_diary에서 나왔습니다! = ${id}`);

    connection.query(sql, value, function(err, results){
        if(err){
            console.log('다이어리 보여주기  : ' + err);
        }
        else{
            console.log('show diary');
            console.log(`results : ${results[0]}`);
            res.render('diary_read', {title:results[0].title, rows: results});
        }
    })
};

exports.modify_select_diary = function(req, res, id){
    sql = 'select * from diary, login where iddiary = ? and login.email = ?';
    value = [id, req.session.email];
    console.log(`modify_diary에서 나왔습니다! = ${req.params.iddiary}`);

    connection.query(sql, value, function(err, results){
        if(err){
            console.log('다이어리 수정 : ' + err);
        }
        else{
            console.log(`results 확인 : ${results[0].title}`);
            console.log('show diary : ' + results[0].title);
            res.render('diary_modify', {rows: results});
        }
    })
};
exports.modify_update_diary = function(req, res, id, cd){
    sql = 'update diary set diary_email = ?, title = ?, date = ?, content = ? where iddiary = ?';
    values = [req.session.email, req.body.title, req.body.date, req.body.connection, id];
    
    connection.query(sql, values, function(err, results){
        if(err){
            console.log(`다이어리 수정 저장 에러 : ${err}`);
        }
        else{
            console.log(`results 확인 : ${results[0]}`);
            cd();
        }
    })
}