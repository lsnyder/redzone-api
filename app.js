var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var scoreRouter = require('./routes/scores');
var playerRouter = require('./routes/players');
var standingRouter = require('./routes/standings');
var teamRouter = require('./routes/teams');
var statRouter = require('./routes/stats');
var db = require('./services/mongo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use('/', indexRouter);
app.use('/players', playerRouter);
app.use('/teams', teamRouter);
app.use('/standings', standingRouter);
app.use('/scores', scoreRouter);
app.use('/stats', statRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use(function (err, req, res, next) {
//   if (err.isBoom) {
//     return res.status(err.output.statusCode).json(err.output.payload);
//   }  
// });

// app.use(mongo.connect)


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connect(err => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('Connected to Mongo...')
  }
})

module.exports = app;
