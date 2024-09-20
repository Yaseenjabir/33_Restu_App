const { default: mongoose } = require("mongoose");

const model = new mongoose.Schema({
  email: String,
  name: String,
  location: String,
  contact: String,
  city: String,
  password: String,
  image: String,
});

export const userSignupSchema =
  mongoose.models.hotels || mongoose.model("hotels", model);
