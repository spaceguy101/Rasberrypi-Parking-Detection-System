var gpio = require('rpi-gpio');

if (typeof window === 'undefined') { // Running in NodeJS
  var domino=require('domino');
  var $=require('jquery')(domino.createWindow());
  var XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest;
  $.support.cors=true; // cross domain
  $.ajaxSettings.xhr=function(){return new XMLHttpRequest();};
}

d= new Date();
var express = require('express');   
var app = express();

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600
}, false); 
timer= 0 ;
parked = 'false';
data1 = '';
billData ={number:"NotParked", time:'NA', bill:'NA', phone:'918888087807'};


serialPort.open(function (error) {
 parked = 'false';
      console.log(' serial port open');
    serialPort.on('data', function(data) {
    data1 = data1 + data;
	setTimeout(function(){ console.log('data received: ' + data1);
		console.log(data1 !== '');
		
if(data1 !== ''){
	if(parked == 'false'){
		billData.number ="MH12-7707";
		t = setInterval(function () {timer++}, 1000);
		billData.time = "Started at :" + d.toLocaleTimeString();
		billData.bill = "Started at :" + d.toLocaleTimeString();
		parked = 'true';
		
}
else if (parked == 'true'){
		billData.number = "MH12-7707";
		billData.time = (timer) + " sec" ;
		billData.bill = "₹ " + 1/4*(timer);
		clearInterval(t);
		parked = 'false';
		var phoneNumber = billData.phone;
		msg = 'Your Vehicle '+billData.number+' Parking Bill is : ' + billData.bill + ' for Time Period of : '+billData.time;
		msgSend(phoneNumber,msg);
}
}
data1 = '';
	
	},1000);
     
    });

});

 inputs = [ { pin: 'p1', value: 0 }, { pin: 'p2', value: 1 }, { pin: 'p3', value: 1 },{ pin: 'p4', value: 0 },
 			 {pin: 'p5', value: 0 }, {pin: 'p6', value: 0 },  {pin: 'p7', value: 0 }, {pin: 'p8', value: 0 },
 			 	 {pin: 'p9', value: 0 }, {pin: 'p10', value: 0 },{pin: 0, value: 0}];

gpio.setPollFrequency(500);
 
 

 
app.engine('html', require('ejs').renderFile);
   app.set("view options", {layout: false});
app.use(express.static(__dirname + '../views'));

app.get('/', function(req, res){
    res.render('../views/index.html');
});



app.get('/admin', function(req, res){
     res.send("'<head> <style>body{background:linear-gradient(90deg, #abbaab 10%, #ffffff 90%);}table, th, td {border: 1px solid black;}</style> <meta http-equiv="+"refresh"+" content= "+"5"+" > </head><table style="+"font-size:55px;border:1px;"+"><tr><th>Vehicle No.</th><th >Time</th><th>Bill (Rupees)</th></tr><tr><td >_____________</td><td>____________</td><td>______________</td></tr><tr><td id='number'>"+billData.number+"</td><td id='time'>"+billData.time+"</td><td id='bill'>"+billData.bill+"</td></tr><tr><td >MH12-001</td><td>88 sec</td><td>₹ 23</td></tr><tr><td >MH12-002</td><td>68 sec</td><td>₹ 17</td></tr><tr><td >MH12-003</td><td>45 sec</td><td> ₹ 15</td></tr></table>'");
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
 app.listen(80); 
 console.log('Server running on port 8080');
 




 gpio.setup(11, gpio.DIR_IN, function () {
	
    gpio.read(11, function(err, val) {
        if(val === true) inputs[1].value = 1;
        else inputs[1].value = 0;

    });
}
);

gpio.setup(12, gpio.DIR_OUT, function () {
    gpio.write(12, false, function(err) {
        if (err) throw err;
        
    });
});

gpio.setup(13, gpio.DIR_OUT, function () {
    gpio.write(13, false, function(err) {
        if (err) throw err;
        
    });
});
	
gpio.setup(15, gpio.DIR_OUT, function() {
    gpio.write(15, false, function(err) {
        if (err) throw err;
        
    });
});



function read_p1(){
	setS1(0);
	setS2(0);
	setS3(0);
	
	gpio.read(11, function(err, val) {
        if(val === true) inputs[0].value = 1;
        else inputs[0].value = 0;
	console.log( 'p1 '  +val);
	});
		
	
}

function read_p2(){
	setS1(0);
	setS2(0);
	setS3(1); //lsb
	
	gpio.read(11, function(err, val) {
        if(val === true) inputs[1].value = 1;
        else inputs[1].value = 0;
	console.log( 'p2 '  +val);
	});
		
	
}

function read_p3(){
	setS1(0);
	setS2(1);
	setS3(0);
	
	gpio.read(11, function(err, val) {
        if(val === true) inputs[2].value = 1;
        else inputs[2].value = 0;
	console.log( 'p3 '  +val);
	
	});
	
}

function read_p4(){
	setS1(0);
	setS2(1);
	setS3(1);//lsb
	
	gpio.read(11, function(err, val) {
        if(val == true) inputs[3].value = 1;
        else inputs[3].value = 0;
	console.log( 'p4 '  +val);
	});
	

}




function setS1 (a){
	
	if(a == 1){
	 gpio.write(12, true, function(err) {
        if (err) throw err;      
    });
	}
	else if(a == 0){
		 gpio.write(12, false, function(err) {
        if (err) throw err;      
    });
	}
}

function setS2 (a){
	
	if(a == 1){
	 gpio.write(13, true, function(err) {
        if (err) throw err;      
    });
	}
	else if(a == 0){
		 gpio.write(13, false, function(err) {
        if (err) throw err;      
    });
	}
}

function setS3 (a){
	
	if(a == 1){
	 gpio.write(15, true, function(err) {
        if (err) throw err;      
    });
	}
	else if(a == 0){
		 gpio.write(15, false, function(err) {
        if (err) throw err;      
    });
	}
}



 var interval = setInterval(function(){

read_p1();
setTimeout(function(){read_p2()},1100);
setTimeout(function(){read_p3()},2200);
setTimeout(function(){read_p4()},3300);


},3500);

function msgSend(number,msg){
$.ajax({
							url: "http://www.api.notificatio.me/v1/user/message",
							type: "POST",
							dataType: "json",
							crossDomaint: true,
							data: {
								phoneNumber: number,
								apiHash: "48cabb00-91f7-4954-a1c7-254800ed8649",
								message: msg
							},
							cache: false,
							success: function() {
								console.log('msg sent '+msg+ ' To '+number);
							},
							error: function(error) {
								console.log('Error to send msg');
							}
						});
}
