// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// an appointmentList is a list of patient's appointments
// it has the clinic information and the appointment date. 
const appointmentList = new mongoose.Schema({
  firstName:{type: String},
  lastName:{type: String},
  clinic: {type: String},
  therapist: {type: String},
  year:{type: Number},
  month:{type: Number},
  day:{type: Number},
  hour:{type:Number},
  minute:{type: Number}
  
}, { collection: 'appointments' })
mongoose.model('appointmentList',appointmentList);



// a patient with their basic information and their appointments
const patient = new mongoose.Schema({
  firstName: String,
  lastName:String,
  // password hash provided by authentication plugin
  //appointmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointmentList' }],
  gender:String,
  age:Number,
  need:String,
  message:String
});

mongoose.model('patient',patient);


// a therapist information demo
//it shows the availbility as calender of a therapist,which helps to make apppointments
const therapist = new mongoose.Schema({
    name:String,
    gender:String,
    specialty:String,
    availability:String // probably a calander 
});

mongoose.model('therapist',therapist);

//a clinic contains a list of therapists
// a clinic provides location information for search
const clinic = new mongoose.Schema({
    location:String,
    openHours:String,
    insuranceCover:String,
    therapists: [{type: mongoose.Schema.Types.ObjectId, ref: 'therapist'}]
  });

  mongoose.model('clinic',clinic);


// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb+srv://zl1941:zl1941@ait-dzhzk.mongodb.net/test?retryWrites=true&w=majority';
}

 mongoose.connect('mongodb://localhost/dbconf', {useNewUrlParser: true, useUnifiedTopology: true});

/*
  db.appointmentList.insert({
    firstName: "chloe",
    lastName:"li",
    clinic: "nyc clinic",
     therapist: "lucas macchiato",
    year:2020,
    month:4,
    day:20,
    hour:11,
    minute:30
  })
*/

/*
db.appointments.insert({

    firstName: "Chloe",
    lastName:"Li",
    clinic: "first clinic",
    therapist: "cool doc",
    year:2020,
    month:10,
    day:14,
    hour:16,
    minute:30
})
*/