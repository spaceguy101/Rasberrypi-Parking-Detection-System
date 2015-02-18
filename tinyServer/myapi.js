var http = require('http');
 var express = require('express');  
 var app = express();
 var favicon = require('serve-favicon');
 var fs = require('fs');
 var sys = require('sys');

 var inputs = [ { pin: '1', value: 1 }, { pin: '2', value: 0 } ];

 

 app.use(express.logger());
   app.set("view options", {layout: false});
    app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.render('/views/index.html');
});


 // Express route for incoming requests for a customer name 
app.get('/inputs/:id', function(req, res){
 res.send(inputs[req.params.id]); 
});   
 // Express route for any other unrecognised incoming requests 
 app.get('*', function(req, res){ 
 	res.send('Unrecognised API call').status(404);
 	 });  
 // Express route to handle errors 
 app.use(function(err, req, res, next){ 
 	if (req.xhr) { res.send('Oops, Something went wrong!').status(500); 
 } 
 else { 
 	next(err); 
 } 
});

 app.listen(3000); 
 console.log('App Server running at port 3000');