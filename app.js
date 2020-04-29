require('./db.js');
//var Users = [{id:"user",password:"pass"}];
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var lessMiddleware = require("less-middleware");
app.use(cookieParser())
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.set('useFindAndModify', false);
// parse application/json
app.use(bodyParser.json())
//const patient = mongoose.model('patient');
const appointmentList = mongoose.model('appointmentList');
const Users = mongoose.model('User');
const patient = mongoose.model('patient');
const clinics = mongoose.model('clinic');
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

app.get('/', checkSignIn,(req, res) => {
  console.log("precheck:",req.session.user_id)
  Users.find({}, (err, ans) => {
    //res.render('main',{id:req.session.user_id});
    res.sendFile(path.join(__dirname+'/test.html'));
});
 
 
});
app.use(function(req, res, next){
  res.locals.userid = req.session.user_id;
  next();
});
app.get('/search',checkSignIn, (req, res) => {
  
  clinics.findOne({}, (err, ans) => {
    console.log(ans)
    res.render('search',{clinics:ans});
});
  });
app.get('/myInfo', checkSignIn,(req, res) => {
  patient.findOne({username:req.session.user_id}, (err, ans) => {
    console.log(ans)
    res.render('info', {info: ans});
});
  });
app.get('/myAppt',checkSignIn, (req, res) => {
  appointmentList.find({}, (err, ans) => {
    console.log("appoints",ans)
    const myAppt = ans.filter(appoint => appoint.userid ==req.session.user_id);
    res.render('myAppt', {myAppt: myAppt});
});
  });

app.get('/add',checkSignIn, function(req, res) {
    res.render('add');
});

app.post('/add', function(req, res) {
  console.log(req.body);
  const obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
     clinic: req.body.clinic,
      therapist: req.body.therapist,
      year:req.body.year,
      month:req.body.month,
      day:req.body.day,
      hour:req.body.hour,
      minute:req.body.minute,
      userid:req.session.user_id
  };
  const a = new appointmentList(obj);
  a.save((err, savedArticle) => {
      // if there's an error object.... just rerender the template with some message
      console.log(err, savedArticle);
      
      res.redirect('/myAppt');
      
})
} );


function checkSignIn(req, res, next){
  if(req.session.user_id){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log("you didn't login");
     //console.log(req.session.user);
     next(err);  //Error, trying to access unauthorized page!
  }
}

app.get('/edit',checkSignIn, function(req, res) {
  patient.findOne({username:req.session.user_id}, (err, ans) => {
    res.render('edit', {info: ans});
});
});

app.post('/edit', function(req, res) {
    patient.findOneAndUpdate({username:req.session.user_id}, 
    {$set:{ first:req.body.first, 
      last:req.body.last,
      gender:req.body.gender,
      need:req.body.need,
      message:req.body.message
      
    }}, { new: true },(err, ans) => {
    res.redirect('/myInfo');
});
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  var post = req.body;
  console.log(post);
  Users.find({id:post.id}, (err, ans) => {
    console.log("random:",ans)
    if(ans!=""){
      req.session.user_id = post.id;
      res.redirect('/');
    }
    else {
      console.log("non existing user")
      res.render('login', {
        message: "Incorrect User Info. Please re-try."});
    }
  });
});


app.get('/signup', function(req, res){
  res.render('signup');
});

app.post('/signup', function(req, res){
  if(!req.body.id || !req.body.password){
     res.status("400");
     res.send("Invalid details!");
  } else {
      Users.find({id:req.body.id},(err,ans)=>{
        if(ans !=""){
          console.log('check1')
          res.render('signup', {
            message: "User Already Exists! Login or choose another user id"});
        }else{
          console.log("signin-info "+req.body.id+req.body.password)
          const newUser = {id:req.body.id, password:req.body.password};
            const a = new Users(newUser);
            a.save((err, savedArticle) => {
              // if there's an error object.... just rerender the template with some message
            console.log(err, savedArticle);
            })
            const obj = {
              username:req.body.id,
              first: "",
              last:"",
              gender:"",
              age:"",
              need:"",
              message:"",
            };
            const b = new patient(obj);
            b.save((err, savedArticle) => {
              // if there's an error object.... just rerender the template with some message
            console.log(err, savedArticle);
            })
            req.session.user_id = req.body.id;
          res.redirect('/');
        }
    });
     
  }
});


app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});      

app.use('/protected_page', function(err, req, res, next){
  console.log(err);
     //User should be authenticated! Redirect him to log in.
     res.redirect('/login');
  });
  app.use('/', function(err, req, res, next){
    console.log(err);
       //User should be authenticated! Redirect him to log in.
       res.redirect('/login');
    });
    app.use('/search', function(err, req, res, next){
      console.log(err);
         //User should be authenticated! Redirect him to log in.
         res.redirect('/login');
      });
app.get('/map/langone', (req, res) => {
  res.locals.latitude = req.session.user_id;
  res.sendFile(path.join(__dirname+'/googlemap/mapPage-langone.html'));
});
app.get('/map/nycenter', (req, res) => {
  res.locals.latitude = req.session.user_id;
  res.sendFile(path.join(__dirname+'/googlemap/mapPage-city.html'));
});
app.get('/map/downtown', (req, res) => {
  res.locals.latitude = req.session.user_id;
  res.sendFile(path.join(__dirname+'/googlemap/mapPage-downtown.html'));
});
app.get('/hey', (req, res) =>{
  res.sendFile(path.join(__dirname+'/test.html'));
})

app.get('/like_button.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/like_button.js'));
});
app.get('/id', (req, res) =>
{
  res.send([{id:req.session.user_id}])
});

app.listen(process.env.PORT || 9000);

