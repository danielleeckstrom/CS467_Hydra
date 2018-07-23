var router = require('express').Router();

router.get('/',function(req,res){
	console.log("hello from actions");
  res.render('actions.handlebars');
	//res.render('addUser.handlebars');
});

module.exports = router;
