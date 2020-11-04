const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/usersDB", {
  useNewUrlParser: true
});

const userSchema = {
  name: String,
  email: String,
  password: String
};

const user = mongoose.model("user", userSchema);

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/mainpage.html');
});

app.get("/billboard", function(req, res) {
  res.sendFile(__dirname + '/top10.html');
});

app.get("/review", function(req, res) {
  res.sendFile(__dirname + '/musicreview.html');
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.get("/explore", function(req, res) {
  res.sendFile(__dirname + '/explore.html');
});

/*
function CheckPassword(inputtxt) {
  var passw = /^[A-Za-z]\w{7,14}$/;
  if (inputtxt.value.match(passw)) {
    alert('Correct, try another...')
    return true;
  } else {
    alert('Wrong...!')
    return false;
  }
}
*/
app.post("/login", function(req, res) {
  const newuser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  var check = req.body.re_password;

  newuser.save(function(err) {
    if (!err && req.body.password == check) {
      console.log("Sucess");
      res.redirect("/");
    } else {
      console.log("Error");
      console.log(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
