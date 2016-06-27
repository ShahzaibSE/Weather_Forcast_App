/// <reference path="./../typings/tsd.d.ts"/>

//Import Libraries.
import express = require('express');
import bodyparser = require('body-parser');
import qs = require('querystring');
import path = require('path');
import request = require('request');

//Express Instance.
var app : express.Express = express();

//Confuring Server.
var port = process.env.PORT|3000;
var server = app.listen(port,function(){
    var listening_port = server.address().port;
    console.log(`Listening on : ${listening_port}`);
})

//Weather Forcast API.
var API_KEY = "5c13074bb89bab5807f4cbcf44b8f";

//Request URL.
var reqURL = "https://api.worldweatheronline.com/free/v2/weather.ashx?q=new+york&num_of_days=5&key=5c13074bb89bab5807f4cbcf44b8f&tp=24&format=json";


function dayOfWeekAsString(dayIndex) {
    return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][dayIndex];
}

app.get('/',function(req,res){
      request(reqURL, function (error, response, body) {
          //console.log(response);
        if (!error && response.statusCode == 200) {

            // parse the json result
            var result = JSON.parse(body);

           // generate a HTML table
           var html = '<table style="font-size: 10px; font-family: Arial, Helvetica, sans-serif">';

           // loop through each row
           for (var i = 0; i < 3; i++) {
               html += "<tr>";
               result.data.weather.forEach(function(weather) {
                   html += "<td>";
                   switch (i) {
                       case 0:
                           html += dayOfWeekAsString(new Date(weather.date).getDay());
                           break;
                       case 1:
                           html += weather.hourly[0].weatherDesc[0].value;
                           break;
                       case 2:
                           var imgSrc = weather.hourly[0].weatherIconUrl[0].value;
                           html += '<img src="'+ imgSrc + '" alt="" />';
                           break;
                  }
                  html += "</td>";
              });
              
              html += "</tr>";
          }

          res.send(html);
        } else {
           console.log(error, response.statusCode, body);
        }
        res.end("");
    });
})