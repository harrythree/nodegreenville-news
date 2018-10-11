### NodeGreenville Meetup Notes - 4/13/2016


# Goal

We are going to build a simple Node.js application that allows us to view a list of articles and create articles that will be saved to a MongoDB. Then when we’re finished building our app we will deploy it to Heroku. I tried to use the most popular tools surrounding Node.js so that when you have questions in the future, there will be plenty of resources online to help you.

# Tools

* **Yeoman** - Scaffolding tool that we will use to create the MVC base for our app

* **Express.js** - Node.js framework that we will use for basic routing and html templating

* **Handlebars** - Template engine we will be using with Express. It does not allow for complex logic in views which helps to keep our concerns separate.

* **MongoDB** - Document-oriented NoSQL database. Easy to setup and tons of articles, blog posts, and StackOverflow questions.

* **Mongoose**- Object Document Mapper used to interact with MongoDB. We will use Mongoose to create Schemas and Models for our data.

* **Bootstrap**- CSS framework that will help us avoid writing any CSS.

* **Gulp**- Build tool that allows you to automate just about any task.

* **Bower**- Front end package manager

# Scaffold Project

1. npm install yo -g

2. npm install generator-express -g

3. yo express

    1. Would you like to create a new directory for your project? *Yes*

    2. Enter directory name: *nodegreenville-news*

    3. Select a version to install: *MVC*

    4. Select a view engine to use: *Handlebars*

    5. Select a css preprocessor to use: *None*

    6. Select a database to use: *MongoDB*

    7. Select a build tool to use: *Gulp*

4. cd nodegreenville-news

5. atom . (or open the project in your favorite text edit or IDE)

# MongoDB Setup

1. [https://dashboard.heroku.com/new](https://dashboard.heroku.com/new)

2. Under the Resources tab, scroll down to Add-ons and search for **mLab**

3. Provision a Sandbox - free account

4. Under Settings section click Reveal Config Vars and copy MONGODB_URI

5. npm install dotenv --save

6. Create file ".env" in the root of project

7. Add the line ".env" to .gitignore file

8. Open config/config.js and add:

	```javascript
	require("dotenv").config({silent:true});
	```

9. Still in config.js replace the development db url with:

	```javascript
	process.env.MONGODB_URI
	```

10. Test out everything by running gulp command and visiting [http://localhost:3000](http://localhost:3000)

11. Open controllers/home.js and change the rendered title from ‘Generator-Express MVC’ to ‘NodeGreenville News’.

# Bootstrap

1. bower install bootstrap --save

2. Open views/layouts/main.handlebars and add:

	```html
	<link rel="stylesheet" href="/components/bootstrap/dist/css/bootstrap.min.css">
	```

3. Now we need to add the Bootstrap JavaScript file and jQuery. Just before the close body tag add:

	```html
	<script src="/components/jquery/dist/jquery.min.js"></script>

	<script src="/components/bootstrap/dist/js/bootstrap.min.js"></script>
	```

4. Add div with the class "container" around {{{ body }}}

	```html
	<div class="container">
		{{{ body }}}
	</div>
	```

# New Article

1. Above the div containing {{{ body }}} we need to add a Bootstrap navbar:

	```html
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<a class="navbar-brand" href="/">News</a>
			<ul class="nav navbar-nav">
				<li class="active"><a href="/new">New Article</a></li>
			</ul>
		</div>
	</nav>
	```

2. Inside views folder create new.handlebars and add:

	```html
	<h1>New Article</h1>
	```

3. Inside controllers folder create new.js and add:

	```javascript
	var express = require('express'),
		router = express.Router(),
		mongoose = require('mongoose'),
		Article = mongoose.model('Article');

	module.exports = function (app) {
		app.use('/new', router);
	};

	router.get('/', function (req, res, next) {
		res.render('new');
	});
	```

4. Back on new.handlebars add the form:
	```html
	<form action="/new" method="POST">
		<div class="form-group">
			<label for="title">Title</label>
			<input type="text" class="form-control" name="title" placeholder="Title">
		</div>
		<div class="form-group">
			<label for="content">Text</label>
			<textarea class="form-control" name="text" placeholder="Text"></textarea>
		</div>
		<button type="submit" class="btn btn-default">Submit</button>
	</form>
	```

5. Inside controllers/new.js add the POST endpoint:

	```javascript
	router.post('/', function (req, res, next) {
		var article = new Article({
			title: req.body.title,
			text: req.body.text
		});

		article.save(function(err) {
			if (err) {
				return next(err);
			}

			res.redirect('/');
		});
	});
	```

# Article Feed

1. Open views/index.handlebars and add the feed:

	```html
	{{#each articles}}
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">{{this.title}}</h3>
			</div>
			<div class="panel-body">
				{{this.text}}
			</div>
		</div>
	{{/each}}
	```

# Heroku Deploy

1. npm install bower --save

2. Open package.json to add bower script above the start script:

	```
	"postinstall": "./node_modules/bower/bin/bower install",
	```

1. git init

2. git add -A && git commit -m "First Deploy"

3. Configure git remote for Heroku:
	
	```
	heroku git:remote -a nodegreenville-news-demo
	```

1. git push heroku master

2. heroku logs

3. Update config/config.js and add the production db URL

	```javascript
	process.env.MONGODB_URI
	```

1. git add -A && git commit -m "Updated production DB URL"

2. git push heroku master
