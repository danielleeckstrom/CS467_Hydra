var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({ secret: 'secret', name: 'secret_name' }));

app.use('/static', express.static('public'));

app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);


app.use('/createAward', require('./routes/createAward.js'));
app.use('/user-profile', require('./routes/user-profile.js'));
app.use('/user-sign-in', require('./routes/user-sign-in.js'));
app.use('/user-awards', require('./routes/user-awards.js'));
app.use('/admin-profile', require('./routes/admin-profile.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/user', require('./routes/user.js'));
//app.use('/', express.static('public'));
app.use(express.static(__dirname + '/public'));

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
