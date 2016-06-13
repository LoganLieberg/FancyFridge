var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema ({
  recipeID: 0,
  title: "string",
  description: "string",
  cuisine: "string",
  category: "string",
  primaryIngredient: "string",
  starRating: 0,
  webURL: "string",
  ingredients: [
    {
      name: "string",
      htmlName: "string",
      quantity: 0,
      displayQuantity: "string",
      unit: "string",
      prepNotes: "string"
    }
  ],
  instructions: "string",
  yieldNumber: 0,
  yieldUnit: "string",
  totalMinutes: 0,
  activeMinutes: 0,
  ingredientsTextBlock: "string",
  heroPhotoUrl: "string"
})


var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
