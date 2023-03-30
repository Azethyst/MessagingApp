"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// SQL Database
var mysql = require("mysql");

// connect to database
try {
  var connection = mysql.createConnection({
    host: "database",
    user: "root",
    password: "admin",
  });

  connection.connect();
} catch (e) {
  console.log("Error! Failed to connect to database.");
}

app.use(cors());

/* initializes the MYSQL database and returns the html file */
app.get("/init", (req, res) => {
  connection.query(
    `CREATE DATABASE IF NOT EXISTS project`,
    function (error, result) {
      if (error) console.log(error);
    }
  );

  connection.query(`USE project`, function (error, result) {
    if (error) console.log(error);
  });

  // * NOTES
  /* 
    USER TABLE:
    each user contains - id, name, userId, password, numPosts, numLikes, numDislikes, numReplies
    CHANNEL TABLE:
    each channel contains - id, channelName, {maybe members? idk}
    POST TABLE:
    each post contains - id, topic, data, channelID, userID, thumbsUp, thumbsDown
    REPLY TABLE: 
    each reply contains - id, postId, comment, replies{}, thumbsUp, thumbsDown

    TO IMPLEMENT NOTES:
    - added search mehanisms for users and their data
    - admin mode only accessible screen (user = admin, pass = admin)
  */

  connection.query(
    `CREATE TABLE posts
    (id int unsigned NOT NULL auto_increment,
    topic varchar(15000) NOT NULL,
    data varchar(15000) NOT NULL,
    PRIMARY KEY (id)
    )`,
    function (error, result) {
      if (error) console.log(error);
    }
  );
});

/*  The post request that updates the posts on
    the site from the button click */
app.post("/addPost", (req, res) => {
  var topic = req.body.topic;
  var message = req.body.data;

  if (!(topic == "" || message == "")) {
    var info = { topic: topic, data: message };
    var query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${message}')`;

    connection.query(query, function (error, result) {
      if (error) console.log(error);
      else res.json(info);
    });
  }
});

app.get("/getPost", (req, res) => {
  var postList = [];
  //Select all posts and read each of the items:
  connection.query(`SELECT * FROM posts`, function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      postList.push({
        id: result[i]["id"],
        topic: result[i]["topic"],
        data: result[i]["data"],
      });
    }
    res.json(postList);
  });
});

app.use("/", express.static("."));

app.listen(PORT, HOST);

console.log("up and running");
