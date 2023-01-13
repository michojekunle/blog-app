const express = require('express');
const router = express.Router();

const blogs = [
    {id: "1", name: "Hello World In Javascript"},
    {id: "2", name: "Hello World In Python"},
    {id: "3", name: "Hello World In Java"},
    {id: "4", name: "Hello World In C#"},
]

router.get('/', (req, res) => {
    res.send("Welocome Back to Express Revision.")
})

router.get('/blogs/all', (req, res) => {
    res.json(blogs)
})

router.all('*', (req, res) => {
    //Create an error and pass it to the next function
   var err = new Error("Something went wrong");
   next(err);
})

//An error handling middleware
router.use(function(err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
 });


module.exports = router;