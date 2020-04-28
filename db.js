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
  minute:{type: Number},
  userid:{type:String}
  
}, { collection: 'appointments' })
mongoose.model('appointmentList',appointmentList);

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true},
  password: { type: String, required: true}
}, { collection: 'users'});
mongoose.model('User', UserSchema);

// a patient with their basic information and their appointments
const patient = new mongoose.Schema({
  first: String,
  last:String,
  // password hash provided by authentication plugin
  //appointmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointmentList' }],
  gender:String,
  age:Number,
  need:String,
  message:String,
  username:String
}, { collection: 'patients' });

mongoose.model('patient',patient);


//a clinic contains a list of therapists
// a clinic provides location information for search
const clinic = new mongoose.Schema({
    name:String,
    longitude:Number,
    latitude:Number,
    focus:String,
    insuranceCover:String,
    opendays:Array
  },{collection:'clinics'});

mongoose.model('clinic',clinic);


// is the environment variable, NODE_ENV, set to PRODUCTION? 


 mongoose.connect('mongodb+srv://zl1941:zl1941@ait-dzhzk.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
//mongodb+srv://zl1941:zl1941@ait-dzhzk.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://zl1941:<password>@ait-dzhzk.mongodb.net/test?retryWrites=true&w=majority
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

db.users.insert({
  id:"user",
  password:"pass"
})
*/

