var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controller
// this is a function and we are passing app to it so it can be used
todoController(app);

// listen to port
app.listen(3003);
console.log('You are listening to port 3003');