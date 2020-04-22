require('./db.js');

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//const patient = mongoose.model('patient');
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
    res.render('info')
  });
app.get('/myAppt', (req, res) => {
  appointmentList.find({}, (err, ans) => {
    res.render('myAppt', {myAppt: ans});
});
  });

app.get('/add', function(req, res) {
    res.render('add');
});

app.post('/add', function(req, res) {
  console.log(req.body);
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

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname+'/googlemap/mapPage.html'));
});

app.listen(3000);

