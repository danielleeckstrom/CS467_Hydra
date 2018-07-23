var router = require('express').Router();

router.use('/', require('./action'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));

// figure out what this is for?
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
