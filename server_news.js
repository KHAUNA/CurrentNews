var express = require('express');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require('morgan');
var path = require('path')


var PORT = process.env.PORT || 8080;

var db = require("./models")

//start our express app and use
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logger
app.use(logger("dev"));

//use routes from routes.js
var routes = require("./controller/routes.js");
app.use(routes);

//using handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//connect to mongodb
// mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";

mongoose.connect(MONGODB_URI);



//================SCRAPER=================//

// axios.get("https://www.ajc.com/news/atlanta-news/").then(function(response){
//     var $ = cheerio.load(response.data)
//     $("li.tease").each(function(i, element){
//         var headline = $(element).find("h3").;
//         console.log(headline)
//     });
// });

axios.get("https://slickdeals.net").then(function(response) {
  var $ = cheerio.load(response.data);
  $("a.itemTitle").each(function(i, element) {
    var entry = {}
    entry.title = $(element).attr("title");

      db.Article.create(entry).then(function(data){
      }).catch(function(err){
          // console.log(err.message)
      });
  });
});

app.get("/", function(req, res){
  db.Article.find({}).then(function(dbData){
    // console.log(dbData); 
    var hdbsObj = {
      data: dbData
    }
    res.render("index", hdbsObj)
    // res.json({data: dbData})
  }).catch(function(err){
    res.json(err) 
  });
});

app.get("/markfavorited/:id", function(req, res){
  console.log(`req.params ${req.params.id}`)
  res.json(req.params.id);
  // return db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {favorited: true}});
});

app.get("/favorited", function(req, res){

  return db.Article.find({ favorited: true});
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });