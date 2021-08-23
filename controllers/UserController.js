var bcrypt = require("bcrypt");
var TokenCtrl = require("../controllers/TokenController");

var UserRegister=function(req,res,next){
    
    var connection = res.locals.connection;
    var veri = {
        fullname: req.body.fullname ,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    if (req.body.fullname !== "" && req.body.username !== "" && req.body.email !== "" && req.body.password !== ""){
        connection.query("SELECT * FROM users WHERE username=?",veri.username,function(err, result){
            if (result.length != 0) {
                console.log("Farklı kullanıcı adı deneyiniz!!");
                return res.status(404).send({ data: false });
            }
            else{
                bcrypt.genSalt(12, function(err, salt){
                    bcrypt.hash(veri.password, salt, function(err,hash){

                        veri.password=hash;

                        connection.query("INSERT INTO users SET ?", veri, function(err, result){
                            console.log("çıktı",result);

                            if (err) {
                                console.log("err",err);
                                next(err);
                            }
                            else{
                                res.locals.data={
                                    data:true
                                }
                                next();
                            }
                        });
                    })
                })
                
            }
        })
    }
    else{
        res.locals.data={
            data: false
        }
        next();
    }
};


var UserLogin=function(req,res,next){

    var connection = res.locals.connection;
    var veri = {
        username: req.body.username,
        password: req.body.password
    };

    if (req.body.username !== "" && req.body.password !== ""){
        connection.query("SELECT * FROM users WHERE username=?",veri.username,function(err, result){
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                if (err) throw err;
                else{
                    bcrypt.compare(veri.password,element.password,function(err,isMatch){
                        if (err) {
                            console.log("err",err);
                            throw err;
                        }
                        else{
                            if (err) console.log("err",err);
                            else if (result != null)
                            { //if user is exist

                                var userid = {
                                    user_id : element.user_id,
                                };      

                                //token
                                var token=TokenCtrl.token(userid);
                                //save it 
                                res.cookie('auth',token);
                                res.locals.data = {
                                    is_user:true,
                                    data: token
                                };
                                next();
                            }
                            else{
                                return res.send({is_user:false,message: 'Please check the information' });
                            }
                        }
                    })
                }  
            }
        })
       
    }
    else{
        res.locals.data={
            data: false
        }
        next();
    }
};

var UserLogout=function(req,res,next){
    res.clearCookie('auth');
    res.send({message:'OK'})
}


var deleteUser=function(req,res,next){
	var connection = res.locals.connection;
    var username = req.body.username;
    connection.query("SELECT * FROM users WHERE username=?",username,function(err,result){
		if(result.length == 0) {
            console.log("User not found");
            return res.status(404).send({ data: false });
        } 
        else{
            connection.query("DELETE FROM users WHERE username=? ",username,function(err,result){
                if(err) throw err;
                else{
                    res.locals.data={
                        data: result            
                    };
                    next();
                }
            });    
        }
    });
};


var getAllUser=function(req,res,next){
	var connection = res.locals.connection;
    const userArr = [];
    connection.query("SELECT * FROM users",function(err,result){
		if (err) {
            next(err);
        } 
        else {            
            for (var i in result){
                var veri = {
                    user_id : result[i].user_id,
                    fullname : result[i].fullname,
                    username : result[i].username,
                    email : result[i].email,
                    version : result[i].version,
                    password: result[i].password
                };
                
                userArr.push(veri);
            }
            res.locals.data = {
                data: userArr
            }
            next();
        }
    });
};



module.exports.UserRegister = UserRegister;
module.exports.UserLogin = UserLogin; 
module.exports.UserLogout = UserLogout;
module.exports.deleteUser = deleteUser;
module.exports.getAllUser = getAllUser;
