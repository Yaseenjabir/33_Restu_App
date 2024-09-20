const { default: mongoose } = require("mongoose");

const model = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  restaurantId: mongoose.Schema.Types.ObjectId,
  costumerId: mongoose.Schema.Types.ObjectId,
  foodId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
});

export const orderSchema =
  mongoose.models.orders || mongoose.model("orders", model);
