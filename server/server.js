const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer()
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

const routes = require('./routes')

app.use('/', routes)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is running on port %s`, PORT)
})