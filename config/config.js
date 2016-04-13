var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

require("dotenv").config({silent:true});

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodegreenville-news-demo'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodegreenville-news-demo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodegreenville-news-demo-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodegreenville-news-demo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodegreenville-news-demo-production'
  }
};

module.exports = config[env];
