var http = require('http');
var m = require('mraa'); //require mraa
var fs = require('fs');

var galileoInterval;
var targetPin = 9;
var galileoIntervalTime = 1000;
var byte = 0;

var myDigitalPin = new m.Gpio(9); //setup digital read on pin 5
myDigitalPin.dir(m.DIR_IN); //set the gpio direction to output

http.createServer(serverHandler).listen(8000);


function serverHandler(req, res) {
    console.log("serverHandler() - Request Received!");
    var url = req.url;
    console.log(url);

    if (url !== "/favicon.ico") {
        switch(url){
		 case "/?command=getReq": 
                clearInterval(galileoInterval);
               Pin9 = myDigitalPin.read(); //set the digital pin to high (1)
                break;

        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Pin 9 is ' + Pin9);
    }
}

function galileoLoopHandler() {
    console.log("galileoLoopHandler()");
    myDigitalPin.write(byte ^= 1);
}

