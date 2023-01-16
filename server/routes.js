const express = require('express');
const session = require('express-session')
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
require('dotenv').config()
// console.log(process.env.SECRET_KEY);
router.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
 }))



//Database to Connect with Knex
const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB
    }
  });

// //Profile Route
// router.get('/profile/:id', (req, res) => {
//     const { id } = req.params;

//     db.select('*')
//     .from('users')
//     .where({
//         id: id
//     })
//     .then(users => {
//         console.log(users[0])
//         res.json(users[0])
//     })
// })



router.get('/', (req, res) => {
    res.send("Welocome Back to Express Revision.")
})

const checkIfExists = function(email) {
   let exists = false;
  
}

router.post('/signup', function(req, res){
   const { fullname, email, password } = req.body;

  if(!fullname || !email || !password){
      console.log("Invalid Details!!")
      res.status(400).json("Invalid details!");
  } else{
      let exists = false
      db.select('*').from('users').then(users => {
         users.forEach((user) => {
            if(user.email === email){
                 exists = true
            }
         });

         if(exists){
            res.status(400).json({message: "User Already Exists!"});
            console.log("User Already Exists");  
         } else {
            console.log("User Details Confirmed Checking if User Exists in Database...");
               //Create A New User 
               const hash = bcrypt.hashSync(password);
               console.log("Creating New User...")
               db.transaction((trx) => {
                  trx.insert({
                      hash: hash,
                      email: email
                  }).into('login').returning('email').then(loginEmail => {
                     return trx('users').returning('*').insert({
                              fullname: fullname,
                              email: loginEmail[0].email,
                          })
                          .then(users => {
                                 req.session.user = users[0];
                                  //New User Created sends response back  
                                  console.log("New User Created...")
                                  res.status(201).json({message: "success", user: req.session.user });
                          })
                      })
                        .then(trx.commit)
                        .catch(trx.rollback);
                  }).catch(err => {console.log(err); res.status(400).json("Unable to register")});
         }
      })
   }
});


router.post('/signin', function(req, res){
  const { email, password } = req.body;
  if(!email || !password){
     res.status(400).json({message: "Please enter both email and password"});
  } else {
      db.select("email", "hash")
            .from("login")
            .where("email", "=",email)
            .then(data => {
                  console.log(data[0])
                  const isValid = bcrypt.compareSync(password, data[0].hash);
                  console.log(isValid);
                  if (isValid) {
                     return db
                     .select("*")
                     .from("users")
                     .where("email", "=",email)
                     .then((users) => {
                        req.session.user = users[0];
                        res.status(200).json({ message: "success", user: req.session.user});
                     })
                     .catch((err) => res.status(400).json({message: "unable to get user"}));
                  } else {
                     res.status(400).json({ message: "Wrong credentials"});
                  }
            })
            .catch((err) => res.status(400).json({message: "2 wrong credentials"}));
  }
});

router.post('/signout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });

  res.status(200).json({message: "user logged out", user: [] });
});

router.all('*', (req, res) => {
    //Create an error and pass it to the next function
   var err = new Error("Something went wrong");
   next(err);
})

//An error handling middleware
router.use(function(err, req, res, next) {
    res.status(500).json("Oops, something went wrong.")
 });

module.exports = router;