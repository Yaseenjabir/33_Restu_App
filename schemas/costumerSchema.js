const { default: mongoose } = require("mongoose");

const model = new mongoose.Schema({
  emailAddress: String,
  address: String,
  city: String,
  name: String,
  location: String,
  phone: String,
  password: String,
  confirmPassword: String,
});

export const costumerSchema =
  mongoose.models.costumers || mongoose.model("costumers", model);
