var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require('path');
// var busboy = requrie("then-busboy");
// var fileUpload = require('express-fileupload');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.use('/uploads', express.static('uploads'));
// app.use(fileUpload());
app.set('view engine', 'handlebars');
app.set('port', 8000);
app.set('mysql', mysql);

// app.use('/user', require('./user.js'));
// app.use('/admin', require('./admin.js'));

app.use(require('./routes'))

// app.get('/',function(req,res){
// 	console.log("hello from actions");
//   res.render('actions.handlebars');
// 	//res.render('addUser.handlebars');
// });
//
// app.get('/user',function(req,res){
// 	console.log("hello from user");
//   res.render('addUser.handlebars');
// });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
