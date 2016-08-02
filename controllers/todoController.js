var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://test:test@ds139725.mlab.com:39725/ohern-todo');

// create a schema (blueprint)
var todoSchema = new mongoose.Schema({
	item: String
});

// Model-type based on ^^Schema
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
// 	if (err) throw err;
// 	console.log('item saved');
// });

// var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'} ];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app){

app.get('/todo', function(req, res){
	// get data from mongoDB and pass it to view
	// {} will find all items in Todo collection
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	});
});

app.post('/todo', urlencodedParser, function(req, res){
	var newTodo = Todo(req.body).save(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

app.delete('/todo/:item', function(req, res){
	Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

};