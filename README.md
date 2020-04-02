# Flex Physical Therapy Appointment System

## Overview

I have a VR Physical Therapy project on doing. It is a software help reform remote physical therapy. A link here if you are interested in the idea : https://flexvr.net. So to facilitate this, I want to build a log-in and appointment system for patients. 

Flex system can let patients search for their nearby or wanted physical therapist and then make appointments. Therapists can see their await patients with their basic health condition and infos to get idea ahead of meeting. 

And for single users, they can put in their preference to get a customized kit from us. 


## Data Model

The application will store patients, therapists, basic health information, Lists and Items
* users will have authentification as well as the therapists
* patients will be able to filter stored data of clinic and therapists. With images and UI presenting. 
* users can make multiple appointments in table, and view their appointments
* therapist can see their awaiting patients in table and according data


An Example patient:

```javascript
{
  firstName: "chloe",
  lastName:"Li",
  password: "xxxxxx",// a password hash,
  appointmentList: [{Obj-id-14535, ref to appointmentList}]
  gender:"female",
  age:"20",
  need:"knees",
  message:"I need therapy to recover from a surgery for my knees "
}
```

An Example List of appointments:

```javascript
{
  firstName: "Chloe",
  lastName: "Li",
  items: [
    { clinic: "nycPT", therapist: "bill cane", year:"2020",month:"5",day:"1"},
    { clinic: "city recovery", therapist: "julie rales", year:"2020",month:"6",day:"1"},
  ]
}
```
An Example therapist:

```javascript
{
    name:"julie rales",
    gender:"female",
    specialty:"legs, knees",
    availability:"2020/6/1", "2020/6/2","2020/6/3","2020/6/4" //... like an calender
}
```

## [Link to Commented First Draft Schema](db.js) 


## Wireframes

/search - page to search and present all therapists

![list create](documentation/search.jpg)

/myAppt - page for patient to see all upcoming appointment and make adjustments

![list](documentation/myAppt.jpg)

/myInfo - page for patient's information

![list](documentation/myInfo.jpg)

/myPatient - page to show patient in list for therapists

![list](documentation/myPatient.jpg)

## Site map


Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

