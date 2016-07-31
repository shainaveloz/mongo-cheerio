
//initializing express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//requiring request and cheerio
var request = require('request');
var cheerio = require('cheerio');

//configuring app for use with body-parser
app.use(bodyParser.urlencoded({
	extended: false
}));

// static file support with public folder
app.use(express.static('public'));

//database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

//makes sure that any errors encountered is logged
db.on('error', function(err) {
  console.log('Database Error:', err);
});

//Main route
app.get('/', function(req, res){
    res.send('Hello! Welcome to Tech Insider!');
});

app.get('/scraper', function(req, res){

    //run request to grab the site's data
    request('http://www.recode.net/', function(error, response, html){

        //load html into cheerio
        var $ = cheerio.load(html);

        var result = [];

        $('h2.c-entry-box__title').each(function(i, element){
            var title = $(this).text();
            var link = $(element).parent().attr('href');
            result.push({
                Title: title,
                Link: link
            });
        });

        res.send(result);
    });
});

// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});

