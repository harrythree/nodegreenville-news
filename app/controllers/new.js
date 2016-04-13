var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function(app) {
  app.use('/new', router);
};

router.get('/', function(req, res, next) {
  res.render('new');
});

router.post('/', function(req, res, next) {
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
