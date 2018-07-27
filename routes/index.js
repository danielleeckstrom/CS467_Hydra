module.exports = function(){
  var express = require('express');
  var router = express.Router();


//router.use('/', require('./action'));
router.use('/createAward', require('./createAward.js'));
router.use('/user-profile', require('./user-profile.js'));
router.use('/user-sign-in', require('./user-sign-in.js'));
router.use('/user-awards', require('./user-awards.js'));
router.use('/admin-profile', require('./admin-profile.js'));
router.use('/admin', require('./admin.js'));
router.use('/user', require('./user.js'));
router.use('/', express.static('public'));

//app.use(express.static(__dirname + '/public'));
// figure out what this is for?
//router.use(function(err, req, res, next){
//  if(err.name === 'ValidationError'){
//    return res.status(422).json({
//      errors: Object.keys(err.errors).reduce(function(errors, key){
//        errors[key] = err.errors[key].message;

//        return errors;
//      }, {})
//    });
//  }

//  return next(err);
};

//module.exports = router;
