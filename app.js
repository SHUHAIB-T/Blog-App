const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/connection')
const session = require('express-session')
const noCache=require('nocache');

const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const app = express();
require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.connect()
app.use(noCache());
app.use(session({
  secret: 'session key',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge:1000*60*60}
}))
app.use('/', usersRouter);
app.use('/admin',adminRouter);


// error handler
app.use((req,res) => {
  res.status(404).render('user/error');
});

module.exports = app;