var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema ({
  user_id: {type: String, required: true},
  product_name: {type: String, required: true},
  brand: {type: String},
  avg_price: {type: Number},
  upc: {type: String},
  image_urls: {type: String},
  count: {type: String},
  quantity: {type: String}
});

module.exports = mongoose.model('Item', ItemSchema);
