const { default: mongoose } = require("mongoose");

const model = new mongoose.Schema({
  costumer: {
    _id: mongoose.Schema.Types.ObjectId,
    emailAddress: String,
    name: String,
    location: String,
  },
  restaurant: {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    name: String,
    location: String,
    contact: String,
  },
  items: [
    {
      image: String,
      name: String,
      price: String,
      quantity: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  status: String,
  deliveryBoy: mongoose.Schema.Types.ObjectId,
});

export const completedOrdersSchema =
  mongoose.models.completedorders || mongoose.model("completedorders", model);
