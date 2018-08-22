var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

//Get start page
	app.get('/', function (req, res) {

		res.render('index.ejs');
	});

//get posts page
	app.get('/posts', function (req, res) {
		db.collection('posts').find({}).toArray(function (err, post) {

			if (err) {
				res.send( {'error': 'An error has occured'} );
			} else {
				res.render('posts.ejs', { posts: post });
			};
		});
	});

//save in to database
	app.post('/posts', function (req, res) {
		var post = { title: req.body.title , text: req.body.text };

    	db.collection('posts').insert(post, function (err, result) {

			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.redirect('/posts');
			}
		});
	});

//remove from database
	app.get('/posts/delete/:id', function (req, res) {
		var id = req.params.id;
		var details = { '_id' : new ObjectID(id) };

		db.collection('posts').remove(details, function (err, result) {

			if (err) {
				res.send( {'error': 'An error has occured'} );
			} else {
				res.redirect('/posts');
			}
		});
	});

//edit from database
	app.get('/posts/edit/:id', function (req, res) {
		var id = req.params.id;
		var details = { '_id' : new ObjectID(id) };
		db.collection('posts').findOne( details, function (err, post) {

			if (err) {
				res.send({'error':'An error has occured'});
			} else {
				res.render('edit_post.ejs', { posts: post });;
				
			}
		});
	});

//update from database
	app.post('/posts/edit/:id', function (req, res) {
		var id = req.params.id;
		var details = { '_id': new ObjectID(id) };
		var post = { title: req.body.title , text: req.body.text };

		db.collection('posts').update( details, post, function (err, post) {
			if(err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.redirect('/posts');
			}
		});
	});


};

