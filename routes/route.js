const express = require('express'),
      multer = require ('multer');

const upload = multer ({storage : multer.memoryStorage()});
const db = require('../database/dbConnection.js');

const router = express.Router();

router.post('/upload', upload.single('uploaded_file') ,(req, res) => {
      var img = req.file.buffer.toString('base64');
      var lat = req.body.latitude;
      var lon = req.body.longitude;
      var city = req.body.city;
      //POSTA SUL DATABASE LE FOTO
      var q = 'INSERT INTO inquinamento VALUES (NULL , ? , ? , ? , ? )';
      db.connection.query( q , [img , lat , lon , city] , (err , rows , fields)=>{
        res.render('index');
      });
});

router.get('/' , function(req , res){
  res.render('index');
});

router.get('/gallery' , function(req , res){
  var q = 'SELECT * FROM inquinamento ORDER BY ID DESC;'
  var file = db.connection.query(q , (err , rows , fields)=>{
    res.render('gallery' , {files : rows});
  });
});

router.get('/position' , (req , res)=>{
  var lat = req.query.latitude;
  var lon = req.query.longitude;
  var q = 'SELECT * FROM inquinamento WHERE LAT BETWEEN '+(Number(lat)-1)+' AND '+(Number(lat)+1)+' AND LON BETWEEN '+(Number(lon)-1)+' AND '+(Number(lon)+1);
  db.connection.query(q , (err , rows , fields)=>{
    res.render('near' , {files : rows});
  });
});

module.exports = router;
