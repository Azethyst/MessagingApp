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

/* FUNCTIONS */
const postInsertQuery = `INSERT INTO postMessages (userId, channelName, topic, data, thumbsUp, thumbsDown) VALUES (?, ?, ?, ?, ?, ?)`;
async function insertIntoPosts(data) {
  try {
    // Execute the INSERT query asynchronously
    const info = await connection.query(postInsertQuery, data);

    // Return the result of the INSERT query
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const channelInsertQuery = `INSERT INTO channels (channelName, description) VALUES (?, ?)`;
async function insertIntoChannels(data) {
  try {
    // Execute the INSERT query asynchronously
    const info = await connection.query(channelInsertQuery, data);

    // Return the result of the INSERT query
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const accountInsertQuery = `INSERT INTO users (name, userId, password, numPosts, numLikes, numDislikes, numReplies) VALUES (?, ?, ?, ?, ? ,? ,?)`;
async function insertIntoUsers(data) {
  try {
    // Execute the INSERT query asynchronously
    const info = await connection.query(accountInsertQuery, data);

    // Return the result of the INSERT query
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const replyInsertQuery = `INSERT INTO replies (userId, postReplyId, comment, isForPost, thumbsUp, thumbsDown) VALUES (?, ?, ?, ?, ?, ?)`;
async function insertIntoReplies(data) {
  try {
    // Execute the INSERT query asynchronously
    const info = await connection.query(replyInsertQuery, data);

    // Return the result of the INSERT query
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
/* ------------------------------------------------------------------------------------------- */

/* initializes the MYSQL database and returns the html file */

// Create the Database
connection.query(
  `CREATE DATABASE IF NOT EXISTS project`,
  function (error, result) {
    if (error) console.log(error);
  }
);

// Use the newly created Database
connection.query(`USE project`, function (error, result) {
  if (error) console.log(error);
});

// initialize the table for the User Accounts
connection.query(
  `CREATE TABLE IF NOT EXISTS users
  (id int unsigned NOT NULL auto_increment,
  name varchar(50) NOT NULL,
  userId varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
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

// initialize the table for the Channels in the Server
connection.query(
  `CREATE TABLE IF NOT EXISTS channels
  (id int unsigned NOT NULL auto_increment,
  channelName varchar(50) NOT NULL,
  description varchar(100) NOT NULL,
  PRIMARY KEY (id)
  )`,
  function (error, result) {
    if (error) console.log(error);
  }
);

// initialize the table for the Posts in the Server
connection.query(
  `CREATE TABLE IF NOT EXISTS postMessages
  (id int unsigned NOT NULL auto_increment,
  topic varchar(100) NOT NULL,
  data varchar(200) NOT NULL,
  channelName varchar(50) NOT NULL,
  userId varchar(50) NOT NULL,
  thumbsUp int unsigned NOT NULL,
  thumbsDown int unsigned NOT NULL,
  PRIMARY KEY (id)
  )`,
  function (error, result) {
    if (error) console.log(error);
  }
);

// initialize the table for the Replies in the Server
connection.query(
  `CREATE TABLE IF NOT EXISTS replies
  (id int unsigned NOT NULL auto_increment,
  comment varchar(200) NOT NULL,
  postReplyId int unsigned NOT NULL,
  userId varchar(50) NOT NULL,
  isForPost int NOT NULL,
  thumbsUp int unsigned NOT NULL,
  thumbsDown int unsigned NOT NULL,
  PRIMARY KEY (id)
  )`,
  function (error, result) {
    if (error) console.log(error);
  }
);

// Initialize an administrator account for advanced modification
connection.query(
  `SELECT * FROM users WHERE name = 'Administrator' AND userId = 'admin' AND password = 'admin'`,
  function (err, result, fields) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      var inputs = ["Administrator", "admin", "admin", 0, 0, 0, 0];
      insertIntoUsers(inputs)
        .then((result) => {
          console.log("Administrator Account Successfully Created...");
        })
        .catch((error) => {
          console.error(
            "Error adding Administrator Account INSERT query:",
            error
          );
        });
    }
  }
);

console.log("Tables Initialized...");

// * NOTES
/* 
  USER TABLE:
  each user contains - id, name, userId, password, numPosts, numLikes, numDislikes, numReplies
  CHANNEL TABLE:
  each channel contains - id, channelName, description{maybe members? idk}
  POST TABLE:
  each post contains - id, topic, data, channelID, userID, thumbsUp, thumbsDown
  REPLY TABLE: 
  each reply contains - id, postReplyId, comment, userId, isForPost,thumbsUp, thumbsDown

  TO IMPLEMENT NOTES:
  - added search mehanisms for users and their data
  - admin mode only accessible screen (user = admin, pass = admin)
*/

/*---------------------------------------- METHODS ------------------------------------------------*/

/* Login */
app.post("/login", (req, res) => {
  var userId = req.body.userId;
  var password = req.body.password;

  connection.query(
    `SELECT * FROM users WHERE userId = '${userId}' AND password = '${password}'`,
    function (err, result, fields) {
      if (err) {
        res.status(404).json("Incorrect Username or Password.");
        return;
      }
      if (result.length === 0) {
        res.status(404).json("Incorrect Username or Password.");
        return;
      }
      var user = {
        id: result[0]["id"],
        name: result[0]["name"],
        userId: result[0]["userId"],
        password: result[0]["password"],
        numPosts: result[0]["numPosts"],
        numLikes: result[0]["numLikes"],
        numDislikes: result[0]["numDislikes"],
        numReplies: result[0]["numReplies"],
      };
      res.json(user);
      console.log("Acquired User Stats.");
      return;
    }
  );
});

/* Sign Up */
app.post("/signup", (req, res) => {
  var name = req.body.name;
  var userId = req.body.userId;
  var password = req.body.password;

  if (!(name == "" || userId == "" || password == "")) {
    // Check if UserID and Name already exists
    connection.query(
      `SELECT * FROM users WHERE userId = '${userId}' AND name = '${name}';`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
        if (result.length === 0) {
          var inputs = [name, userId, password, 0, 0, 0, 0];
          insertIntoUsers(inputs)
            .then((result) => {
              console.log("Account Successfully Created...");
              res.send("ok");
              return;
            })
            .catch((error) => {
              console.error("Error executing Account INSERT query:", error);
              res.send("error");
              return;
            });
        } else {
          res.send("error");
          return;
        }
      }
    );
  } else {
    res.send("error");
    return;
  }
});

app.get("/users", (req, res) => {
  connection.query(`SELECT * FROM users`, function (err, result, fields) {
    if (err) {
      res.status(404).json("Cannot get the channels.");
      return;
    }
    res.json(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM users WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.error("Error deleting User:", error);
      res.send("error");
      return;
    }

    console.log("User successfully deleted.");
    res.send("ok");
  });
});

/* Post Methods */
app.post("/postMessage", (req, res) => {
  var userId = req.body.userId;
  var channelName = req.body.channelName;
  var topic = req.body.topic;
  var data = req.body.data;

  if (
    !(
      userId == "" ||
      channelName == "Select Channel" ||
      topic == "" ||
      data == ""
    )
  ) {
    var inputs = [userId, channelName, topic, data, 0, 0];
    connection.query(
      `UPDATE users SET numPosts = numPosts + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          throw err;
        }
      }
    );
    insertIntoPosts(inputs)
      .then((result) => {
        console.log("Post successfully received.");
        res.send("ok");
        return;
      })
      .catch((error) => {
        console.error("Error inserting Post:", error);
        res.send("error");
        return;
      });
  } else {
    console.error("Error inserting Post with Invalid parameters.");
    res.send("error");
    return;
  }
});

app.get("/getPost", (req, res) => {
  connection.query(
    `SELECT * FROM postMessages`,
    function (err, result, fields) {
      if (err) {
        res.status(404).json("Cannot get the channels.");
        return;
      }
      res.json(result);
    }
  );
});

app.post("/post/:channelName", (req, res) => {
  var channelName = req.params.channelName;
  if (channelName != "") {
    try {
      connection.query(
        `SELECT * FROM postMessages WHERE channelName = '${channelName}'`,
        function (err, result, fields) {
          if (err) throw err;
          res.json(result);
          return;
        }
      );
    } catch (error) {
      console.log(error);
      res.json([]);
      return;
    }
  } else {
    console.log("Error: Channel name is not Specified.");
    res.json([]);
    return;
  }
});

app.post("/postEmote/like", (req, res) => {
  var id = req.body.id;
  var userId = req.body.userId;

  try {
    connection.query(
      `UPDATE postMessages SET thumbsUp = thumbsUp + 1 WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
      }
    );
    connection.query(
      `UPDATE users SET numLikes = numLikes + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
        res.send("ok");
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.send("error");
    return;
  }
});

app.post("/postEmote/dislike", (req, res) => {
  var id = req.body.id;
  var userId = req.body.userId;

  try {
    connection.query(
      `UPDATE postMessages SET thumbsDown = thumbsDown + 1 WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
      }
    );
    connection.query(
      `UPDATE users SET numDislikes = numDislikes + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
        res.send("ok");
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.send("error");
    return;
  }
});

app.delete("/post/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    `DELETE FROM postMessages WHERE id = ${id}`,
    (error, result) => {
      if (error) {
        console.error("Error deleting Post:", error);
        res.send("error");
        return;
      }

      console.log("Post successfully deleted.");
      res.send("ok");
    }
  );
});

/* Reply Methods */
app.post("/postReply", (req, res) => {
  var userId = req.body.userId;
  var postReplyId = req.body.postReplyId;
  var comment = req.body.comment;
  var isForPost = req.body.isForPost;
  console.log(isForPost);
  if (!(userId == "" || postReplyId == 0 || comment == "")) {
    var inputs = [userId, postReplyId, comment, isForPost, 0, 0];
    connection.query(
      `UPDATE users SET numReplies = numReplies + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          throw err;
        }
      }
    );
    insertIntoReplies(inputs)
      .then((result) => {
        console.log("Reply successfully received.");
        res.send("ok");
        return;
      })
      .catch((error) => {
        console.error("Error inserting Reply:", error);
        res.send("error");
        return;
      });
  } else {
    console.error("Error inserting Reply with Invalid parameters.");
    res.send("error");
    return;
  }
});

app.get("/replies", (req, res) => {
  connection.query(`SELECT * FROM replies`, function (err, result, fields) {
    if (err) {
      res.status(404).json("Cannot get the channels.");
      return;
    }
    res.json(result);
  });
});

app.post("/reply/:postReplyId/:isForPost", (req, res) => {
  var postReplyId = req.params.postReplyId;
  var isForPost = req.params.isForPost;
  if (postReplyId !== 0) {
    // isFromPost will be integer for this scenario - 0:Reply, 1:Post
    try {
      connection.query(
        `SELECT * FROM replies WHERE postReplyId = ${postReplyId} AND isForPost = ${isForPost}`,
        function (err, result, fields) {
          if (err) {
            throw err;
          }
          res.json(result);
          return;
        }
      );
    } catch (error) {
      console.log(error);
      res.json([]);
      return;
    }
  } else {
    console.log("Error: No Posts/Replies chosen to be replied.");
    res.json([]);
    return;
  }
});

app.delete("/reply/:id", (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM replies WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.error("Error deleting Reply:", error);
      res.send("error");
      return;
    }

    console.log("Reply successfully deleted.");
    res.send("ok");
  });
});

app.post("/reply/like", (req, res) => {
  var id = req.body.id;
  var userId = req.body.userId;

  try {
    connection.query(
      `UPDATE replies SET thumbsUp = thumbsUp + 1 WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
      }
    );
    connection.query(
      `UPDATE users SET numLikes = numLikes + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
        res.send("ok");
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.send("error");
    return;
  }
});

app.post("/reply/dislike", (req, res) => {
  var id = req.body.id;
  var userId = req.body.userId;

  try {
    connection.query(
      `UPDATE replies SET thumbsDown = thumbsDown + 1 WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
      }
    );
    connection.query(
      `UPDATE users SET numDislikes = numDislikes + 1 WHERE userId = '${userId}'`,
      function (err, result, fields) {
        if (err) {
          res.send("error");
          return;
        }
        res.send("ok");
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.send("error");
    return;
  }
});

/* Channel */
app
  .route("/channel")
  .post((req, res) => {
    var channelName = req.body.channelName;
    var description = req.body.description;

    if (!(channelName == "" || description == "")) {
      var inputs = [channelName, description];
      insertIntoChannels(inputs)
        .then((result) => {
          console.log("INSERT query executed successfully");
          res.send("ok");
          return;
        })
        .catch((error) => {
          console.error("Error executing INSERT query:", error);
          res.send("error");
          return;
        });
    } else {
      res.send("error");
      return;
    }
  })
  .get((req, res) => {
    connection.query(`SELECT * FROM channels`, function (err, result, fields) {
      if (err) {
        res.status(404).json("Cannot get the channels.");
        return;
      }
      res.json(result);
    });
  });

app.delete("/channel/:id", (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM channels WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.error("Error deleting Channel:", error);
      res.send("error");
      return;
    }

    console.log("Channel successfully deleted.");
    res.send("ok");
  });
});

app.use("/", express.static("."));

app.listen(PORT, HOST);

console.log("System Active...");
