var m = require('mraa');
var async = require('async');
 inputs = [ { pin: 'p1', value: 1 }, { pin: 'p2', value: 0 }, { pin: 'p3', value: 1 },{ pin: 'p4', value: 0 },{ pin: 'p5', value: 1 }];

 
 
 //// <Express> /////
 
 var express = require('express');  
 var app = express();
 
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.render('/views/index.html');
});

app.get('/inputs/:id', function(req, res){
 res.send(inputs[req.params.id]); 
});   
 
 app.get('*', function(req, res){ 
 	res.send('Unrecognised API call').status(404);
 	 });  
 app.use(function(err, req, res, next){ 
 	if (req.xhr) { res.send('Oops, Something went wrong!').status(500); 
 } 
 else { 
 	next(err); 
 } 
});
 app.listen(8080); 
 console.log('Server running on port 8080');
 
 //////// </Express> /////////
 
 /////////< Setting pins> ///////
 
 async.parallel([
    function(callback) {
       var Pin1 = new m.Gpio(1); 
        Pin1.dir(m.DIR_IN);
    },
    function(callback) {
        var Pin2 = new m.Gpio(2); 
        Pin2.dir(m.DIR_IN);
    },
    function(callback) {
        var Pin3 = new m.Gpio(3); 
        Pin3.dir(m.DIR_IN);
    },
	function(callback) {
        var Pin4 = new m.Gpio(4); 
        Pin4.dir(m.DIR_IN);
    },
	function(callback) {
        var Pin5 = new m.Gpio(5); 
        Pin5.dir(m.DIR_IN);
    },
], function(err, results) {
    console.log('Pins set up');
    read();
});
 
 //////// </Setting Pins> //////
 
 
 ///////// <Reading Pins> ///////
 function read() {
   
       
            readPins(1);
        
       
            readPins(2);
        
       
            readPins(3);
        
        
            readPins(4);
        
       
            readPins(5);
        
   
        console.log('Read complete');
       
   
}


function readPins(pin){
	
	
	switch(pin) {
    case 1:
        pinStat = Pin1.read();
        break;
    case 2:
         pinStat = Pin2.read();
        break;
    case 3:
         pinStat = Pin3.read();
    break;

    case 4:
         pinStat = Pin4.read();
        break;
    case 5:
         pinStat = Pin5.read();
        break;  

    default:
        console.log('error');



        //Encode Input variable JSON here

}
	
}
 
 
 setInterval(read,3000);
 
 
 