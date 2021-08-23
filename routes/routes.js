const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

const BaseController = require('../controllers/BaseController');
const UserController = require('../controllers/UserController');
const TeamController = require('../controllers/TeamController');
const TaskController = require('../controllers/TaskController');
const TokenController = require('../controllers/TokenController');


module.exports = function(app) {
    app.use(cookieParser());
    //app.use(bodyParser());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    app.post('/api/user/register',BaseController.InitSession,UserController.UserRegister,BaseController.EndSession);
    app.post('/api/user/login', BaseController.InitSession, UserController.UserLogin, BaseController.EndSession);
    app.get('/api/user/logout',UserController.UserLogout);  
    app.delete('/api/user/deleteUser', BaseController.InitSession, UserController.deleteUser, BaseController.EndSession);
    app.get('/api/user/listUser', BaseController.InitSession, UserController.getAllUser, BaseController.EndSession);
    
    app.post('/api/team/addTeam',TokenController.tokenControl, BaseController.InitSession, TeamController.AddTeams, BaseController.EndSession);
    app.post('/api/team/deleteMember/:team_id',TokenController.tokenControl, BaseController.InitSession, TeamController.DeleteMember, BaseController.EndSession);
    app.get('/api/team/listTeam',TokenController.tokenControl, BaseController.InitSession, TeamController.ListTeam, BaseController.EndSession);

    app.post('/api/task/addTask',TokenController.tokenControl, BaseController.InitSession,TaskController.AddTask, BaseController.EndSession);
    app.get('/api/task/ListTask',TokenController.tokenControl, BaseController.InitSession,TaskController.ListTask, BaseController.EndSession);
    app.post('/api/task/updateTask/:task_id',TokenController.tokenControl, BaseController.InitSession, TaskController.UpdateTask, BaseController.EndSession);
    app.delete('/api/task/deleteTask/:task_id',TokenController.tokenControl, BaseController.InitSession, TaskController.DeleteTask, BaseController.EndSession);
    app.post('/api/task/checkedTask/:task_id',TokenController.tokenControl, BaseController.InitSession, TaskController.CheckedTask, BaseController.EndSession);
    app.get('/api/task/userTaskFilter',BaseController.InitSession, TaskController.UserTaskFilter, BaseController.EndSession);

    app.get('/tokenControl', TokenController.tokenControl);

    var errorHandler = function(err, req, res, next) {
        if (res.locals.connection) {
            res.locals.connection.release();
        }
        res.json({
            data: null,
            error: err
        });
    };
    app.use(errorHandler);
};