var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var passport = require('./strategies/userStrategy');
var session = require('express-session');


var Recipe = require('./routes/recipeSearch');
var Ingredient = require('./routes/myFridge');
var index = require('./routes/index');
var register = require('./routes/register');
var user = require('./routes/user');

var databaseURI = 'mongodb://localhost:27017/mu';

mongoose.connect(databaseURI).connection;

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open', databaseURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting', err);
});
// Serve back static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/recipeSearch', Recipe);
app.use('/myFridge', Ingredient);
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);
// Handle index file separately
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/views/index.html'));
// })

// app.get('/favlist', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/views/favorites.html'));
// })

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
