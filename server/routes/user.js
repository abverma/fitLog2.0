let User = require('../models/user').User;

module.exports.signup = function(req, res) {
  let payload = req.body;

  //validations
  req.checkBody('firstName', 'First Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid.').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmPassword', 'Confirm Password is required').notEmpty();
  req
    .checkBody('confirmPassword', 'Passwords do not match')
    .equals(payload.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('signup', {
      errors: errors
    });
  } else {
    let newUser = new User();
    delete newUser.confirmPassword;
    newUser
      .create(payload)
      .then(function() {
        console.log('New user created');
        req.flash('success_msg', 'You are registered');
        res.redirect('/login');
      })
      .catch(function(err) {
        console.log(err);
        console.log('Error creating user');
        req.flash('error_msg', 'You are not registered');
        res.redirect('/signup');
      });
  }
};
