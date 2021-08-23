var AddTask=function(req,res,next){

    var task_data={
        task:req.body.task,
        user_id: res.locals.data.data.user_id,
        team_id: req.body.team_id,
        uye_id: req.body.uye_id
    };

    var connection = res.locals.connection;
    connection.query("INSERT INTO tasks SET ?", task_data, function(err,result){
        if (err) {
           next(err);
        }
        else{
            res.locals.data ={
                data : true
            };
            next();
        }
    
    });
};


var ListTask=function(req,res,next){
    const taskArr = [];
    const user_id = res.locals.data.data.user_id

    var connection = res.locals.connection;
    connection.query("SELECT * FROM tasks WHERE user_id = ?", user_id, function(err,result){

        if (err) {
           next(err);
        }
        else{
            for (var i in result){
                var task_data = {
                    task_id : result[i].task_id,
                    task : result[i].task,
                    uye_id : result[i].uye_id,
                    user_id: result[i].user_id
                };
                
                taskArr.push(task_data);
            }
            res.locals.data = {
                data: taskArr
            }
            next();
        }
    
    });
};


var UpdateTask=function(req,res,next){

    var task_data={
        task:req.body.task,
        task_id: req.params.task_id,
        user_id: res.locals.data.data.user_id
    };

    var connection = res.locals.connection;
    connection.query("SELECT * FROM tasks WHERE task_id=?",task_data.user_id, function(err,result){
        connection.query("UPDATE tasks SET ? WHERE task_id = ?", [task_data, task_data.task_id], function(err,result){
            if (err) {
                next(err);
            }
            else{
                res.locals.data={
                    data : true
                };
                next();
            }
        });
    });
};

var DeleteTask=function(req,res,next){
    task_id =req.params.task_id;
    var connection = res.locals.connection;
    connection.query("DELETE FROM tasks WHERE task_id = ?", [task_id], function(err,result){
        if (err) {
            next(err);
        }
        else{
            res.locals.data={
                data : true
            };
            next();
        }
    });
};

var CheckedTask=function(req,res,next){
    task_id =req.params.task_id;
    var connection = res.locals.connection;
    connection.query("SELECT * FROM tasks WHERE task_id=?",task_id, function(err,result){
        if (err) {
            next(err);
        }
        else{
            var checked;
            checked = result[0].checked + 1;
            connection.query("UPDATE tasks SET checked=? WHERE task_id=?", [checked, task_id],function(err, result){
                if (err) {
                    next(err);
                }
                else{
                    res.locals.data={
                        data : true
                    };
                    next();
                }
            });
        }
    });
};


var UserTaskFilter=function(req,res,next){
    const uye_id = req.body.uye_id;

    var connection = res.locals.connection;
    connection.query("SELECT tasks.task_id, tasks.task, tasks.user_id, tasks.uye_id,teams.team_id FROM tasks INNER JOIN teams ON (tasks.uye_id=teams.member_id) WHERE tasks.uye_id=?",uye_id, function(err,result){
        if (err) {
           next(err);
        }
        else{
            res.locals.data = {
                data: result
            }
            next();
        }
    
    });
};

module.exports.AddTask=AddTask;
module.exports.ListTask=ListTask;
module.exports.UpdateTask=UpdateTask;
module.exports.DeleteTask=DeleteTask;
module.exports.CheckedTask=CheckedTask;
module.exports.UserTaskFilter=UserTaskFilter;