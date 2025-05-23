var express = require ('express');
var session = require ('express-session');
var cookie = require ('cookie-parser');
var path = require ('path');
var ejs= require ('ejs');
var multer = require('multer');
var path = require ('path');
var async = require ('async');
var nodmailer = require ('nodemailer');
var crypto = require ('crypto');
var expressValidator = require ('express-validator');
var  sweetalert = require('sweetalert2');
var app = express();



var bodyParser = require ('body-parser');

var  login = require ('./controllers/login.js');
var  home = require ('./controllers/home.js');
var  signup = require ('./controllers/signup.js');


var db = require ('./models/db_controller.js');
var reset = require('./controllers/reset_controller.js');
var set = require('./controllers/set_controller.js');

var logout = require ('./controllers/logout.js');
var verify = require ('./controllers/verify.js');

var landing = require ('./controllers/landing.js');


var appointment = require ('./controllers/appointment.js');

var patients = require('./controllers/patients.js');

var roomRoutes = require('./controllers/rooms.js');



var app = express();


app.set('view engine', 'ejs');





app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookie());
//app.use(expressValidator());


var server =app.listen(10613 , function(){

    console.log('server started');
});

app.use('/login' ,login);
app.use('/home' , home);
app.use('/signup' , signup);

app.use('/resetpassword' ,reset);
app.use('/setpassword',set);

app.use ('/logout',logout);
app.use ('/verify', verify);

app.use ('/',landing);


app.use ('/appointment',appointment);

app.use('/patients', patients); 

app.use('/rooms', roomRoutes);


const PORT = 10617;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
