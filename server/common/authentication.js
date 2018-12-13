let User = require('../models/user').User;
let LocalStrategy = require('passport-local').Strategy;
let {ObjectId} = require('mongodb');



module.exports.preparePassport = function(passport) {
    passport.use(new LocalStrategy({ // or whatever you want to use
        usernameField: 'email', // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    }, function(username, password, done) {
        let user = new User();

        let returnUser;
        user.find({
            query: {
                email: username
            }
        })
            .then(function(userFound) {
                if (!userFound || !userFound.length) {
                    return done(null, false, {
                        message: 'Unkown User'
                    });
                } else {
                    returnUser = userFound[0];
                    return user.verifyPassword(password, returnUser.password);
                }
            })
            .then(function(match) {
                if (!match) {
                    return done(null, false, {
                        message: 'Password Mismatch'
                    });
                } else {
                    return done(null, returnUser);
                }
            })
            .catch(function(err) {
                if (err) {
                    return done(err);
                }
            });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        let user = new User();
        user.find({
            query: {
                _id: ObjectId(id)
            }
        })
            .then(function(user) {
                done(null, user[0]);
            })
            .catch(function(err) {
                done(err);
            });
    });
};