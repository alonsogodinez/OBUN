
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require('../config_local.json');
//var config    = require('../config.json');


var sequelize = new Sequelize(config.postgres.database,
    config.postgres.username,
    config.postgres.password,
    {
      host:  config.postgres.host,
      dialect:  config.postgres.dialect
    }
);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


sequelize.sync().then(function() {
  return console.log("modelo de base de datos sincronizado");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
