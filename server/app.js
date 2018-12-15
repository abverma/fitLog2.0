/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }]*/
const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const port = 3000;

let logs = require('./routes/log');
let authenticator = require('./common/authentication');
let user = require('./routes/user');

app.use(cookieParser());

let myLogger = function(req, res, next) {
    console.log(req.method, req.url);
    next();
};

let clientDir;
if (
    process.env.CLIENT_MODE &&
  process.env.CLIENT_MODE.toLowerCase() === 'testing'
) {
    clientDir = path.join(__dirname, '../client/build/testing/FitLog/');
} else {
    clientDir = path.join(__dirname, '../client/build/production/FitLog/');
}
let viewsDir = path.join(__dirname, 'views');

//Custom Logger
app.use(myLogger);

//bodyparser
app.use(bodyParser.json()); // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: false
    })
); // for parsing application/x-www-form-urlencoded

//express-validator
app.use(validator());

//statics
app.use(express.static('public'));

//hanldebar views
app.set('views', viewsDir);
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'layout'
    })
);
app.set('view engine', 'handlebars');

//session
let sessOptions = {
    secret: 'urdhwagaman',
    saveUninitialized: true,
    resave: true,
    cookie: {}
};
if (app.get('env') === 'production') {
    sessOptions.cookie.secure = true; // serve secure cookies
}
app.use(session(sessOptions));

//passport
app.use(passport.initialize());
app.use(passport.session());

authenticator.preparePassport(passport);

//connect flash
app.use(flash());

//global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

//homepage
app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', user.signup);

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    }
);

app.post('/session', passport.authenticate('local'), function(req, res) {
    res.status(200).send({
        passport: req.session.passport,
        user: req.user,
        sessionId: req.sessionID
    });
});



app.use(function(req, res, next) {
    //console.log('Cookies: ', req.cookies);
    if (!req.user) {
        console.log('Use not authenticated. Redirecting..');
        if (req.xhr) {
            res.redirect(401, '/login');
        } else {
            res.redirect('/login');
        }
    } else {
        next();
    }
});

app.use(express.static(clientDir));

app.get('/', function(req, res) {
    res.sendFile(path.join(clientDir, 'index.html'));
});

//log routes
app.get('/logs', logs.getLogs);
app.post('/logs', logs.createLogs);
app.delete('/logs/:id', logs.deleteLogs);
app.put('/logs/:id', logs.updateLog);

//error handler
app.use(function(err, req, res, next) {
    // log the error, for now just console.log
    console.log(err);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app; //for testing
