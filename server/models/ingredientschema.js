var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema ({
  user_id: {type: String, required: true},
  name: {type: String, required: true},
  quantity: {type: Number},
  unit: {type: String}
  // checked: {type: Boolean}
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
