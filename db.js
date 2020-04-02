// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// a patient with their basic information and their appointments
const patient = new mongoose.Schema({
  firstName: String,
  lastName:String,
  // password hash provided by authentication plugin
  appointmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointmentList' }],
  gender:String,
  age:Number,
  need:String,
  message:String
});


// an appointmentList is a list of patient's appointments
// it has the clinic information and the appointment date. 
const appointmentList = new mongoose.Schema({
    firstName: String,
    lastName:String,
    items: [
        { clinic: String, therapist: String, year:Number,month:Number,day:Number},
    ]
})

// a therapist information demo
//it shows the availbility as calender of a therapist,which helps to make apppointments
const therapist = new mongoose.Schema({
    name:String,
    gender:String,
    specialty:String,
    availability:String // probably a calander 
});

//a clinic contains a list of therapists
// a clinic provides location information for search
const clinic = new mongoose.Schema({
    location:String,
    openHours:String,
    insuranceCover:String,
    therapists: [{type: mongoose.Schema.Types.ObjectId, ref: 'therapist'}]
  });
