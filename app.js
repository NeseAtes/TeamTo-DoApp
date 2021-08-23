const express = require('express');
const path = require('path');
const _  = require('lodash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const appconfig = require('./config/app');
const port = process.env.PORT || appconfig.port;
const app = express();
/*const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');*/

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


require('./routes/routes.js')(app); 


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
     console.log(err);
    //console.log(res);
    
    res.send(err);
  });


app.listen(port);
console.log('The server is on: ' + port);