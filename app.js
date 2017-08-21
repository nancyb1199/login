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

let users = [
  {user: "Nancy", pass: "test"},
  {user: "Mike", pass: "test2"}
];

app.get('/', function(req, res){
  console.log("here");
  res.render('index');
});

app.post("/", function (req, res) {
  console.log("post");
  name = req.body.name;
  pwd = req.body.pwd;
  for (i=0; i<users.length; i++){
    if(users[i].user === name && users[i].pass === pwd) {
      authenticated=true;
      console.log(authenticated);
    }
    else {
      authenticated=false;
      console.log(authenticated);
    }
  }
})

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
