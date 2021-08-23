
var AddTeams=function(req,res,next){

    var team_data={
        teamName:req.body.teamName,
        member_id: req.body.member_id,
        captain_id: res.locals.data.data.user_id
    };

    var connection = res.locals.connection;
    connection.query("INSERT INTO teams SET ?", team_data, function(err,result){
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


var DeleteMember=function(req,res,next){
    var connection = res.locals.connection;
    team_id =req.params.team_id;

    connection.query("SELECT * FROM teams WHERE team_id=?",team_id, function(err,result){
        if (err) {
            next(err);
        }
        else{
            var durum;
            durum = result[0].durum - 1;
            connection.query("UPDATE teams SET durum=? WHERE team_id = ?", [durum, team_id],function(err, result){
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

var ListTeam=function(req,res,next){
    const teamArr = [];
    var captain_id = res.locals.data.data.user_id

    var connection = res.locals.connection;
    connection.query("SELECT * FROM teams WHERE captain_id = ?", captain_id, function(err,result){
        if (err) {
           next(err);
        }
        else{
            for (var i in result){
                var team_data = {
                    team_id : result[i].team_id,
                    teamName : result[i].teamName,
                    member_id: result[i].member_id,
                    captain_id: result[i].captain_id
                };
                
                teamArr.push(team_data);
            }
            res.locals.data = {
                data: teamArr
            }
            next();
        }
    
    });
};


module.exports.AddTeams=AddTeams;
module.exports.DeleteMember=DeleteMember;
module.exports.ListTeam=ListTeam;
