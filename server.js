var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var db = require('./config/db');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, function (err, database) {

	if (err) return console.log(err);
	
	db = database.db("note-api")
	require('./app/routes')(app, db);

	app.listen(3000, function () {
		console.log('Go to localhost 3000');
	});
});
