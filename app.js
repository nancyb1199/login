const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const Mustache = require('mustache');
const session = require('express-session');
const path = require('path');

// Create app
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

let users = [
  {user: "Nancy", pass: "test"},
  {user: "Mike", pass: "test2"}
];

function authUsers(req,name,pwd){
  req.authenticated=false;
  for (i=0; i<users.length; i++){
    if(users[i].user === name && users[i].pass === pwd) {
      authenticated=true;
      console.log(authenticated);
      req.authenticated=true;
      return;
    }
  }
}

app.get('/', function(req, res){
  console.log("here");
  res.render('index');
});

app.post("/", function (req, res) {
  console.log("post");
  name = req.body.name;
  pwd = req.body.pwd;
  authUsers(req, name, pwd);
  if (req.authenticated) {
      res.render('user', {username: name});
  }
  else {
    // res.redirect('/');
    res.render('error');
  }
});


app.listen(3000, function () {
  console.log('Successfully started express application!');
});
