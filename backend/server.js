"use strict";
console.log("Initializing Server...");
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
  console.log("Connecting to MySQL Database...");
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
    each channel contains - id, channelName, description{maybe members? idk}
    POST TABLE:
    each post contains - id, topic, data, channelID, userID, thumbsUp, thumbsDown
    REPLY TABLE: 
    each reply contains - id, postId, comment, replies{}, thumbsUp, thumbsDown

    TO IMPLEMENT NOTES:
    - added search mehanisms for users and their data
    - admin mode only accessible screen (user = admin, pass = admin)
  */

  // initialize the table for the User Accounts
  connection.query(
    `CREATE TABLE IF NOT EXISTS users
    (id int unsigned NOT NULL auto_increment,
    name varchar(1000) NOT NULL,
    userId varchar(1000) NOT NULL,
    password varchar(1000) NOT NULL,
    numPosts int unsigned NOT NULL,
    numLikes int unsigned NOT NULL,
    numDislikes int unsigned NOT NULL,
    numReplies int unsigned NOT NULL,
    PRIMARY KEY (id)
    )`,
    function (error, result) {
      if (error) console.log(error);
    }
  );

  // Initialize an administrator account for advanced modification
  var query = `INSERT IGNORE INTO users (name, userId, password) VALUES ('Administrator', 'admin', 'admin' )`;
  connection.query(query, function (error, result) {
    if (error) console.log(error);
  });

  // initialize the table for the Channels in the Server
  connection.query(
    `CREATE TABLE IF NOT EXISTS channels
    (id int unsigned NOT NULL auto_increment,
    channelName varchar(1000) NOT NULL,
    description varchar(3000) NOT NULL,
    PRIMARY KEY (id)
    )`,
    function (error, result) {
      if (error) console.log(error);
    }
  );
});

/* Login */
app.post("/login", (req, res) => {
  var userId = req.body.userId;
  var password = req.body.password;

  connection.query(`SELECT * FROM users`, function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      if (
        (result[i]["userId"] == userId) &
        (result[i]["password"] == password)
      ) {
        var user = {
          id: result[i]["id"],
          name: result[i]["name"],
          userId: result[i]["userId"],
          password: result[i]["password"],
          numPosts: result[i]["numPosts"],
          numLikes: result[i]["numLikes"],
          numDislikes: result[i]["numDislikes"],
          numReplies: result[i]["numReplies"],
        };
        res.json(user);
        console.log("Login Successful.");
        return;
      }
    }
    res.status(404).json("Incorrect Username or Password.");
  });
});

/* Sign Up */
app.post("/signup", (req, res) => {
  var name = req.body.name;
  var userId = req.body.userId;
  var password = req.body.password;

  if (!(name == "" || userId == "" || password == "")) {
    // Check if UserID and Name already exists
    connection.query(`SELECT * FROM users`, function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if ((result[i]["userId"] == userId) & (result[i]["name"] == name)) {
          res.status(404);
          return;
        }
      }
    });

    var query = `INSERT IGNORE INTO users (name, userId, password) VALUES ('${name}', '${userId}', '${password}')`;

    connection.query(query, function (error, result) {
      if (error) console.log(error);
      else {
        res.status(200);
        console.log("Account Successfully Created...");
        return;
      }
    });
  }
  res.status(404);
  return;
});

/* Channel */
app
  .route("/channel")
  .post((req, res) => {
    var channelName = req.body.channelName;
    var description = req.body.description;

    if (!(channelName == "" || description == "")) {
      var query = `INSERT INTO channels (channelName, description) VALUES ('${channelName}', '${description}')`;

      connection.query(query, function (error, result) {
        if (error) console.log(error);
        else res.status(200);
        return;
      });
    }
    res.status(404);
  })
  .get((req, res) => {
    var channelList = [];
    connection.query(`SELECT * FROM channels`, function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        channelList.push({
          id: result[i]["id"],
          channelName: result[i]["channelName"],
          description: result[i]["description"],
        });
      }
      res.json(channelList);
    });
  });

app.use("/", express.static("."));

app.listen(PORT, HOST);

console.log("System Active...");
