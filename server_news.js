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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logger
app.use(logger("dev"));

//use routes from routes.js
var routes = require("./controller/routes.js");

//didnt end up using routes as intended, left code up regardless
app.use(routes);

//using handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//connect to mongodb
// mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



//================SCRAPER=================//

// axios.get("https://www.ajc.com/news/atlanta-news/").then(function(response){
//     var $ = cheerio.load(response.data)
//     $("li.tease").each(function(i, element){
//         var headline = $(element).find("h3").;
//         console.log(headline)
//     });
// });


db.Article.deleteMany({ favorited: false})
// axios.get("https://politics.theonion.com/").then(function (response){
//   var $ = cheerio.load(response.data);
//   $("a.js_entry-link").each(function(i, element){
//     let entry = {};
//     entry.title = $(element).text();
//     entry.link = $(element).attr("href");
//     console.log(entry)
//     db.Article.create({entry}).then(function(dbData){
//       console.log("added data to database")
//     }).catch(function(err){
//       console.log(err)
//     })
//   })
// })


axios.get("https://slickdeals.net/").then(function (response) {
  var $ = cheerio.load(response.data);
  $("a.itemTitle").each(function (i, element) {
    var entry = {}
    entry.title = $(element).attr("title");
    entry.link = $(element).attr("href");
    entry.notes = ""
    db.Article.create(entry).then(function (data) {
    });
  });
});


app.get("/", function (req, res) {
  db.Article.find({}).then(function (dbData) {
    // console.log(dbData); 
    var hdbsObj = {
      data: dbData
    }
    res.render("index", hdbsObj)
  }).catch(function (err) {
    res.json(err)
  });
});

app.get("/markfavorited/:id", function (req, res) {
  // res.json(req.params.id);
  db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { favorited: true } }).then(function (dbData) {
  }).catch(function(err){
    res.json(err)
  })
});

app.get("/favorited", function (req, res) {

  db.Article.find({ favorited: true }).then(function (dbData) {
    let favObj = {
      data: dbData
    }
    res.render("favs", favObj)
  }).catch(function(err){
    res.json(err)
  });
});

app.get("/addnote", function(req, res){

    db.Article.findOneAndUpdate({_id: req.body.articleID}, {$set: {notes: req.body.newNote}}, {new: true}).then(function(dbData){
    // db.Note.findOneAndUpdate({articleID: req.body.artID}, {$push: {notes: dbArticle._}})
    res.json(dbData)
    // db.Article.find({ favorited: true}).then(function(dbData){
    //   let noteObj = {
    //     data: dbData
    //   };
    //   console.log(noteObj)
    //   res.render("favs", noteObj)
    // });
  })
  })

  // db.Note.create({noteEntry}).then(function(dbData){
  //   // db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
  // db.Articles.find({ favorited: true}).then(function(dbData){
  //   let noteObj = {
  //     data: dbData
  //   }
  //   res.render("favs",noteObj)
  // }).catch(function(err){
  //   res.json(err);
  // });
  // }).catch(function(err){
  //   res.json(err);
  // });
// });

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});