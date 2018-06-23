var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
var Request = require('request');
var FileData = require('./files')
var index = require('./routes/index');
var rooms = require('./routes/rooms');
var generate = require('./generate-room');
var tempdb = require('./tempdb');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// app.post('/enter_room', function (req, res, next) {
//   //console.log(req);
//   var room_id = generate.generateRoom();
//   //res.status(200).send(room_id);
//   res.redirect('/rooms/' + room_id);
// });

app.get('/new_room', (req,res,next) => {
    var room_id = generate.generateRoom()
    res.status(200).send(room_id)
})

app.post('/save_data', (req, res, next) => {
    
    var roomId = req.body.roomId;
    var code = req.body.code;
    var lang = req.body.lang;
    var input = req.body.input;
     
    tempdb.saveData(roomId, lang, code, input);
    console.log('returning saved code from db',tempdb.getData(roomId));
    res.status(200).send('Success');
}) 
  
app.post('/get_data', (req, res, next) => { 

  console.log('inside getdata',req.body);
  tempdb.printData();
  console.log('sending data rom server', tempdb.getData(req.body.roomId));
  res.status(200).send(tempdb.getData(req.body.roomId)); 
 
})
  
app.post('/run', function (req, res) {
   
  var data;
  console.log('input data',req.body);
  new Promise(function(resolve, reject){
    
    Request.post({
      url: 'https://api.judge0.com/submissions?wait=true',
      body: JSON.stringify(req.body),
      headers: {'content-type': 'application/json'},
    }, function (error, response, body) {
      if (error) {
        console.log(error);
        resolve(); 
      }
        console.log('body',body);
        data = body;
        resolve();
    });
  }).then(function(){
    res.send(data);
  });
  
  // console.log(data);
  
});

app.get('/files', (req,res,next) => {

  // var sha = "2e1dd52c3bbc4b0f165140da3a35c9b8f6f59d88"
  // new Promise(function(resolve, reject){
    
  //   Request.get({
  //    // url: 'https://api.github.com/repos/meghansh36/basics-intern/branches/master',
  //    url: "https://api.github.com/repos/meghansh36/basics-intern/git/trees/adb47c194ee6a92ad239f45a09945e8ee44f90e2?client_id=84824e2e6f532187cf11&client_secret=ba3d413076758abf7af6a283f01a10ff3ad668e2",
  //     headers: {'User-Agent': 'meghansh36'}
  //   }, function (error, response, body) {
  //     if (error) {
  //       reject(error);
  //     }
  //       // console.log('body',body);
  //       data = body;
  //       resolve();
  //   });
  // }).then(function(){
  //   res.json(JSON.parse(data));
  // }).catch(e => console.log(e));

  new Promise(function(resolve,reject){
    var files = FileData.startfile();
    if(files){
      resolve(files)
    }
    else{
      reject("error")
    }
  }).then(files => {
    //console.log(files)
    res.json(files)
  }).catch(e => res.send(e))
});


// app.use('/', index);
// app.use('/rooms/:id', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
