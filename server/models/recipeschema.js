var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema ({
  user_id: {type: String, required: true},
  recipe_id: {type: Number, required: true},
  favorite: {type: Boolean},
  title: {type: String, required: true},
  photo_url: {type: String},
  category: {type: String},
  subcategory: {type: String},
  servings: {type: Number},
  review_count: {type: Number},
  rating: {type: Number},
  total_tries: {type: Number},
  web_url: {type: String}
})


var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
