var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var tasks = require('./routes/tasks');

var app = express();

const config = require('./config.js');

const { Client } = require('pg');
const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// const db = require('./db.js')(config.databaseURL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => {
    console.log(`Now running on port ${config.port}`);
    db.connect()
        .then(() => {
            app.set('db', db);
            console.log('connected to DB!');
        })
        .catch((error) => {
            console.log(`Error connecting to database ${error.message}`);
            process.exit();
        });
});

module.exports = app;
