require('./db.js');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const patient = mongoose.model('patient');
const appointmentList = mongoose.model('appointmentList');
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
    patient.find({}, (err, ans) => {
      res.render('info', {patient: ans});
  });
  });
app.get('/myAppt', (req, res) => {
  appointmentList.find({}, (err, ans) => {
    res.render('myAppt', {appointment: ans});
});
  });

app.get('/add', function(req, res) {
    res.render('add');
});

app.post('/add', function(req, res) {
  const obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
     clinic: req.body.clinic,
      therapist: req.body.therapist
  };
  const a = new appointmentList(obj);
  a.save((err, savedArticle) => {
      // if there's an error object.... just rerender the template with some message
      console.log(err, savedArticle);
      
      res.redirect('/myAppt');
      
})
} );

app.listen(3000);