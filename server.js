const express = require('express'),
      multer = require ('multer'),
      mysql = require('mysql');

const router = require('./routes/route.js');

var app = express();

app.use(router);

app.set('view engine' , 'ejs');

app.use('/css' , express.static('views/css'));
app.use('/js' , express.static('models/js'));
app.use('/uploads' , express.static('src/uploads'));

app.listen(8080);
