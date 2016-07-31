
//initializing express app
var express = require('express');
var app = express();

//requiring request and cheerio
var request = require('request');
var cheerio = require('cheerio');

//database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

//Main route
app.get('/', function(req, res){
    res.send('Hi');
});

