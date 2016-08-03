
//initializing express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
    res.render('index');
});

app.get('/scraper', function(req, res){

    //run request to grab the site's data
    request('http://www.recode.net/', function(error, response, html){

        //load html into cheerio
        var $ = cheerio.load(html);

        var result = [];

        $('h2.c-entry-box__title').each(function(i, element){
            var title = $(this).text();
            var link = $(element).children().attr('href');
            var img = $('#c-entry-box_image').children().attr('src');
            //var comment = $('<form>');
            result.push({
                Title: title,
                Link: link
            });
        });

        //db.scrapedData.update({"Title": [Title]}, {$set: {"Title": [Title]}, {"Link": [Link]}});
        res.send(result);
    });
});

//posting data to mongo db
app.post('/submit', function(req, res){
    var article = req.body;


});

app.get('/delete', function(req, res){

})


// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});

