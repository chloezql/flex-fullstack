require('./db');

const express = require('express');
const path = require('path');

const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('main');
});
app.get('/search', (req, res) => {
    res.render('search');
  });
  app.get('/myInfo', (req, res) => {
    res.render('info');
  });
  app.get('/myAppt', (req, res) => {
    res.render('myAppt');
  });

app.listen(3000);