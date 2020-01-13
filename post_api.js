var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
app.post('/video1', function (req, res) {
    
    let video = req.body.video;
    let des =  req.body.des;
    console.log(video+" "+des);
    if (!video && !des) {
        return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
       };
    dbConn.query("INSERT INTO video(video, description) values(?,?) ", [video,des], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Record has been added' });
    });
});
 
app.listen(3000, function () {
    console.log('Node app is running on port 2000');
  });