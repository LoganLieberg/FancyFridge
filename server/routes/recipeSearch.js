var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Recipe = require('../models/recipeschema');
var path = require('path');

router.get('/', function (req, res) {
  Recipe.find({}, function (err, recipes) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(recipes);
});
});
router.post('/', function (req, res) {
  var recipe = new Recipe(req.body);
  recipe.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.sendStatus(201);
  });
});

module.exports = router;
