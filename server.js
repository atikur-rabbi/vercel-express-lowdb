var express = require('express');
var port = process.env.PORT || 4000;
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('/tmp/db.json')
var db = low(adapter)
var app = express();

// default user list
db.defaults({ users: [
      {"firstName":"John", "lastName":"Hancock"},
      {"firstName":"Liz",  "lastName":"Smith"},
      {"firstName":"Ahmed","lastName":"Khan"}
    ]
  }).write();

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/tmp'));
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });

app.get("/users", function (request, response) {
  var dbUsers=[];
  var users = db.get('users').value() // Find all users in the collection
  users.forEach(function(user) {
    dbUsers.push([user.firstName,user.lastName]); // adds their info to the dbUsers value
  });
  response.send(dbUsers); // sends dbUsers back to the page
});

// // creates a new entry in the users collection with the submitted values
// app.post("/users", function (request, response) {
//   db.get('users')
//     .push({ firstName: request.query.fName, lastName: request.query.lName })
//     .write()
//   console.log("New user inserted in the database");
//   response.sendStatus(200);
// });

// // removes entries from users and populates it with default users
// app.get("/reset", function (request, response) {
//   // removes all entries from the collection
//   db.get('users')
//   .remove()
//   .write()
//   console.log("Database cleared");
  
//   // default users inserted in the database
//   var users= [
//       {"firstName":"John", "lastName":"Hancock"},
//       {"firstName":"Liz",  "lastName":"Smith"},
//       {"firstName":"Ahmed","lastName":"Khan"}
//   ];
  
//   users.forEach(function(user){
//     db.get('users')
//       .push({ firstName: user.firstName, lastName: user.lastName })
//       .write()
//   });
//   console.log("Default users added");
//   response.redirect("/");
// });

// // removes all entries from the collection
// app.get("/clear", function (request, response) {
//   // removes all entries from the collection
//   db.get('users')
//   .remove()
//   .write()
//   console.log("Database cleared");
//   response.redirect("/");
// });


module.exports = app

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

