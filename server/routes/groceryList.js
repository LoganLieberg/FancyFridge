var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var Item = require('../models/groceryschema')
var items = [];
var Factual = require('factual-api');
var factual = new Factual('IqSLsKNWfJ4CtemHK60X21oZhAEjcjrJWnj7Tnt9', 'FEdYns0tsS2mzsHtGGUYKmltyUMH1oHsjHu8qPBs');

router.get('/:id', function (req, res) {
  var ids = req.params.id;
  Item.find({user_id  : ids}, function (err, items) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(items);
});
});

router.post('/list', function (req, res) {
  console.log('gets here');
  var item = new Item(req.body);
  item.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    res.sendStatus(201);
  });
});

router.post('/', function (request, response) {
  console.log(request.body);
  var keyword = request.body.keyword;
  console.log(keyword);
  factual.get('/t/products-cpg', {q:keyword}, function (error, res) {
    console.log(typeof res.data);
    response.send(res.data);
  });

  //semantics 3 api request
  // sem3.products.products_field("search", keyword);
  //
  // sem3.products.get_products(
  //   function(err, products) {
  //     if (err) {
  //       console.log(err);
  //       console.log("couldn't execute request: get_products");
  //       return;
  //     }
  //     console.log("results of request:\n" + JSON.stringify( products ) );
  //     console.log(products);
  //     res.send(products);
  //   }
  // );
  //walmart api request
  // request('http://api.walmartlabs.com/v1/search?apiKey=kv9dz8v7787sc8a5zzen4hyu&categoryId=976759&numItems=25&sort=title&start=25&query=' + keyword, function (error, response, body) {
  //   console.log(response);
  //   items = response;
  //   res.send(items);
  //   if (!error && response.statusCode == 200) {
  //      // Show the HTML for the Google homepage.
  //   }
  // })
  });

router.delete('/:id', function(req, res) {
  Item.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
});

module.exports = router;
