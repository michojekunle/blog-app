const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');


//Database to Connect with Knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'me',
      password: process.env.DB_PASS,
      database : 'blogpdb'
    }
  });

// db.select('*').from('users').then(users => { console.log(users) })
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
//                     name: name,
//                     email: loginEmail[0].email,
//                     joined: new Date()
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

router.post('/signup', (req, res) => {
    res.status(200).json('Success')
})

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