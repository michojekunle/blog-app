const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const dotenv = require('dotenv');
require('dotenv').config()
// console.log(process.env.SECRET_KEY);




//Database to Connect with Knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password: process.env.DB_PASS,
      database : 'blog-Db'
    }
  });

db.select('*').from('users').then(users => { console.log(users) })
const Users = [ 
  {
    fullname: "Michael O.",
    email: "mich@gmail.com",
    password: "sweet"
  },
  {
    fullname: "Mich Amd",
    email: "amd@gmail.com",
    password: "sweetly"
  },
 ];
 
// //root route
// router.get('/', (req, res) => {
//     db.select('*').from('users').then(users => res.json(users))
// })

// //Sign-In Route
// router.post('/signin', (req, res) => {
//     const { password } = req.body;
//     db.select("email", "hash")
//         .from("login")
//         .where("email", "=", req.body.email)
//         .then(data => {
//             console.log(data[0])
//             const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//             console.log(isValid);
//             if (isValid) {
//                 return db
//                 .select("*")
//                 .from("users")
//                 .where("email", "=", req.body.email)
//                 .then((users) => {
//                     res.json(users[0]);
//                 })
//                 .catch((err) => res.status(400).json("unable to get user"));
//             } else {
//                 res.status(400).json("1 wrong credentials");
//             }
//         })
//         .catch((err) => res.status(400).json("2 wrong credentials"));
// });

// //Sign Up route 
// router.post('/signup', (req, res) => {
//     const { fullname, email, password} = req.body;
//     const hash = bcrypt.hashSync(password);
    
//     db.transaction((trx) => {
//         trx.insert({
//             hash: hash,
//             email: email
//         }).into('login').returning('email').then(loginEmail => {
//            return trx('users').returning('*').insert({
//                     fullname: fullname,
//                     email: loginEmail[0].email
//                 })
//                 .then(users => {
//                         res.json(users[0])
//                 })
//             })
//                 .then(trx.commit)
//                     .catch(trx.rollback);
//         }).catch(err => { res.status(400).json("unable to register")})
// });

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


router.post('/signup', function(req, res){
  if(!req.body.fullname || !req.body.email || !req.body.password){
     res.status(400).json("Invalid details!");
  } else {

     Users.filter((user) => {
        if(user.email === req.body.email){
           res.status(400).json({
              message: "User Already Exists!"});
        }
     });
     var newUser = {fullname: req.body.fullname, email: req.body.id, password: req.body.password};
     Users.push(newUser);
     req.session.user = newUser;
     res.status(201).json({message: "success", user: req.session.user });
     //  res.redirect('/protected_page');
  }
});


router.post('/signin', function(req, res){
  console.log(Users);
  if(!req.body.email || !req.body.password){
     res.status(400).json({message: "Please enter both email and password"});
  } else {
     Users.filter((user) => {
        if(user.email === req.body.email && user.password === req.body.password){
           user.isOnline = true;
           req.session.user = user;
           res.status(201).json({message: "success", user: req.session.user });
          //  res.redirect('/protected_page');
        }
     });
     res.status(404).json({message: "Invalid credentials!"});
  }
});

router.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });

  res.status(200).json({message: "user logged out", user: req.session.user });
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