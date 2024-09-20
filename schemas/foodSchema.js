const { default: mongoose } = require("mongoose");

const model = new mongoose.Schema({
  foodName: String,
  price: String,
  description: String,
  imageUrl: String,
  restaurant_id: mongoose.Schema.Types.ObjectId,
});

export const foodSchema =
  mongoose.models.foodItems || mongoose.model("foodItems", model);
