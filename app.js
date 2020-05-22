//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "A daily journal for you where you can add data to your home page using route : /compose";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

// desc : home route, displays all content created at "/compose" route.
app.get("/", function(req, res) {
  res.render("home", {startingContent : homeStartingContent, posts : posts});
})

// desc : about route
app.get("/about", function(req, res) {
  res.render("about", {startingContent : aboutContent});
})

// desc : contact route
app.get("/contact", function(req, res) {
  res.render("contact", {startingContent : contactContent});
})

//desc : Compose route to create new content for home route.
app.get("/compose", function(req, res) {
  res.render("compose");
})

//desc : creates a new post and displays at home route.
app.post("/compose", function(req, res) {
  const {textToPublish, title} =  req.body;
  
  const post = {
    title : title,
    textToPublish : textToPublish
  };
  
  posts.push(post);
  res.redirect("/");
})

// desc : checks if post available and displays the page with only that title.
// Stand Alone Page.
app.get("/:posts/:postTitle", function(req, res) {
  
  console.log(_.lowerCase(req.params.postTitle));
  posts.forEach( function (foundPost) {
    if(_.lowerCase(foundPost.title) === _.lowerCase(req.params.postTitle)) {  
      res.render("post", {title : foundPost.title, startingContent : foundPost.textToPublish}); 
    } 
    // else {
    //   res.render("post", {title : "Sorry, Post not found ..!", startingContent : " "});
    // }
  });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
